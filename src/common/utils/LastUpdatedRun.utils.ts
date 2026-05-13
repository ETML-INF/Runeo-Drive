/*
    Check if the run was updated during the last hour
*/

import { RunResource } from "../resources/Run.resource";
import { DateTime } from "luxon";

export function lastUpdatedRun(run: RunResource, userId: any): Boolean {
  const ONE_HOUR = 60 * 60 * 1000;
  const now = DateTime.local();
  console.log(run.id, run.updated_at, run.acknowledged_at);
  if (now.diff(run.updated_at).toMillis() < ONE_HOUR) {
    const notAcknowledged = !run.acknowledged_at.isValid || run.updated_at.valueOf() > run.acknowledged_at.valueOf();

    if (notAcknowledged) {
      return !!run.runners.find((runner) => runner.user?.id === userId);
    }
    return false;
  }

  return false;
}
