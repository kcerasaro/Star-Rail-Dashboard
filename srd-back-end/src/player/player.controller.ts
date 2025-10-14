import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InsertResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Player } from './entity/player.entity';

@ApiTags("player")
@Controller("player")
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}
    // HARD CODED USERIDS FOR TESTING. WILL BE UPDATED IF/WHEN USER AUTHENTICATION IS IMPLEMENTED
    private readonly hardCodedId1 = "11111-11111-11111";
    private readonly hardCodedId2 = "22222-22222-22222";

    @Post()
    @ApiOperation({ summary: "Create a new player" })
    @ApiBody({ type: CreatePlayerDto })
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<InsertResult> {
        try {
            return await this.playerService.createPlayer(createPlayerDto, this.hardCodedId2); // HARD CODED USERID
        } catch(error) {
            throw new HttpException('Failed to create player', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Get()
    @ApiOperation({ summary: "Get all players from user"})
    async getAllPlayers(): Promise<Player[]> {
        return await this.playerService.getUserById(this.hardCodedId1); // HARD CODED USERID
    }

    @Get(":uid")
    @ApiOperation({ summary: "Get a player from user"})
    async getPlayer(@Param("uid") uid: string) {
        return await this.playerService.getPlayerById(uid);
    }
}
