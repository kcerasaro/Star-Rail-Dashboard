import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entity/player.entity';
import { InsertResult } from 'typeorm/browser';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player) 
    private readonly playerRepository: Repository<Player>){}

    // CREATE
    createPlayer(createPlayerDto: CreatePlayerDto, userId: string): Promise<InsertResult> {
        const player = this.playerRepository.create({...createPlayerDto, userId});
        return this.playerRepository.insert(player);
    }

    // READ
    getUserById(userId: string): Promise<Player[]> {
        return this.playerRepository.findBy({ userId });
    }

    getPlayerById(uid: string): Promise<Player> {
        return this.playerRepository.findOneByOrFail({ uid });
    }

    // UPDATE
    async updatePlayerById(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        const player = await this.playerRepository.findOneBy({ id });
        if(!player) {
            throw new NotFoundException("Player Not Found");
        }

        if(updatePlayerDto.uid && updatePlayerDto.uid !== player.uid) {
            const existing = await this.playerRepository.findOneBy( {uid: updatePlayerDto.uid} );

            if (existing && existing.id !== player.id) {
                throw new ConflictException("UID already in use by another player")
            }
        }

        Object.assign(player, updatePlayerDto);
        return this.playerRepository.save(player);
    }

    // DELETE
}
