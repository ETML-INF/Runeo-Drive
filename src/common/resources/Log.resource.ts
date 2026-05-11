import { CommonResource } from "./Common.resource";

export interface LogResource extends CommonResource {
  created_at: string;
  updated_at: string;
  description: string;
  action: string;
  id: number;
  user?: { name: string };
}
