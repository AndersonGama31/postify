import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(200)
    content: string;

    @IsString()
    @IsNotEmpty()
    banner: string;
}