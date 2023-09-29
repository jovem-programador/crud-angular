import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';

const routes: Routes = [
  {
    // Rota vazia, chama o "courses component"
    path: '',
    component: CoursesComponent,
  },
  {
    // Rota do formulario "Adicionar curso"
    path: 'new',
    component: CourseFormComponent,
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
