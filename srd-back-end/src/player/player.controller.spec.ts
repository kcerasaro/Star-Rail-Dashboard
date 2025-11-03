import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Region } from '../../../shared/player.shared';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayerDto } from './dtos/playerDto';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import e from 'express';

describe('PlayerController', () => {
  let app: INestApplication;
  let mockService: Partial<Record<keyof PlayerService, jest.Mock>>;

  beforeAll(async () => {
    mockService = {
      createPlayer: jest.fn(),
      getUserById: jest.fn(),
      getPlayerById: jest.fn(),
      updatePlayerById: jest.fn(),
      deletePlayerById: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: mockService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // createPlayer
  describe('POST /player', () => {
    const createPlayerDto: CreatePlayerDto = {
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };
    it('returns 201 when player is created successfully', async () => {
      const returnedPlayer: PlayerDto = {
        id: 'player-id',
        userId: 'user-id',
        name: 'player-name',
        uid: '123456789',
        region: Region.AMERICA,
      };

      mockService.createPlayer!.mockResolvedValue(returnedPlayer);

      const response = await request(app.getHttpServer())
        .post('/player')
        .send(createPlayerDto)
        .expect(201);
      expect(response.body).toEqual(expect.objectContaining(returnedPlayer));
    });

    it('returns 400 for invalid create payload or missing required fields', async () => {
      mockService.createPlayer!.mockRejectedValue(
        new BadRequestException(
          'Invalid create payload or missing required fields',
        ),
      );

      const response = await request(app.getHttpServer())
        .post('/player')
        .send(createPlayerDto)
        .expect(400);
      expect(response.body.message).toBe(
        'Invalid create payload or missing required fields',
      );
    });

    it('returns 409 when UID already exists', async () => {
      mockService.createPlayer!.mockRejectedValue(
        new ConflictException('Player with this UID already exists'),
      );

      const response = await request(app.getHttpServer())
        .post('/player')
        .send(createPlayerDto)
        .expect(409);
      expect(response.body.message).toBe('Player with this UID already exists');
    });

    it('returns 500 on unexpected error', async () => {
      mockService.createPlayer!.mockRejectedValue(
        new InternalServerErrorException('Failed to create player'),
      );

      const response = await request(app.getHttpServer())
        .post('/player')
        .send(createPlayerDto)
        .expect(500);
      expect(response.body.message).toBe('Failed to create player');
    });
  });

  // getAllPlayers
  describe('GET /player', () => {
    it('returns 200 with list of players for valid userId', async () => {
      const returnedPlayers: PlayerDto[] = [
        {
          id: 'player-id',
          userId: 'user-id',
          name: 'player-name',
          uid: '123456789',
          region: Region.AMERICA,
        },
      ];

      mockService.getUserById!.mockResolvedValue(returnedPlayers);

      const response = await request(app.getHttpServer())
        .get('/player')
        .expect(200);
      expect(response.body).toEqual(expect.arrayContaining(returnedPlayers));
    });

    it('returns 400 when userId is missing or invalid', async () => {
      mockService.getUserById!.mockRejectedValue(
        new BadRequestException('Valid userId must be provided'),
      );

      const response = await request(app.getHttpServer())
        .get('/player')
        .expect(400);
      expect(response.body.message).toBe('Valid userId must be provided');
    });

    it('returns 500 on unexpected error', async () => {
      mockService.getUserById!.mockRejectedValue(
        new InternalServerErrorException('Failed to get players'),
      );

      const response = await request(app.getHttpServer())
        .get('/player')
        .expect(500);
      expect(response.body.message).toBe('Failed to get players');
    });
  });

  // getPlayer
  describe('GET /player/:id', () => {
    it('returns 200 with player data for valid Id', async () => {
      const returnedPlayer: PlayerDto = {
        id: 'player-id',
        userId: 'user-id',
        name: 'player-name',
        uid: '123456789',
        region: Region.AMERICA,
      };
      mockService.getPlayerById!.mockResolvedValue(returnedPlayer);

      const response = await request(app.getHttpServer())
        .get('/player/123')
        .expect(200);
      expect(response.body).toEqual(expect.objectContaining(returnedPlayer));
    });

    it('returns 400 when Id is missing or invalid', async () => {
      mockService.getPlayerById!.mockRejectedValue(
        new BadRequestException('Valid id must be provided'),
      );

      const response = await request(app.getHttpServer())
        .get('/player/123')
        .expect(400);
      expect(response.body.message).toBe('Valid id must be provided');
    });

    it('returns 404 when player is not found', async () => {
      mockService.getPlayerById!.mockRejectedValue(
        new NotFoundException('Player not found'),
      );

      const response = await request(app.getHttpServer())
        .get('/player/123')
        .expect(404);
      expect(response.body.message).toBe('Player not found');
    });

    it('returns 500 on unexpected error', async () => {
      mockService.getPlayerById!.mockRejectedValue(
        new InternalServerErrorException('Failed to get player'),
      );

      const response = await request(app.getHttpServer())
        .get('/player/123')
        .expect(500);
      expect(response.body.message).toBe('Failed to get player');
    });
  });

  // updatePlayer
  describe('PATCH /player/:id', () => {
    const updatePlayerDto: UpdatePlayerDto = {
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };
    it('returns 200 when player is updated successfully', async () => {
      const updatedPlayer: PlayerDto = {
        id: 'player-id',
        userId: 'user-id',
        name: 'upated-name',
        uid: '987654321',
        region: Region.AMERICA,
      };

      mockService.updatePlayerById!.mockResolvedValue(updatedPlayer);

      const response = await request(app.getHttpServer())
        .patch('/player/123')
        .send(updatePlayerDto)
        .expect(200);
      expect(response.body).toEqual(expect.objectContaining(updatedPlayer));
    });

    it('returns 400 for invalid update payload or missing required fields', async () => {
      mockService.updatePlayerById!.mockRejectedValue(
        new BadRequestException(
          'Invalid update payload or missing required fields',
        ),
      );

      const response = await request(app.getHttpServer())
        .patch('/player/123')
        .send(updatePlayerDto)
        .expect(400);
      expect(response.body.message).toBe(
        'Invalid update payload or missing required fields',
      );
    });

    it('returns 404 when player is not found', async () => {
      mockService.updatePlayerById!.mockRejectedValue(
        new NotFoundException('Player not found'),
      );

      const response = await request(app.getHttpServer())
        .patch('/player/123')
        .send(updatePlayerDto)
        .expect(404);
      expect(response.body.message).toBe('Player not found');
    });

    it('returns 409 when UID is already in use by another player', async () => {
      mockService.updatePlayerById!.mockRejectedValue(
        new ConflictException('UID already in use by another player'),
      );

      const response = await request(app.getHttpServer())
        .patch('/player/123')
        .send(updatePlayerDto)
        .expect(409);
      expect(response.body.message).toBe(
        'UID already in use by another player',
      );
    });

    it('returns 500 on unexpected error', async () => {
      mockService.updatePlayerById!.mockRejectedValue(
        new InternalServerErrorException('Failed to update player'),
      );

      const response = await request(app.getHttpServer())
        .patch('/player/123')
        .send(updatePlayerDto)
        .expect(500);
      expect(response.body.message).toBe('Failed to update player');
    });
  });

  // deletePlayer
  describe('DELETE /player/:id', () => {
    it('returns 200 when player is deleted successfully', async () => {
      mockService.deletePlayerById!.mockResolvedValue({
        message: 'Player deleted successfully',
      });

      const response = await request(app.getHttpServer())
        .delete('/player/123')
        .expect(200);
      expect(response.body).toEqual({ message: 'Player deleted successfully' });
    });

    it('returns 400 when Id is missing or invalid', async () => {
        mockService.deletePlayerById?.mockRejectedValue(new BadRequestException('Valid id must be provided'));

        const response = await request(app.getHttpServer()).delete('/player/123').expect(400);
        expect(response.body.message).toBe('Valid id must be provided');
    });

    it('returns 404 when player is not found', async () => {
        mockService.deletePlayerById?.mockRejectedValue(new NotFoundException('Player not found'));

        const response = await request(app.getHttpServer()).delete('/player/123').expect(404);
        expect(response.body.message).toBe('Player not found');
    });

    it('returns 500 on unexpected error', async () => {
        mockService.deletePlayerById?.mockRejectedValue(new InternalServerErrorException('Failed to delete player'));

        const response = await request(app.getHttpServer()).delete('/player/123').expect(500);
        expect(response.body.message).toBe('Failed to delete player');
    });
  });
});
