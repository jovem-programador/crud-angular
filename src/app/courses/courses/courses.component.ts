import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  // Inicialização *courses -> dataSource | do tipo Course* | tratamento de dados da lista
  courses: Course[] = [
    {
      _id: '1',
      name: 'Angular',
      category: 'Front-End'
    }
  ];

  displayedColumns = ['name', 'category'];

  constructor() {}
}
