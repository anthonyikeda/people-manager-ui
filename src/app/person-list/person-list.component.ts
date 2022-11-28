import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';
import { PersonDataSource } from './person.datasource';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personDataSource = new PersonDataSource(this.personService);
  columnNames = ['Name', 'Age', 'Action'];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personDataSource.loadPersons();
  }

  editPerson(personId: number): void {
    console.log(`Editing person ${personId}`);
  }
}
