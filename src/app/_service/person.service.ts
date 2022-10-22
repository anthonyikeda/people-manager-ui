import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Person } from './person.types';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    const uri = `${env.person_api.uri}`;
    return this.http.get<Person[]>(uri).pipe(
      map( value => {
        if (value.length == 0) {
          return [];
        } else {
          return value;
        }
      })
    );
  }

  getPersonById(personId: number): Observable<Person> {
    const uri = `${env.person_api.uri}/${personId}`;
    
    return this.http.get<Person>(uri).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(`Caught error ${error?.message}`);
    return throwError(() => new Error("Something bad happened"))
  }

  createPerson(name: string, age: number): Observable<string> {
    const uri = `${env.person_api.uri}?name=${name}&age=${age}`;
    return this.http.post(uri, null, { observe: 'response'}).pipe(
      map(response => {
        let location = response.headers.get('location') || '';
        return location;
      })
    );
  }
  
}
