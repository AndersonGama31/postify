import { Post as PostRaw } from '@prisma/client';
import { Post } from 'src/modules/posts/entities/post.entity';

export class PrismaPostMapper {
    static toPrisma({ authorId, content, createdAt, id, published, title }: Post): PostRaw {
        return {
            authorId,
            content,
            createdAt,
            id,
            published,
            title,
        };
    }

    static toDomain({ authorId, content, createdAt, published, title, id }: PostRaw): Post {
        return new Post({
            authorId,
            content,
            createdAt,
            published,
            title
        }, id
        );
    }
}