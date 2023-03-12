import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { JobsService } from '../jobs.service';
import { selectJobs, selectJobById } from './jobs.selector';
import {
  invokeJobsAPI,
  jobsFetchAPISuccess,
  invokeShowJobAPI,
  jobFetchAPISuccess,
  invokeSaveNewJobAPI,
  saveNewJobAPISucess
} from './jobs.action';

@Injectable()
export class JobsEffect {
  constructor(
    private actions$: Actions,
    private jobsService: JobsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeJobsAPI),
      withLatestFrom(this.store.pipe(select(selectJobs))),
      mergeMap(([, jobformStore]) => {
        if (jobformStore.length > 0) {
          return EMPTY;
        }
        return this.jobsService
          .get()
          .pipe(map((data) => jobsFetchAPISuccess({ allJobs: data })));
      })
    )
  );

  getSingleJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeShowJobAPI),
      withLatestFrom(this.store.pipe(select(selectJobById(1)))),
      mergeMap(([, jobformStore]) => {
        return this.jobsService
          .findJobById(2)
          .pipe(map((data) => jobFetchAPISuccess({ aJob: data })));
      })
    )
  );

  // getSingleJob$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(invokeShowJobAPI),
  //     switchMap((action) => {
  //       this.appStore.dispatch(
  //         setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
  //       );
  //       return this.jobsService.getJobById(action.id).pipe(
  //         map((data) => {
  //           this.appStore.dispatch(
  //             setAPIStatus({
  //               apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
  //             })
  //           );
  //           return jobFetchAPISuccess({ aJob: data });
  //         })
  //       );
  //     })
  //   );
  // });

  saveNewJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewJobAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.jobsService.create(action.newJob).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewJobAPISucess({ newJob: data });
          })
        );
      })
    );
  });

}
