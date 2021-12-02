import {UserResource} from "./User.resource";
import {VehicleCategoryResource} from "./VehicleCategory.resource";
import {VehicleResource} from "./Vehicle.resource";
import {CommonResource} from "./Common.resource";

export interface RunnerResource extends CommonResource {
    user: UserResource | null,
    vehicle_category: VehicleCategoryResource | null,
    vehicle: VehicleResource | null
}
