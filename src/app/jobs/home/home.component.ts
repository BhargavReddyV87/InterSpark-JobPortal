import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeJobsAPI } from '../store/jobs.action';
import { selectJobs } from '../store/jobs.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  jobs$ = this.store.pipe(select(selectJobs));

  ngOnInit(): void {
    this.store.dispatch(invokeJobsAPI());
  }
}
