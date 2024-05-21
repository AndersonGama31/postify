import { Post } from "src/modules/posts/entities/post.entity";

export class PostViewModel {
    static toHttp({ id, title, content, authorId, createdAt, published, banner, avatar, job }: Post) {
        return {
            createdAt,
            content,
            title,
            id,
            published,
            authorId,
            banner,
            avatar,
            job
        }
    }
}