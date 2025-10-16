import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../../shared/player.shared';
import { PlayerEntity } from './entities/player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { mapEntityToPlayer } from './mappers/player.mapper';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(PlayerEntity) 
    private readonly playerEntityRepository: Repository<PlayerEntity>){}

    // CREATE
    async createPlayer(createPlayerDto: CreatePlayerDto, userId: string): Promise<Player> {
        const existingPlayer = await this.playerEntityRepository.findOneBy({ uid: createPlayerDto.uid });

        if (existingPlayer) {
            throw new ConflictException("Player with this UID already exists");
        }

        const playerEntity = this.playerEntityRepository.create({... createPlayerDto, userId});

        try {
            const playerEntitySaved = await this.playerEntityRepository.save(playerEntity);
            return mapEntityToPlayer(playerEntitySaved);

        } catch(error) {
            throw new InternalServerErrorException("Failed to create player");
        }
    }

    // READ
    async getUserById(userId: string): Promise<Player[]> {
        const playerEntities = await this.playerEntityRepository.findBy({ userId });
        return playerEntities.map(mapEntityToPlayer);
    }

    async getPlayerById(id: string): Promise<Player> {
        const playerEntity = await this.playerEntityRepository.findOneByOrFail({ id });
        return mapEntityToPlayer(playerEntity);
    }

    // UPDATE
    async updatePlayerById(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        const playerEntity = await this.playerEntityRepository.findOneBy({ id });
        if(!playerEntity) {
            throw new NotFoundException("Player Not Found");
        }

        if(updatePlayerDto.uid && updatePlayerDto.uid !== playerEntity.uid) {
            const existingPlayer = await this.playerEntityRepository.findOneBy( {uid: updatePlayerDto.uid} );

            if (existingPlayer && existingPlayer.id !== playerEntity.id) {
                throw new ConflictException("UID already in use by another player");
            }
        }

        Object.assign(playerEntity, updatePlayerDto);
        
        try {
            const playerEntityUpdated = await this.playerEntityRepository.save(playerEntity);
            return mapEntityToPlayer(playerEntityUpdated);

        } catch(error) {
            throw new InternalServerErrorException("Failed to update player");
        }
    }

    // DELETE
    async deletePlayerById(id: string): Promise<{message: string}> {
        const deletedPlayer = await this.playerEntityRepository.delete({ id });
        
        if(deletedPlayer.affected === 0) {
            throw new NotFoundException("Player not found");
        }

        return {message: "Player deleted successfuly"};
    }
}
