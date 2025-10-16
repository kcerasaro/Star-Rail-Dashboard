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
    private readonly hardCodedUserId1 = "11111-11111-11111";
    private readonly hardCodedUserId2 = "22222-22222-22222";

    // HARD CODED PLAYER IDS FOR TESTING. WILL BE UPDATED WHEN SWITCHING PLAYERS IS IMPLEMENTED
    private readonly hardCodedId1 = "94fd978d-c546-4859-bb36-a17e3e384e1c"; // Otter, 802921001, Asia
    private readonly hardCodedId2 = "4953d0c7-15a5-4ee5-8524-90b168eac064"; // Otter, 602921001, America

    // CREATE
    @Post()
    @ApiOperation({ summary: "Create a new player" })
    @ApiBody({ type: CreatePlayerDto })
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerService.createPlayer(createPlayerDto, this.hardCodedUserId2); // HARD CODED USERID
    }

    // READ
    @Get()
    @ApiOperation({ summary: "Get all players from user"})
    async getAllPlayers(): Promise<Player[]> {
        return await this.playerService.getUserById(this.hardCodedUserId1); // HARD CODED USERID
    }

    @Get(":id")
    @ApiParam({name: "id", type: String, description: "ID of the player"})
    @ApiOperation({ summary: "Get a player from user"})
    async getPlayer(@Param("id") id: string): Promise<Player> {
        return await this.playerService.getPlayerById(this.hardCodedId2); // HARD CODED ID
    }

    // UPDATE
    @Patch(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to update"})
    @ApiBody({type: UpdatePlayerDto})
    @ApiOperation({summary: "Update player name, uid, and/or region"})
    async updatePlayer(@Param("id") id: string,@Body()  updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        return await this.playerService.updatePlayerById(this.hardCodedId2, updatePlayerDto);// HARD CODED ID
    }

    // DELETE
    @Delete(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to delete"})
    @ApiOperation({summary: "Delete player"})
    async deletePlayer(@Param("id") id: string): Promise<{message: string}> {
        return await this.playerService.deletePlayerById(id);
    }
}
