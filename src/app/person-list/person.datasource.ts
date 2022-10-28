import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonService } from '../_service';
import { Person } from '../_service/person.types';

export class PersonDataSource implements DataSource<Person> {

    private personSubject = new BehaviorSubject<Person[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private service: PersonService) { }

    connect(collectionViewer: CollectionViewer): Observable<readonly Person[]> {
        return this.personSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.personSubject.complete();
        this.loadingSubject.complete();
    }

    loadPersons(): void {
        this.loadingSubject.next(true);

        this.service.getPersons()
        .subscribe({
            next: (persons) => this.personSubject.next(persons),
            complete: () => this.loadingSubject.next(false)
        })
    }

}