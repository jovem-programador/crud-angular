import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  /*
    Inicialização *courses -> dataSource | do tipo Course* | tratamento de dados da lista
    courses$ -> Informando que a var é um observablo do tipo Array courses
  */
  courses$: Observable<Course[]>;

  // Inicializando o *service*
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // chamando o  metodo e passando para variavel responsavel pelo dataSource
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        // of([]) retorna um observablo vazio, para parar o spinner
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    // Navega para a rota "new", relativa a rota atual
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
