/*
    Check if the run was updated during the last hour
*/

import {RunResource} from "../../common/resources/Run.resource";

export function LastUpdated(run :RunResource): Boolean { 
    const ONE_HOUR = 60 * 60 * 1000;
    let now = new Date();
    
    if((now.getTime() - run.updated_at) < ONE_HOUR){
        return true;
    }
    
    return false;
}


