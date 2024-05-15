import { PostRepository } from "../../repositories/post.repository";
import { Post } from "../../entities/post.entity";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

interface EditNoteUseCase {
    title: string;
    content: string;
    authorId: string;
    postId: string;
}

@Injectable()
export class UpdatePostUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute({ authorId, content, title, postId }: EditNoteUseCase): Promise<Post> {
        const post = await this.postRepository.findById(postId);

        if (!post) throw new NotFoundException('Post not found');

        if (post.authorId !== authorId) throw new UnauthorizedException('You are not allowed to delete this post');

        post.title = title;
        post.content = content;

        await this.postRepository.update(post);

        return post;
    }
}