import { CommonResource } from "./Common.resource";

export interface UserStatusResource {
  id: number;
  slug: string;
  name: string;
}

// Kept for userStatusColor / userStatusMapping lookups in User.utils
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

export interface UserPicture {
  id: number;
  url: string;
  path: string;
  type: string;
  title: string;
}

export interface UserResource extends CommonResource {
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  // /api/me returns status as an object; /api/users returns it as a string
  status: UserStatusResource | UserStatus;
  role: string;
  has_notification_token: boolean;
  picture: UserPicture | null;
}
