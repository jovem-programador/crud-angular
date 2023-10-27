import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  //Inicialização do formulario
  form!: FormGroup;

  // Construtor
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    // Pegando dados da rota EDIT
    const course: Course = this.route.snapshot.data['course'];
    // Setando dados no formulario
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required
      ),
    });
  }

  private retrieveLessons(course: Course) {
    // Atribuindo um Array vazio
    const lessons = [];

    // Caso ' lessons ' exista
    if (course?.lessons) {
      // Percore os dados e faz um push das Aulas
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      // Caso não exista, cria a Aula vazia
      lessons.push(this.createLesson());
    }

    // Retorna as Aulas
    return lessons;
  }

  // Lesson do Curso
  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
      ],
    });
  }

  // Pegando dados do Array
  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  // Adicionando uma nova Aula
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  // Removando Aula
  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  // Cadastrando curso
  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (result) => this.formUtils.onSucess(),
        (error) => {
          this.formUtils.onError();
        }
      );
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  // Botão de cancelar
  onCancel() {
    this.location.back();
  }
}
