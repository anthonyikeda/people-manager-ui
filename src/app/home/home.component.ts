import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person: Observable<Person> = of();

  constructor(private service: PersonService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.person = this.route.paramMap.pipe(
      switchMap(params => {
        let person_id = Number(params.get("person_id"));
        return this.service.getPersonById(person_id);
      }),
    )
    .pipe(
      catchError(error => {
        console.log(`Catching error: ${error?.status}`);
        return EMPTY;
      })
    );

  }

  changeUser(personId: number): void {
    this.person = this.service.getPersonById(personId);
  }
}
