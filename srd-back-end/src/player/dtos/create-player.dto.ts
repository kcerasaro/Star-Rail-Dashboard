import { ApiProperty } from '@nestjs/swagger';
import {IsString, Matches, IsNotEmpty, IsEnum, MaxLength} from 'class-validator';
import { Region } from '../../../../shared/player.shared';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    // @MaxLength(14, {message: 'Name must be 14 characters or fewer'})
    @ApiProperty({example: "Otter", description: "In-game name of the player"})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "602921001", description: "Unique Player UID"})
    @Matches(/^\d{9}$/) // [000000000, 999999999] 
    uid: string;

    @IsNotEmpty()
    @IsEnum(Region)
    @ApiProperty({enum: Region, example: Region.AMERICA, description: "Region the player belongs to"})
    region: Region;
}