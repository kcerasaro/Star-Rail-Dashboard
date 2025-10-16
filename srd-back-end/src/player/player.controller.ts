import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { Player } from '../../../shared/player.shared';
import { UpdatePlayerDto } from './dtos/update-player.dto';

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
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerService.createPlayer(createPlayerDto, this.hardCodedId1); // HARD CODED USERID
    }

    // READ
    @Get()
    @ApiOperation({ summary: "Get all players from user"})
    async getAllPlayers(): Promise<Player[]> {
        return await this.playerService.getUserById(this.hardCodedId1); // HARD CODED USERID
    }

    @Get(":id")
    @ApiParam({name: "id", type: String, description: "ID of the player"})
    @ApiOperation({ summary: "Get a player from user"})
    async getPlayer(@Param("id") id: string): Promise<Player> {
        return await this.playerService.getPlayerById(id);
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
    @Delete(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to delete"})
    @ApiOperation({summary: "Delete player"})
    async deletePlayer(@Param("id") id: string): Promise<{message: string}> {
        return await this.playerService.deletePlayerById(id);
    }
}
