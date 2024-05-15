import { Post } from "../entities/post.entity";
import { PostRepository } from "./post.repository";

export class PostRepositoryInMemory implements PostRepository {
    public posts: Post[] = [];

    async create(post: Post): Promise<void> {
        this.posts.push(post);
    }

    async findById(id: string): Promise<Post | null> {
        const post = this.posts.find((post) => post.id === id);

        if (!post) return null;

        return post;
    }

    async delete(id: string): Promise<void> {
        this.posts = this.posts.filter((post) => post.id !== id);
    }

    async update(Post: Post): Promise<void> {
        const postIndex = this.posts.findIndex(
            (currentPost) => currentPost.id === Post.id,
        );

        if (postIndex >= 0) this.posts[postIndex] = Post;
    }

    async findManyByUserId(
        userId: string,
        page: number,
        perPage: number,
    ): Promise<Post[]> {
        return this.posts
            .filter((post) => post.authorId === userId)
            .slice((page - 1) * perPage, page * perPage);
    }
}
