import { faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
    const user = new User(
        {
            email: faker.internet.email(),
            name: faker.person.firstName(),
            password: faker.internet.password(),
            ...override,
        },
        id,
    );

    console.log({ user });
    return user;
};