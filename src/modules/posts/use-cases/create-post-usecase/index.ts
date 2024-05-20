import { CreatePostDTO } from "src/infra/http/modules/post/dto/create-post.dto";
import { PostRepository } from "../../repositories/post.repository";
import { Post } from "../../entities/post.entity";
import { Injectable } from "@nestjs/common";

interface CreatePostRequest {
    authorId: string;
    content: string;
    title: string;
    banner: string;
}

@Injectable()
export class CreatePostUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute(data: CreatePostRequest): Promise<Post> {
        const post = new Post({
            authorId: data.authorId,
            content: data.content,
            title: data.title,
            banner: data.banner,
        })
        await this.postRepository.create(post);
        return post;
    }
}