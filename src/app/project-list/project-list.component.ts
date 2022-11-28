import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_service';
import { ProjectDataSource } from './project.datasource';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent  implements OnInit{

  projectDataSource = new ProjectDataSource(this.projectService);
  columnNames = ["Name", "Code", "City", "Market", "StartDate"];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
      this.projectDataSource.loadProjects();
  }
}
