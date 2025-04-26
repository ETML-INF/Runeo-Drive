/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-05-08 09:34:26
 * @ Description: Represents one group of users, linking the users and the schedules. 
 * For now, the link between them and users is not defined in the application, they are only used liked to the schedules. 
 * //TODO: The way in which the schedules and the group are linked in these resources is the opposite of the meaningful way they are 
 * connected in the DB, it should totally be the group object having multiple schedules and not the individual schedules always having the same group.
 */

import { CommonResource } from "./Common.resource";

export interface GroupResource extends CommonResource {
    color: string;
    name: string;
}