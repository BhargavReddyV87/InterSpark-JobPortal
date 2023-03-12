import { createFeatureSelector,createSelector } from '@ngrx/store';
import { Jobs } from './jobs';

export const selectJobs = createFeatureSelector<Jobs[]>('myjobs');
export const selectJobById = (jobId: number) =>
  createSelector(selectJobs, (jobs: Jobs[]) => {
    var jobbyId = jobs.filter((j) => j.id == jobId);
    if (jobbyId.length == 0) {
      return null;
    }
    return jobbyId[0];
  });
