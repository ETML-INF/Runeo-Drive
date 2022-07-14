
import {CommonResource} from "./Common.resource";

export interface LogResource extends CommonResource {
    updated_at: string,
    description: string,
    action: string,
    id: number,
}

