import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InsertResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}

    @Post()
    @ApiOperation({ summary: 'Create a new player' })
    @ApiBody({ type: CreatePlayerDto })
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<InsertResult> {
        try {
            // HARD CODED USERIDS FOR TESTING. WILL BE UPDATED IF/WHEN USER AUTHENTICATION IS IMPLEMENTED
            const hardCodedId1 = "11111-11111-11111";
            const hardCodedId2 = "22222-22222-22222";
            return await this.playerService.createPlayer(createPlayerDto, hardCodedId2);
        } catch(error) {
            throw new HttpException('Failed to create player', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
