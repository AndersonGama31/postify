import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDTO {
    title: string;
    content: string;
    authorId: string;
}