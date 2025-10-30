import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { PlayerEntity } from './entities/player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
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
  });

  // updatePlayerById
  describe('updatePlayerById', () => {
    let playerToUpdate: PlayerEntity;

    beforeEach(async () => {
      playerToUpdate = {
        id: 'player-id',
        userId: 'user-id',
        name: 'update-player',
        uid: '987654321',
        region: Region.AMERICA,
      };
    });
    const dto: UpdatePlayerDto = {
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    const playerUpdated: PlayerEntity = {
      id: 'player-id',
      userId: 'user-id',
      name: 'player-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    it('should update the player', async () => {
      mockRepo.findOneBy
        .mockResolvedValueOnce(playerToUpdate)
        .mockResolvedValueOnce(null);
      mockRepo.save.mockResolvedValue(playerUpdated);

      const result = await service.updatePlayerById('player-id', dto);

      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(1, {
        id: 'player-id',
      });
      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(2, {
        uid: '123456789',
      });
      expect(mockRepo.save).toHaveBeenCalledWith(playerToUpdate);

      expect(result).toEqual(playerUpdated);
    });

    it('should update the player with identical uid', async () => {
      const dtoIdenticalUid: UpdatePlayerDto = {
        name: 'player-name',
        uid: '987654321',
        region: Region.AMERICA,
      };

      mockRepo.findOneBy.mockResolvedValueOnce(playerToUpdate);
      mockRepo.save.mockResolvedValue(playerUpdated);

      const result = await service.updatePlayerById(
        'player-id',
        dtoIdenticalUid,
      );

      expect(mockRepo.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 'player-id' });
      expect(mockRepo.save).toHaveBeenCalledWith(playerToUpdate);

      expect(result).toEqual(playerUpdated);
    });

    it('should update player with trimmed id', async () => {
      mockRepo.findOneBy
        .mockResolvedValueOnce(playerToUpdate)
        .mockResolvedValueOnce(null);
      mockRepo.save.mockResolvedValue(playerUpdated);

      const result = await service.updatePlayerById('   player-id   ', dto);

      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(1, {
        id: 'player-id',
      });
      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(2, {
        uid: '123456789',
      });
      expect(mockRepo.save).toHaveBeenCalledWith(playerToUpdate);

      expect(result).toEqual(playerUpdated);
    });

    it('should throw NotFoundException if player is not found', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.updatePlayerById('player-id', dto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 'player-id' });
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when UID exists for another player', async () => {
      const existingPlayer: PlayerEntity = {
        id: 'existing-player-id',
        userId: 'user-id',
        name: 'player-name',
        uid: '123456789',
        region: Region.AMERICA,
      };

      mockRepo.findOneBy
        .mockResolvedValueOnce(playerToUpdate)
        .mockResolvedValueOnce(existingPlayer);

      await expect(service.updatePlayerById('player-id', dto)).rejects.toThrow(
        ConflictException,
      );

      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(1, {
        id: 'player-id',
      });
      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(2, {
        uid: '123456789',
      });
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if update fails', async () => {
      mockRepo.findOneBy
        .mockResolvedValueOnce(playerToUpdate)
        .mockResolvedValueOnce(null);
      mockRepo.save.mockRejectedValue(new Error('Internal error'));

      await expect(service.updatePlayerById('player-id', dto)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(1, {
        id: 'player-id',
      });
      expect(mockRepo.findOneBy).toHaveBeenNthCalledWith(2, {
        uid: '123456789',
      });
      expect(mockRepo.save).toHaveBeenCalledWith(playerToUpdate);
    });
  });

  // deletePlayerById
  describe('deletePlayerById', () => {});

  // input parameter tests
  describe('input parameter tests', () => {
    const validDto = {
      name: 'valid-name',
      uid: '123456789',
      region: Region.AMERICA,
    };

    const validUserIdOrId = 'validUserIdOrId';

    const invalidDtos = [
      { label: 'undefined Dto', value: null },
      { label: 'null DTO', value: undefined },
      { label: 'non-object DTO', value: 'not-an-object' },
    ];

    const invalidUserIdOrId = [
      { label: 'null userId or Id', value: null },
      { label: 'null userId or Id', value: '' },
      { label: 'whitespace-only userId or Id', value: '   ' },
    ];

    describe('createPlayer parameter validation', () => {
      invalidDtos.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.createPlayer(value as any, validUserIdOrId)).rejects.toThrow(BadRequestException);
        });
      });

      invalidUserIdOrId.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.createPlayer(validDto, value as any)).rejects.toThrow(BadRequestException);
        });
      });
    });

    describe('getUserById parameter validation', () => {
      invalidUserIdOrId.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.getUserById(value as any)).rejects.toThrow(BadRequestException);
        });
      });
    });

    describe('getPlayerById parameter validation', () => {
      invalidUserIdOrId.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.getPlayerById(value as any)).rejects.toThrow(BadRequestException);
        });
      });
    });

    describe('updateById parameter validation', () => {
      invalidUserIdOrId.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.updatePlayerById(value as any, validDto)).rejects.toThrow(BadRequestException);
        });
      });

      invalidDtos.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.updatePlayerById(validUserIdOrId, value as any)).rejects.toThrow(BadRequestException);
        });
      });
    });

    describe('deleteById parameter validation', () => {
      invalidUserIdOrId.forEach(({ label, value }) => {
        it(`should throw BadRequestException for ${label}`, async () => {
          await expect(service.deletePlayerById(value as any)).rejects.toThrow(BadRequestException);
        });
      });
    });
  });
});
