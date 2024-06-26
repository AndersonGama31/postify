import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface PostProps {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
    banner: string;
    createdAt: Date;
    job: string;
    avatar: string;
    name: string;
}

export class Post {
    private props: PostProps;
    private _id: string;

    constructor(
        props: Replace<
            PostProps,
            {
                createdAt?: Date;
                published?: boolean;
                job?: string;
                avatar?: string;
                name?: string;
            }
        >,
        id?: string,
    ) {
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            published: props.published ?? false,
            job: props.job ?? '',
            avatar: props.avatar ?? '',
            name: props.name ?? '',
        };

        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this.props.title;
    }

    set title(title: string) {
        this.props.title = title;
    }

    get content(): string {
        return this.props.content;
    }

    set content(content: string) {
        this.props.content = content;
    }

    get published(): boolean {
        return this.props.published;
    }

    set published(published: boolean) {
        this.props.published = published;
    }

    get authorId(): string {
        return this.props.authorId;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get banner(): string {
        return this.props.banner;
    }

    set banner(banner: string) {
        this.props.banner = banner;
    }

    get job(): string {
        return this.props.job;
    }

    get avatar(): string {
        return this.props.avatar;
    }

    get name(): string {
        return this.props.name;
    }
}
