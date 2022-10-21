import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {

  @Input("name")
  personName = '';

  @Input("age")
  personAge = 0;

  @Input("personId")
  personId = 0;

  constructor() { }

  ngOnInit(): void {
  }

  
}
