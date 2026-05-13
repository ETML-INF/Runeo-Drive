import {CommonResource} from "./Common.resource";
import {DateTime} from "luxon";

export interface CommentResource extends CommonResource {
    content: string,
    user: { id: number, name: string },
    created_at: DateTime,
}
