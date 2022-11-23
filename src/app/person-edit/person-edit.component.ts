import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personId = 0;

  personForm: FormGroup;
  
  constructor(private service: PersonService,private fBuilder: FormBuilder, private route: ActivatedRoute) {
    this.personForm = fBuilder.group({
      personId: ['', Validators.required],
      name: ['', Validators.required],
      age: ['']
    });
  }

  ngOnInit(): void {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.personId = Number(params.get("person_id"));
          return this.service.getPersonById(this.personId);
        })
      ).subscribe({
        next: (person) => {
          this.personForm.get('personId')?.setValue(this.personId);
          this.personForm.get('name')?.setValue(person.name);
          this.personForm.get('age')?.setValue(person.age);
        },
        complete: () => {
          console.log(`Person ${this.personId}loaded`);
        }
      })
  }

  saveUpdate(): void {
    let person : Person = {
      person_id: this.personForm.get("personId")?.value,
      name: this.personForm.get("name")?.value,
      age: this.personForm.get("age")?.value,
    };

    console.log(JSON.stringify(person));

    this.service.updatePerson(person);
  }
}
