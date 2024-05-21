import { PostRepository } from "../../repositories/post.repository";
import { Post } from "../../entities/post.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListAllPostsUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute(): Promise<Post[] | []> {
        const posts = await this.postRepository.findAll()
        return posts;
    }
}