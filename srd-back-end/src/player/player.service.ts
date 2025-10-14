import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entity/player.entity';
import { InsertResult } from 'typeorm/browser';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player) 
    private readonly playerRepository: Repository<Player>){}

    createPlayer(createPlayerDto: CreatePlayerDto, userId: string): Promise<InsertResult> {
        const player = this.playerRepository.create({...createPlayerDto, userId});
        return this.playerRepository.insert(player);
    }
}
