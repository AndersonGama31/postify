import { UserRepositoryInMemory } from "../repositories/user-in-memory.repository";
import { CreateUserUseCase } from "./create-user";

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("Create User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("should be able to create a new user", async () => {
        expect(userRepositoryInMemory.users.length).toBe(0)
    })
})