import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam, ApiCreatedResponse, ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayerDto } from './dtos/playerDto';
import { ServerDescription } from 'typeorm';

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
    @ApiCreatedResponse({description: 'Player created successfully', type: PlayerDto})
    @ApiBadRequestResponse({description: 'Invalid create payload or missing required fields'})
    @ApiConflictResponse({description: 'Player with this UID already exists'})
    @ApiInternalServerErrorResponse({description: 'Failed to create player'})
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
        return await this.playerService.createPlayer(createPlayerDto, this.hardCodedUserId2) as PlayerDto; // HARD CODED USERID
    }

    // READ
    @Get()
    @ApiOperation({ summary: "Get all players from user"})
    @ApiOkResponse({description: 'List of players', type: [PlayerDto]})
    @ApiBadRequestResponse({description: 'Valid userId must be provided'})
    async getAllPlayers(): Promise<PlayerDto[]> {
        return await this.playerService.getUserById(this.hardCodedUserId1) as PlayerDto[]; // HARD CODED USERID
    }

    @Get(":id")
    @ApiParam({name: "id", type: String, description: "ID of the player"})
    @ApiOperation({ summary: "Get a player from user"})
    @ApiOkResponse({description: 'Player found', type: PlayerDto})
    @ApiBadRequestResponse({description: 'Valid id must be provided'})
    @ApiNotFoundResponse({description: 'Player not found'})
    async getPlayer(@Param("id") id: string): Promise<PlayerDto> {
        return await this.playerService.getPlayerById(this.hardCodedId2) as PlayerDto; // HARD CODED ID
    }

    // UPDATE
    @Patch(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to update"})
    @ApiBody({type: UpdatePlayerDto})
    @ApiOperation({summary: "Update player name, uid, and/or region"})
    @ApiOkResponse({description: 'Player updated successfully', type: PlayerDto})
    @ApiBadRequestResponse({description: 'Invalid update payload or missing required fields'})
    @ApiNotFoundResponse({description: 'Player not found'})
    @ApiConflictResponse({description: 'UID already in use by another player'})
    @ApiInternalServerErrorResponse({description: 'Failed to update player'})
    async updatePlayer(@Param("id") id: string,@Body()  updatePlayerDto: UpdatePlayerDto): Promise<PlayerDto> {
        return await this.playerService.updatePlayerById(this.hardCodedId2, updatePlayerDto) as PlayerDto;// HARD CODED ID
    }

    // DELETE
    @Delete(":id")
    @ApiParam({name: "id", type: String, description: "ID of player to delete"})
    @ApiOperation({summary: "Delete player"})
    @ApiOkResponse({description: 'Player deleted successfully', type: Object})
    @ApiBadRequestResponse({description: 'Valid id must be provided'})
    @ApiNotFoundResponse({description: 'Player not found'})
    @ApiInternalServerErrorResponse({description: 'Failed to delete player'})
    async deletePlayer(@Param("id") id: string): Promise<{message: string}> {
        return await this.playerService.deletePlayerById(id);
    }
}
