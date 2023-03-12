import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jobs } from './store/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Jobs[]>('http://localhost:3000/jobs');
  }

  create(payload: Jobs) {
    return this.http.post<Jobs>('http://localhost:3000/jobs', payload);
  }


  findJobById(id: number): Observable<Jobs>{
    return this.http.get<Jobs>(`http://localhost:3000/jobs/${id}`);
  }
}
