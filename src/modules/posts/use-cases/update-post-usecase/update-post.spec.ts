import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdatePostUseCase } from '.';
import { makePost } from '../../factories/post.factory';
import { PostRepositoryInMemory } from '../../repositories/post-in-memory';

let postRepositoryInMemory: PostRepositoryInMemory;
let updatePostUseCase: UpdatePostUseCase;

describe('Delete post', () => {
    beforeEach(() => {
        postRepositoryInMemory = new PostRepositoryInMemory();
        updatePostUseCase = new UpdatePostUseCase(postRepositoryInMemory);
    });

    it('Should be able to update post when user is the author', async () => {
        const post = makePost({});

        postRepositoryInMemory.posts = [post];

        const updatedPost = await updatePostUseCase.execute({
            postId: post.id,
            authorId: post.authorId,
            content: 'New content',
            title: 'New title',
            banner: 'New banner',
        });

        expect(updatedPost.title).toBe('New title');
    });

    it('Should not be able to update post if user is not the author', async () => {
        const post = makePost({});

        postRepositoryInMemory.posts = [post];

        expect(async () => {
            await updatePostUseCase.execute({
                postId: post.id,
                authorId: 'non-existing-user-id',
                content: 'New content',
                title: 'New title',
                banner: 'New banner',
            });
        }).rejects.toThrow(UnauthorizedException);
    });

    it('Shoud be able to throw an error if post does not exist', async () => {
        expect(async () => {
            await updatePostUseCase.execute({
                postId: 'non-existing-post-id',
                authorId: 'user-id',
                content: 'New content',
                title: 'New title',
                banner: 'New banner',
            });
        }).rejects.toThrow(NotFoundException);
    });
});
