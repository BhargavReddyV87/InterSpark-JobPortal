
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';


import { Jobs } from '../store/jobs';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeShowJobAPI } from '../store/jobs.action';
import { selectJobById } from '../store/jobs.selector';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  oneJob$: Jobs = {
    "id": 0,
    "job_number": "",
    "job_title": "",
    "job_start_date": "",
    "job_close_date": "",
    "experience_required": 0,
    "number_of_openings": "",
    "job_notes": ""
  };

  ngOnInit(): void {
    let job$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        this.store.dispatch(invokeShowJobAPI({id:id}));
        return this.store.pipe(select(selectJobById(id)));
      })
    );
    job$.subscribe((data) => {
      if (data) {
        console.log('data',data)
        this.oneJob$ = data
      }
    });
  }

}
