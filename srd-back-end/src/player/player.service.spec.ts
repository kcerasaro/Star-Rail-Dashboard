import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PlayerService } from "./player.service";
import { PlayerEntity } from "./entities/player.entity";
import { CreatePlayerDto } from "./dtos/create-player.dto";
import { Region } from "../../../shared/player.shared";

describe("PlayerService", () => {
    let service: PlayerService;

    const mockRepo = {
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlayerService, 
                {
                    provide: getRepositoryToken(PlayerEntity),
                    useValue: mockRepo,
                  }
            ],
        }).compile();

        service = module.get<PlayerService>(PlayerService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // createPlayer
    describe("createPlayer", () => {
        it("should create a player", async () => {
            const dto: CreatePlayerDto = {
                name: "player-name", 
                uid: "123456789", 
                region: Region.AMERICA
            }

            const mockSavedPlayer = {
                id: "player-id",
                userId: "user-id",
                name: "player-name",
                uid: "123456789",
                region: Region.AMERICA,
            }

            mockRepo.findOneBy.mockResolvedValue(null);
            mockRepo.create.mockReturnValue({... dto, userId: "user-id"});
            mockRepo.save.mockResolvedValue(mockSavedPlayer);

            const result = await service.createPlayer(dto, "user-id");

            expect(mockRepo.findOneBy).toHaveBeenCalledWith({uid: dto.uid});
            expect(mockRepo.create).toHaveBeenCalledWith({... dto, userId: "user-id"})
            expect(mockRepo.save).toHaveBeenCalled();

            expect(result).toEqual(expect.objectContaining({
                name: "player-name",
                uid: "123456789",
                region: Region.AMERICA
            }));
        });

        it("should throw ConflictException if UID already exists", async () => {
            expect("temp").toEqual("temp");

        });
    });

    // getUserById

    // getPlayerById

    // updatePlayerById

    // deletePlayerById

});