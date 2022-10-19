import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person.types';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    const uri = `${env.person_api.uri}`;
    return this.http.get<Person[]>(uri);
  }

  getPersonById(personId: number): Observable<Person> {
    const uri = `${env.person_api.uri}/${personId}`;
    return this.http.get<Person>(uri);
  }
}
