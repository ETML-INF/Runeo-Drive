import { CommonResource } from "./Common.resource";

export enum UserStatus {
  INACTIVE = "inactive",
  REQUESTED = "requested",
  CONFIRMED = "confirmed",
  VALIDATED = "validated",
  HIRED = "hired",
  FREE = "free",
  NOT_PRESENT = "not-present",
  RETIRED = "retired",
  TAKEN = "taken",
}

export interface UserResource extends CommonResource {
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  status: UserStatus;
  role: string;
  image_profile: string;
  has_notification_token: string;
  picture: string;
}
