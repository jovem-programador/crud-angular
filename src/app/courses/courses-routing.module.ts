import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  {
    // Rota vazia, chama o "courses component"
    path: '',
    component: CoursesComponent,
  },
  {
    // Rota do formulario "Adicionar curso"
    path: 'new',
    component: CourseFormComponent, resolve: {  course: CourseResolver  }
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent, resolve: {  course: CourseResolver  },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
