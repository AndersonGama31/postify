import { Post } from "src/modules/posts/entities/post.entity";

export class PostViewModel {
    static toHttp({ id, title, content, authorId, createdAt, published, banner }: Post) {
        return {
            createdAt,
            content,
            title,
            id,
            published,
            authorId,
            banner
        }
    }
}