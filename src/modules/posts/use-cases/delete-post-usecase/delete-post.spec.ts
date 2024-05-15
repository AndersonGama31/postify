import { DeletePostUseCase } from '.';
import { PostRepositoryInMemory } from '../../repositories/post-in-memory';
import { makePost } from '../../factories/post.factory';
import { makeUser } from '../../../users/factories/user.factory';

let postRepositoryInMemory: PostRepositoryInMemory;
let deletePostUseCase: DeletePostUseCase;

describe('Delete post', () => {
    beforeEach(() => {
        postRepositoryInMemory = new PostRepositoryInMemory();
        deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    });

    it('Should be able to delete post', async () => {
        const user = makeUser({});
        const post = makePost({
            authorId: user.id,
        });

        postRepositoryInMemory.posts = [post];

        await deletePostUseCase.execute({
            postId: post.id,
            userId: user.id,
        });

        expect(postRepositoryInMemory.posts).toHaveLength(0);
    });

    it('Should not be able to delete post if user is not the author', async () => {
        const user = makeUser({});
        const post = makePost({
            authorId: user.id,
        });

        postRepositoryInMemory.posts = [post];

        await expect(
            deletePostUseCase.execute({
                postId: post.id,
                userId: 'other-user-id',
            }),
        ).rejects.toThrowError('You are not allowed to delete this post');
    });

    it('Shoud be able to throw an error if post does not exist', async () => {

        expect(async () => {
            await deletePostUseCase.execute({
                postId: 'non-existing-post-id',
                userId: 'user-id',
            });
        }).rejects.toThrow('Post not found');
    });
});
