import { CreatePostUseCase } from '.';
import { PostRepositoryInMemory } from '../../repositories/post-in-memory';

let postRepositoryInMemory: PostRepositoryInMemory;
let createPostUseCase: CreatePostUseCase;

describe('Create post', () => {
    beforeEach(() => {
        postRepositoryInMemory = new PostRepositoryInMemory();
        createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    });

    it('Should be able to create post', async () => {
        expect(postRepositoryInMemory.posts).toEqual([]);

        const post = await createPostUseCase.execute({
            authorId: '123',
            content: 'Post content',
            title: 'Post title',
        });

        console.log(post)

        expect(postRepositoryInMemory.posts).toEqual([post]);
    });
});
