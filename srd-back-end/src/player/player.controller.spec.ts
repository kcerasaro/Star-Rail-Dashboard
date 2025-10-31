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
    describe('POST /player', () => {}); 

    // getAllPlayers
    describe('GET /player', () => {}); 

    // getPlayer
    describe('GET /player/:id', () => {}); 

    // updatePlayer
    describe('PATCH /player/:id', () => {}); 

    // deletePlayer
    describe('Delete /player/:id', () => {})
});