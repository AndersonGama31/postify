import { compare } from "bcrypt";
import { UserRepositoryInMemory } from "../repositories/user-in-memory.repository";
import { CreateUserUseCase } from "./create-user-usecase";

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("Create User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("should be able to create a new user", async () => {
        expect(userRepositoryInMemory.users.length).toBe(0)

        const user = await createUserUseCase.execute({
            name: "User Test",
            email: "test@test.com",
            password: "123456",
            avatar: "avatar",
            job: "Software Engineer"
        })

        expect(userRepositoryInMemory.users).toEqual([user]);
    })

    it("shoud be able to create user with password encrypted", async () => {
        const userPasswordWithoutHash = "123456"

        const user = await createUserUseCase.execute({
            name: "User Test",
            email: "teste@mail.com",
            password: userPasswordWithoutHash,
            avatar: "avatar",
            job: "Software Engineer"
        });

        const userHasPasswordHashed = await compare(userPasswordWithoutHash, user.password)

        expect(userHasPasswordHashed).toBeTruthy()
    })
})