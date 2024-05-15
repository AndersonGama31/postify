import { Post } from "../entities/post.entity";
import { faker } from '@faker-js/faker';

type Override = Partial<Post>;

export const makePost = ({ id, ...override }: Override): Post => {
    return new Post({
        title: faker.lorem.sentence(),
        authorId: faker.string.uuid(),
        content: faker.lorem.paragraph(),
        published: false,
        createdAt: faker.date.recent(),
        ...override
    }, id);
}