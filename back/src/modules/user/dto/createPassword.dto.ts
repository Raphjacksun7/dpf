import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;
}
