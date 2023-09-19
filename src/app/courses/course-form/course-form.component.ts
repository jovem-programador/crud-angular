import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {

    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(),
     error => {
      this.onError();
    });
  }

  onCancel() {
    this.location.back();
  }

  onSucess() {
    this.snackBar.open('Curso salvo com sucesso!!', '', { duration: 5000 });
    this.onCancel();
  }

  onError() {
    this.snackBar.open('Error ao salvar curso.', '', { duration: 5000 });
  }
}
