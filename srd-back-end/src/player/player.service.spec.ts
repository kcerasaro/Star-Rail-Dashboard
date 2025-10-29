import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { PlayerEntity } from './entities/player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Region } from '../../../shared/player.shared';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;

  const mockRepo = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
    findOneByOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(PlayerEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // createPlayer
  describe('createPlayer', () => {
    const dto: CreatePlayerDto = {
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    const savedPlayer: PlayerEntity = {
      id: 'player-id',
      userId: 'user-id',
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    it('should create a player', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);
      mockRepo.create.mockReturnValue({ ...dto, userId: 'user-id' });
      mockRepo.save.mockResolvedValue(savedPlayer);

      const result = await service.createPlayer(dto, 'user-id');

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uid: dto.uid });
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...dto,
        userId: 'user-id',
      });
      expect(mockRepo.save).toHaveBeenCalled();

      expect(result).toEqual(savedPlayer);
    });

    it('should create a player with trimmed userId', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);
      mockRepo.create.mockReturnValue({ ...dto, userId: 'user-id' });
      mockRepo.save.mockResolvedValue(savedPlayer);

      const result = await service.createPlayer(dto, '   user-id   ');

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uid: dto.uid });
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...dto,
        userId: 'user-id',
      });
      expect(mockRepo.save).toHaveBeenCalled();

      expect(result).toEqual(savedPlayer);
    });

    it('should throw ConflictException if UID already exists', async () => {
      const existingPlayer: PlayerEntity = {
        id: 'player-id',
        userId: 'user-id',
        name: 'existing-player',
        uid: '123456789',
        region: Region.AMERICA,
      };

      mockRepo.findOneBy.mockResolvedValue(existingPlayer);

      await expect(service.createPlayer(dto, 'user-id')).rejects.toThrow(
        ConflictException,
      );

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uid: dto.uid });
      expect(mockRepo.create).not.toHaveBeenCalled();
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if save fails', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...dto, userId: 'user-id' });
      mockRepo.save.mockRejectedValue(new Error('Internal error'));

      await expect(service.createPlayer(dto, 'user-id')).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uid: dto.uid });
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...dto,
        userId: 'user-id',
      });
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException for null createPlayerDto', async () => {
      await expect(service.createPlayer(null as any, 'userId')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for undefined createPlayerDto', async () => {
      await expect(
        service.createPlayer(undefined as any, 'userId'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-object createPlayerDto', async () => {
      await expect(
        service.createPlayer('not-an-object' as any, 'userId'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.createPlayer(dto, '')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for whitespace-only userId', async () => {
      await expect(service.createPlayer(dto, '  ')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.createPlayer(dto, null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // getUserById
  describe('getUserById', () => {
    const user1a: PlayerEntity = {
      id: 'player-id-1a',
      userId: 'userId-1',
      name: 'name-1a',
      uid: '111111111',
      region: Region.AMERICA,
    };

    it('should return 0 players with the same userId userId-2', async () => {
      mockRepo.findBy.mockResolvedValue([]);

      const result = await service.getUserById('userId-2');

      expect(mockRepo.findBy).toHaveBeenCalledWith({ userId: 'userId-2' });

      expect(result).toHaveLength(0);
    });

    it('should return 1 player with the same userId userId-1', async () => {
      mockRepo.findBy.mockResolvedValue([user1a]);

      const result = await service.getUserById('userId-1');

      expect(mockRepo.findBy).toHaveBeenCalledWith({ userId: 'userId-1' });

      expect(result).toHaveLength(1);
      expect(result.every((player) => player.userId === 'userId-1')).toBe(true);
    });

    it('should return 2 players with the same userId userId-1', async () => {
      const user1b: PlayerEntity = {
        id: 'player-id-1b',
        userId: 'userId-1',
        name: 'name-1b',
        uid: '222222222',
        region: Region.AMERICA,
      };

      mockRepo.findBy.mockResolvedValue([user1a, user1b]);

      const result = await service.getUserById('userId-1');

      expect(mockRepo.findBy).toHaveBeenCalledWith({ userId: 'userId-1' });
      expect(result).toHaveLength(2);
      expect(result.every((player) => player.userId === 'userId-1')).toBe(true);
    });

    it('should return 1 player with the same userId userId-1 and 0 players with userId-2', async () => {
      const user2a = {
        id: 'player-id-2a',
        userId: 'userId-2',
        name: 'name-2a',
        uid: '333333333',
        region: Region.AMERICA,
      };

      mockRepo.findBy.mockResolvedValue([user1a]);

      const result = await service.getUserById('userId-1');

      expect(mockRepo.findBy).toHaveBeenCalledWith({ userId: 'userId-1' });
      expect(result).toHaveLength(1);
      expect(result.every((player) => player.userId === 'userId-1')).toBe(true);
      expect(result.every((player) => player.userId === 'userId-2')).toBe(
        false,
      );
    });

    it('should return 1 player with trimmed userId userId-1', async () => {
      mockRepo.findBy.mockResolvedValue([user1a]);

      const result = await service.getUserById('   userId-1   ');

      expect(mockRepo.findBy).toHaveBeenCalledWith({ userId: 'userId-1' });

      expect(result).toHaveLength(1);
      expect(result.every((player) => player.userId === 'userId-1')).toBe(true);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getUserById('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for whitespace-onlu userId', async () => {
      await expect(service.getUserById('  ')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getUserById(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // getPlayerById
  describe('getPlayerById', () => {
    const player: PlayerEntity = {
      id: 'player-id',
      userId: 'user-id',
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    it('should return 1 player', async () => {
      mockRepo.findOneByOrFail.mockResolvedValue(player);

      const result = await service.getPlayerById('player-id');

      expect(mockRepo.findOneByOrFail).toHaveBeenCalledWith({
        id: 'player-id',
      });

      expect(result).toEqual(player);
    });

    it('should return 1 player with trimmed id', async () => {
      mockRepo.findOneByOrFail.mockResolvedValue(player);

      const result = await service.getPlayerById('   player-id   ');

      expect(mockRepo.findOneByOrFail).toHaveBeenCalledWith({
        id: 'player-id',
      });

      expect(result).toEqual(player);
    });

    it('should throw notFoundException if player is not found', async () => {
      mockRepo.findOneByOrFail.mockRejectedValue(new Error('Player not found'));

      await expect(service.getPlayerById('missing-id')).rejects.toThrow(
        NotFoundException,
      );

      expect(mockRepo.findOneByOrFail).toHaveBeenCalledWith({
        id: 'missing-id',
      });
    });

    it('should throw BadRequestException for empty id', async () => {
      await expect(service.getPlayerById('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for whitespace-only id', async () => {
      await expect(service.getPlayerById('  ')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null id', async () => {
      await expect(service.getPlayerById(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // updatePlayerById

  // deletePlayerById
});

// TODO:
// - add white-space only and id/userId + whitespace tests
