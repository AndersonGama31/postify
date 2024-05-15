import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PostRepository } from "src/modules/posts/repositories/post.repository";
import { Post } from "src/modules/posts/entities/post.entity";
import { PrismaPostMapper } from "../mappers/prisma-post-mapper";


@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private prisma: PrismaService) { }

    async create(post: Post): Promise<void> {
        const postRaw = PrismaPostMapper.toPrisma(post);

        await this.prisma.post.create({
            data: postRaw
        });
    }
    async findById(id: string): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        await this.prisma.post.delete({
            where: {
                id
            }
        });
    }
    async update(post: Post): Promise<void> {
        const postRaw = PrismaPostMapper.toPrisma(post);

        await this.prisma.post.update({
            where: {
                id: post.id
            },
            data: postRaw
        });
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({});
        return posts.map(PrismaPostMapper.toDomain);
    }
}