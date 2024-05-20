import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface UserSchema {
    name: string;
    email: string;
    job: string;
    avatar: string;
    password: string;
    createdAt: Date;
}

export class User {
    private props: UserSchema;
    private _id: string;

    constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date()
        };
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get job(): string {
        return this.props.job;
    }

    get avatar(): string {
        return this.props.avatar;
    }

    set job(job: string) {
        this.props.job = job;
    }

    set avatar(avatar: string) {
        this.props.avatar = avatar;
    }

    set email(email: string) {
        this.props.email = email;
    }

    set password(password: string) {
        this.props.password = password;
    }
}
