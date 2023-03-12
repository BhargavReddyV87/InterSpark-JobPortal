import { createAction, props } from '@ngrx/store';
import { Jobs } from './jobs';

export const invokeJobsAPI = createAction(
  '[Jobs API] Invoke Jobs Fetch API'
);

export const jobsFetchAPISuccess = createAction(
  '[Jobs API] Fetch API Success',
  props<{ allJobs: Jobs[] }>()
);

export const invokeShowJobAPI = createAction(
  '[Job API] Inovke show job api',
  props<{id: number}>()
);

export const jobFetchAPISuccess = createAction(
  '[Job API] show job api success',
  props<{ aJob: Jobs }>()
);

export const invokeSaveNewJobAPI = createAction(
  '[Jobs API] Inovke save new job api',
  props<{ newJob: Jobs }>()
);

export const saveNewJobAPISucess = createAction(
  '[Jobs API] save new job api success',
  props<{ newJob: Jobs }>()
);
