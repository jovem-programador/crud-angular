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
    private route: ActivatedRoute
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
      name: [lesson.name,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)],
      youtubeUrl: [lesson.youtubeUrl,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)],
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
        (result) => this.onSucess(),
        (error) => {
          this.onError();
        }
      );
    } else {
      alert('Form invalido');
    }
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

  // Validação do formulario
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;

      return `Tamanho minimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 250;

      return `Tamanho máximo exedido de ${requiredLength} caracteres`;
    }

    return 'Campo invalido';
  }

  isFormArrayRequired() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required') && lessons.touched;

  }
}
