import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InsertResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { Player } from './entity/player.entity';
import { UpdatePlayerDto } from './dto/update-player.dto';

@ApiTags("player")
@Controller("player")
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}
    // HARD CODED USERIDS FOR TESTING. WILL BE UPDATED IF/WHEN USER AUTHENTICATION IS IMPLEMENTED
    private readonly hardCodedId1 = "11111-11111-11111";
    private readonly hardCodedId2 = "22222-22222-22222";

    // CREATE
    @Post()
    @ApiOperation({ summary: "Create a new player" })
    @ApiBody({ type: CreatePlayerDto })
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<InsertResult> {
        return await this.playerService.createPlayer(createPlayerDto, this.hardCodedId1); // HARD CODED USERID
    }

    // READ
    @Get()
    @ApiOperation({ summary: "Get all players from user"})
    async getAllPlayers(): Promise<Player[]> {
        return await this.playerService.getUserById(this.hardCodedId1); // HARD CODED USERID
    }

    @Get(":uid")
    @ApiParam({name: "uid", type: String, description: "UID of the player"})
    @ApiOperation({ summary: "Get a player from user"})
    async getPlayer(@Param("uid") uid: string) {
        return await this.playerService.getPlayerById(uid);
    }

    // UPDATE
    @Patch(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to update"})
    @ApiBody({type: UpdatePlayerDto})
    @ApiOperation({summary: "Update player name, uid, and/or region"})
    async updatePlayer(@Param("id") id: string,@Body()  updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        return await this.playerService.updatePlayerById(id, updatePlayerDto);
    }

    // DELETE
}
