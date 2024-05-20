import { faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
    const user = new User(
        {
            email: faker.internet.email(),
            name: faker.person.firstName(),
            password: faker.internet.password(),
            job: faker.name.jobTitle(),
            avatar: faker.image.avatar(),
            ...override,
        },
        id,
    );

    console.log({ user });
    return user;
};