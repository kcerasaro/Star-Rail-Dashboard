import { ApiProperty } from '@nestjs/swagger';
import {IsString, Matches, IsNotEmpty} from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Otter", description: "In-game name of the player"})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "602921001", description: "Unique Player UID"})
    @Matches(/^\d{9}$/) // [000000000, 999999999] 
    uid: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "America", description: "Region the player belongs to"})
    region: string;
}
