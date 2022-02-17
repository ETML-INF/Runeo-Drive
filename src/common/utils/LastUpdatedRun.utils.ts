/*
    Check if the run was updated during the last hour
*/

import {RunResource} from "../resources/Run.resource";

export function lastUpdatedRun(run :RunResource, userId: any): Boolean {
    const ONE_HOUR = 60 * 60 * 1000;
    let now = new Date();
    
    if((now.getTime() - run.updated_at) < ONE_HOUR){
        //the runner object the authenticated user is driving
        return !!run.runners.find(runner => runner.user?.id === userId);
    }
    
    return false;
}


