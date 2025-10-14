import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column({unique: true})
    uid: string;

    @Column()
    region: string;
}