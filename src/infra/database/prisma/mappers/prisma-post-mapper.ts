import { Post as PostRaw } from '@prisma/client';
import { Post } from 'src/modules/posts/entities/post.entity';

export class PrismaPostMapper {
    static toPrisma({ authorId, content, createdAt, id, published, title, banner }: Post): PostRaw {
        return {
            id,
            title,
            authorId,
            content,
            published,
            createdAt,
            banner
        };
    }

    static toDomain({ authorId, content, createdAt, published, title, id, banner }: PostRaw): Post {
        return new Post({
            authorId,
            content,
            createdAt,
            published,
            title,
            banner
        }, id
        );
    }
}