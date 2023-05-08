/**
 * @ Author: Clément Sartoni
 * @ Create Time: 2023-05-08
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-05-08 09:34:26
 * @ Description: Represents one schedule period of the main user
 */

import { CommonResource } from "./Common.resource";

export interface ScheduleResource extends CommonResource {
    start_time: Date;
    end_time: Date;
}
