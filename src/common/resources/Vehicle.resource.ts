import {List} from "immutable";
import {UserResource} from "./User.resource";
import {VehicleCategoryResource} from "./VehicleCategory.resource";
import {CommentResource} from "./Comment.resource";
import {CommonResource} from "./Common.resource";

export interface VehicleResource extends CommonResource {
    name: string,
    plate_number: string,
    gas_level: number,
    nb_place: number,
    status: string,
    user: UserResource | boolean | null,
    type: VehicleCategoryResource,
    comments: List<CommentResource>
}
