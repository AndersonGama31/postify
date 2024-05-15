import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UpdatePostUseCase } from 'src/modules/posts/use-cases/update-post-usecase';
import { CreatePostUseCase } from 'src/modules/posts/use-cases/create-post-usecase';
import { DeletePostUseCase } from 'src/modules/posts/use-cases/delete-post-usecase';
import { ListAllPostsUseCase } from 'src/modules/posts/use-cases/list-all-posts-usecase';

@Module({
    controllers: [PostController],
    imports: [DatabaseModule],
    providers: [
        CreatePostUseCase,
        UpdatePostUseCase,
        DeletePostUseCase,
        ListAllPostsUseCase,
    ]
})
export class PostModule { }
