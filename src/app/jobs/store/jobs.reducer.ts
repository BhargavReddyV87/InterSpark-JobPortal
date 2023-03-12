import { createReducer, on } from '@ngrx/store';
import { Jobs } from './jobs';
import { jobsFetchAPISuccess, jobFetchAPISuccess, saveNewJobAPISucess } from './jobs.action';

export const initialState: ReadonlyArray<Jobs> = [];

export const jobReducer = createReducer(
    initialState,
    on(jobsFetchAPISuccess, (state, { allJobs }) => {
      return allJobs;
    }),
    on(saveNewJobAPISucess, (state, { newJob }) => {
      let newState = [...state];
      newState.unshift(newJob);
      return newState;
    })
);
