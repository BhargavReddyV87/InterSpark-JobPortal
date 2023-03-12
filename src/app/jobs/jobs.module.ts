import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';


import { JobsRoutingModule } from './jobs-routing.module';
import { jobReducer } from './store/jobs.reducer';
import { JobsEffect } from './store/jobs.effect';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, ShowComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
    StoreModule.forFeature('myjobs', jobReducer),
    StoreModule.forFeature('myjob', jobReducer),
    EffectsModule.forFeature([JobsEffect])
  ]
})
export class JobsModule { }
