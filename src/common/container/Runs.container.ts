import { RunResource } from "../resources/Run.resource";
import { List } from "immutable";
import Axios from "axios";
import { DateTime } from "luxon";
import { useState } from "react";
import { DataContainerInterface } from "./DataContainer.interface";
import { RunnerResource } from "../resources/Runner.resource";
import { LogResource } from "../resources/Log.resource";

export interface RunsContainer extends DataContainerInterface<RunResource> {
  updateVehicle: (runnerId: number, carId: number) => Promise<void>;
  startRun: (run: RunResource) => Promise<void>;
  stopRun: (run: RunResource) => Promise<void>;
  takeRun: (run: RunResource, runner: RunnerResource) => Promise<void>;
  acknowledgeRun: (run: RunResource) => Promise<void>;
  getLogs: (runId: number) => Promise<LogResource[]>;
  getRunsFromSameArtist: (run: RunResource) => Promise<RunResource[]>;
  postLog: (run: number, message: string) => Promise<LogResource>;
}

export function useRunsContainer(): RunsContainer {
  const [items, setItems] = useState<List<RunResource>>(List());

  const upsertRun = (run: RunResource) => {
    setItems(prev => {
      const idx = prev.findIndex(r => r.id === run.id);
      return idx >= 0 ? prev.set(idx, run) : prev.push(run);
    });
  };

  const refresh = (): Promise<void> =>
    getRunsFromApi().then(runs => setItems(List(runs)));

  const readFromCache = (): Promise<void> => Promise.resolve();

  const empty = () => setItems(List());

  const getRunsFromSameArtist = (run: RunResource): Promise<RunResource[]> =>
    getRunsFromSameArtistApi(run);

  const updateVehicle = (runnerId: number, carId: number): Promise<void> =>
    updateRunnerCarApi(runnerId, carId)
      .then(upsertRun)
      .catch((error) => error.text);

  const startRun = (run: RunResource): Promise<void> =>
    startRunApi(run)
      .then(upsertRun)
      .catch((error) => error.text);

  const stopRun = (run: RunResource): Promise<void> =>
    stopRunApi(run)
      .then(upsertRun)
      .catch((error) => error.text);

  const takeRun = (run: RunResource, runner: RunnerResource) =>
    takeRunApi(run, runner).then(upsertRun);

  const acknowledgeRun = (run: RunResource): Promise<void> =>
    acknowledgeRunApi(run)
      .then(upsertRun)
      .catch((error) => error.text);

  const getLogs = (runId: number) => getLogsFromApi(runId);

  const postLog = (run: number, message: string) => postLogToApi(run, message);

  return {
    items,
    readFromCache,
    refresh,
    empty,
    getRunsFromSameArtist,
    updateVehicle,
    startRun,
    stopRun,
    takeRun,
    acknowledgeRun,
    getLogs,
    postLog,
  };
}

function takeRunApi(run: RunResource, runner: RunnerResource): Promise<RunResource> {
  return Axios.patch(`/runners/${runner.id}/driver`, {
    updated_at: run.updated_at.toString()
  })
    .then((res) => parseRunResource(res.data))
    .catch((error) => {
      if (error.response.status === 409) {
        throw new Error("Ce poste est déjà pris par un autre conducteur.");
      } else {
        throw new Error(error.message);
      }
    });
}

function startRunApi(run: RunResource): Promise<RunResource> {
  return Axios.patch(`/runs/${run.id}/start`)
    .then((res) => parseRunResource(res.data))
    .catch((error) => error.text);
}

function stopRunApi(run: RunResource): Promise<RunResource> {
  return Axios.patch(`/runs/${run.id}/stop`)
    .then((res) => parseRunResource(res.data))
    .catch((error) => error.text);
}

function updateRunnerCarApi(runnerId: number, carId: number): Promise<RunResource> {
  return Axios.patch(`/runners/${runnerId}/car`, {
    car_id: carId
  })
    .then((res) => parseRunResource(res.data))
    .catch((error) => error.text);
}

function getRunsFromApi(onlyFromTime?: DateTime): Promise<RunResource[]> {
  const params: any = {};

  if (onlyFromTime) {
    params.onlyFromTime = onlyFromTime.toString();
  }

  return Axios.get("/runs", { params })
    .then((res) => res.data.map(parseRunResource));
}

function getRunsFromSameArtistApi(run: RunResource): Promise<RunResource[]> {
  return Axios.get(`/runs/artist/${run.artist_id}`)
    .then((res) => res.data.map(parseRunResource))
    .catch((error) => error);
}

function acknowledgeRunApi(run: RunResource): Promise<RunResource> {
  return Axios.patch(`/runs/${run}/acknowledge`)
    .then((res) => parseRunResource(res.data))
    .catch((error) => error.text);
}

function parseDate(value: string | null | undefined): DateTime {
  if (!value) return DateTime.invalid('null');
  const iso = DateTime.fromISO(value);
  if (iso.isValid) return iso;
  return DateTime.fromSQL(value);
}

function parseRunResource(runFromApi: any): RunResource {
  return {
    ...runFromApi,
    begin_at: parseDate(runFromApi.begin_at),
    end_at: parseDate(runFromApi.end_at),
    finished_at: parseDate(runFromApi.finished_at),
    start_at: parseDate(runFromApi.start_at),
    updated_at: parseDate(runFromApi.updated_at),
    acknowledged_at: parseDate(runFromApi.acknowledged_at),
    waypoints: List(runFromApi.waypoints),
    runners: List(runFromApi.runners)
  };
}

function getLogsFromApi(run: number): Promise<LogResource[]> {
  return Axios.get(`/runs/${run}/logs`).then((res) => res.data.map(parseLogResource));
}

function postLogToApi(run: number, description: string): Promise<LogResource> {
  return Axios.post(`/runs/${run}/logs`, {
    description
  }).then((res) => res.data);
}

function parseLogResource(logFromApi: any): LogResource {
  return {
    ...logFromApi,
    updated_at: DateTime.fromISO(logFromApi.updated_at),
    description: logFromApi.description,
    id: logFromApi.id,
    action: logFromApi.action
  };
}
