import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // Redirecionando para a rota "courses", caso seja vazio
    path: '', pathMatch: 'full', redirectTo: 'courses'
  },
  {
    /*
      Rota Filho *Lazy Loading* -> 'courses' nome da rota
      * import -> vai o caminho do modulo *, *then -> vai o nome do modulo*
    */
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
