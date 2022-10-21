import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../_service/person.types';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  @Input()
  people = new BehaviorSubject<Person[]>([]);

  constructor() { }

  ngOnInit(): void {
  }

}
