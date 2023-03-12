import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Jobs } from '../store/jobs';
import { invokeSaveNewJobAPI } from '../store/jobs.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})


export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  jobForm: Jobs = {
    "id": 0,
    "job_number": "",
    "job_title": "",
    "job_start_date": "",
    "job_close_date": "",
    "experience_required": 0,
    "number_of_openings": "",
    "job_notes": ""
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewJobAPI({ newJob: this.jobForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/']);
      }
    });
  }
}
