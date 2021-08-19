import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActionDto {
    @IsString()
    @IsNotEmpty()
    readonly actionType: string;

    @IsString()
    @IsNotEmpty()
    readonly ressourceURI: string;

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsString()
    readonly sender: string;

    @IsString()
    readonly reciever: string;

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
