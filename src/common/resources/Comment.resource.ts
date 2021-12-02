import {CommonResource} from "./Common.resource";
import {UserResource} from "./User.resource";
import {DateTime} from "luxon";

export interface CommentResource extends CommonResource {
    content: string,
    user: UserResource,
    created_at: DateTime,
}
