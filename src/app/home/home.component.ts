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

  person: Person = { person_id: 0, name: '', age: 0 };
  people = new BehaviorSubject<Person[]>([]);

  constructor(private service: PersonService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        let person_id = Number(params.get("person_id"));
        return this.service.getPersonById(person_id);
      }),
    )
    .pipe(
      catchError(error => {
        console.log(`Catching error: ${error}`);
        return EMPTY;
      })
    )
    .subscribe({
      next: (p) => {
        this.person = p;
      },
      error: (error) => {
        console.log("Error loading person");
        console.log(error);
        console.log(typeof error);
      },
      complete: () => {
        console.log('Loaded');
      }
    });

    this.service.getPersons().subscribe({
      next: (person) => this.people.next(person),
      complete: () => console.log("persons loaded")
    });
  }

  changeUser(personId: number): void {
    this.service.getPersonById(personId).subscribe({
      next: (person) => this.person = person,
      error: (error) => {
        console.log(error);
        console.log(typeof error);
      },
      complete: () => console.log("refreshed user!")
    });
  }
}
