import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { Project, ProjectService } from "../_service";

export class ProjectDataSource implements DataSource<Project> {

    private projectsSubject = new BehaviorSubject<Project[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private projectService: ProjectService){}

    connect(collectionViewer: CollectionViewer): Observable<readonly Project[]> {
        return this.projectsSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.projectsSubject.complete();
        this.loadingSubject.complete();
    }

    loadProjects(): void {
        this.loadingSubject.next(true);

        this.projectService.getProjects()
        .subscribe({
            next: (projects) => this.projectsSubject.next(projects),
            complete: () => this.loadingSubject.next(false)
        })
    }
}