import { PostRepository } from "../../repositories/post.repository";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

interface DeletePostRequest {
    postId: string;
    userId: string;
}

export class DeletePostUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute({ postId, userId }: DeletePostRequest): Promise<void> {
        const post = await this.postRepository.findById(postId);

        if (!post) throw new NotFoundException('Post not found');

        if (post.authorId !== userId) throw new UnauthorizedException('You are not allowed to delete this post');

        await this.postRepository.delete(postId);
    }
}