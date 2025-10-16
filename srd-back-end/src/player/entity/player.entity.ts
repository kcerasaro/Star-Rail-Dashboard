import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Region } from '../../../../shared/player.shared';

@Entity("player")
export class PlayerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column({unique: true})
    uid: string;

    @Column({ type: "enum", enum: Region })
    region: Region;
}