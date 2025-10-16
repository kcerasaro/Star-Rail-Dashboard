import { PlayerEntity } from "./entity/player.entity";
import { Player } from "../../../shared/player.shared";

export function mapEntityToPlayer(entity: PlayerEntity): Player {
    return {
        id: entity.id,
        userId: entity.userId,
        name: entity.name,
        uid: entity.uid,
        region: entity.region
    };
}