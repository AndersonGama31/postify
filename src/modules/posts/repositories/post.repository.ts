import { Post } from "../entities/post.entity";

export abstract class PostRepository {
    abstract create(post: Post): Promise<void>;
    abstract findById(id: string): Promise<Post | null>;
    abstract delete(id: string): Promise<void>;
    abstract update(post: Post): Promise<void>;
}