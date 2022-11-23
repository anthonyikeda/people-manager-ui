import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {

  @Input("person")
  person: Observable<Person> = of();

  constructor() { }

  ngOnInit(): void {
    
  }

  
}
