import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    readonly taskType: string;

    @IsString()
    @IsNotEmpty()
    readonly ressourceId: string;

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsString()
    @IsNotEmpty()
    readonly motif: string;

    @IsString()
    readonly sender: string;

    @IsString()
    readonly reciever: string;

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
