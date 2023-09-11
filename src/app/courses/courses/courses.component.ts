import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  // Inicialização *courses -> dataSource | do tipo Course* | tratamento de dados da lista
  courses$: Observable<Course[]>;

  // Colunas da lista
  displayedColumns = ['name', 'category'];

  // Inicializando o *service*
  constructor(private coursesService: CoursesService) {
    // chamando o  metodo e passando para variavel responsavel pelo dataSource
    this.courses$ = this.coursesService.list();
  }
}
