import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActeDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly acteType: string;

    @IsString()
    @IsNotEmpty()
    readonly fileURI: string;

    @IsString()
    readonly folder: string;

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
