import { PostRepository } from "../../repositories/post.repository";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

interface DeletePostRequest {
    postId: string;
    authorId: string;
}

@Injectable()
export class DeletePostUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute({ postId, authorId }: DeletePostRequest): Promise<void> {
        const post = await this.postRepository.findById(postId);

        if (!post) throw new NotFoundException('Post not found');

        if (post.authorId !== authorId) throw new UnauthorizedException('You are not allowed to delete this post');

        await this.postRepository.delete(postId);
    }
}