import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
    let app: INestApplication;
    let playerService: Partial<Record<keyof PlayerService, jest.Mock>>;

    beforeAll(async () => {
        playerService = {
            createPlayer: jest.fn(),
            getUserById: jest.fn(),
            getPlayerById: jest.fn(),
            updatePlayerById: jest.fn(),
            deletePlayerById: jest.fn(),          
        }

        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                {
                    provide: PlayerService,
                    useValue: playerService,
                }
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();        
    });

    afterAll(async () => {
        await app.close();
    });

    // createPlayer
    describe('POST /player', () => {
        it('returns 201 when player is created successfully', async () => {});
        it('returns 400 when userId is missing or invalid', async () => {});
        it('returns 409 when UID already exists', async () => {});
        it('returns 500 on unexpected error', async () => {});
    }); 

    // getAllPlayers
    describe('GET /player', () => {
        it('returns 200 with list of players for valid userId', async () => {});
        it('returns 400 when userId is missing or invalid', async () => {});
        it('returns 500 on unexpected error', async () => {});
    }); 

    // getPlayer
    describe('GET /player/:id', () => {
        it('returns 200 with player data for valid Id', async () => {});
        it('returns 400 when Id is missing or invalid', async () => {});
        it('returns 404 when player is not found', async () => {});
        it('returns 500 on unexpected error', async () => {});
    }); 

    // updatePlayer
    describe('PATCH /player/:id', () => {
        it('returns 200 when player is updated successfully', async () => {});
        it('returns 400 for invalid update payload or missing required fields', async () => {});
        it('returns 404 when player is not found', async () => {});
        it('returns 409 when UID is already in use by another player', async () => {});
        it('returns 500 on unexpected error', async () => {});
    }); 

    // deletePlayer
    describe('DELETE /player/:id', () => {
        it('returns 200 when player is deleted successfully', async () => {});
        it('returns 400 when Id is missing or invalid', async () => {});
        it('returns 404 when player is not found', async () => {});
        it('returns 500 on unexpected error', async () => {});
    })
});