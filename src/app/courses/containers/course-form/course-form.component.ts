import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

      // Pegando dados da rota EDIT
      const course: Course = this.route.snapshot.data['course'];

      // Setando dados no formulario
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      })
  }

  // Inicialização do formulario
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  // Cadastrando curso
  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(),
     error => {
      this.onError();
    });
  }

  // Botão de cancelar
  onCancel() {
    this.location.back();
  }

  // Mensagem de sucesso
  onSucess() {
    this.snackBar.open('Curso salvo com sucesso!!', '', { duration: 5000 });
    this.onCancel();
  }

  // Mensagem de error
  onError() {
    this.snackBar.open('Error ao salvar curso.', '', { duration: 5000 });
  }
}
