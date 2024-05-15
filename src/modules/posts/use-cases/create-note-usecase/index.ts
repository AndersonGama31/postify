import { CreatePostDTO } from "src/infra/http/modules/post/dto/create-post.dto";
import { PostRepository } from "../../repositories/post.repository";
import { Post } from "../../entities/post.entity";

export class CreatePostUseCase {
    constructor(private postRepository: PostRepository) { }

    async execute(data: CreatePostDTO): Promise<Post> {
        const post = new Post({
            authorId: data.authorId,
            content: data.content,
            title: data.title,
            published: false
        })
        await this.postRepository.create(post);
        return post;
    }
}