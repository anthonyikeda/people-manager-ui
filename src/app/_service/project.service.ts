import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from './project.types';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    const uri = `${env.project_api.uri}/project`;

    return this.http.get<Project[]>(uri);
  }
}
