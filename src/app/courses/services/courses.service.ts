import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = "../../../assets/courses.json";

  // Inicializando o serviço HttpClient
  constructor(private httpClient: HttpClient) { }

  // Metodo do tipo Course responsavel por retornar os cursos
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      tap(courses => console.log(courses))
    );
  }
}
