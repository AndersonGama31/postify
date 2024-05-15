import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CreatePostUseCase } from 'src/modules/posts/use-cases/create-post-usecase';
import { AuthenticatedRequestModel } from '../auth/model/authenticated-request.model';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostViewModel } from './view-model/post-view.model';
import { UpdatePostUseCase } from 'src/modules/posts/use-cases/update-post-usecase';
import { UpdatePostDTO } from './dto/update-post.dto';
import { DeletePostUseCase } from 'src/modules/posts/use-cases/delete-post-usecase';
import { ListAllPostsUseCase } from 'src/modules/posts/use-cases/list-all-posts-usecase';

@Controller('posts')
export class PostController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly updatePostUseCase: UpdatePostUseCase,
        private readonly deletePostUseCase: DeletePostUseCase,
        private readonly listAllPostsUseCase: ListAllPostsUseCase,
    ) { }

    @Post()
    async createPost(
        @Request() request: AuthenticatedRequestModel,
        @Body() body: CreatePostDTO
    ) {
        const { content, title } = body;
        const post = await this.createPostUseCase.execute({
            content,
            title,
            authorId: request.user.id as string,
        });

        return PostViewModel.toHttp(post);
    }

    @Put()
    async updatePost(
        @Request() request: AuthenticatedRequestModel,
        @Body() body: UpdatePostDTO
    ) {
        const { content, title, id } = body;
        const post = await this.updatePostUseCase.execute({
            postId: id,
            content,
            title,
            authorId: request.user.id as string,
        });

        return PostViewModel.toHttp(post);
    }

    @Delete(':id')
    async deletePost(
        @Request() request: AuthenticatedRequestModel,
        @Param() body: { id: string }
    ) {
        await this.deletePostUseCase.execute({
            postId: body.id,
            authorId: request.user.id as string,
        });

        return {
            message: 'Post deleted successfully',
        };
    }

    @Get()
    async listAllPosts() {
        const posts = await this.listAllPostsUseCase.execute();

        return posts.map(post => PostViewModel.toHttp(post));
    }
}
