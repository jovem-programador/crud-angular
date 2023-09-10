import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // Inicializando o serviço HttpClient
  constructor(private httpClient: HttpClient) { }

  // Metodo do tipo Course responsavel por retornar os cursos
  list(): Course[] {
    return [
      {
        _id: '1',
        name: 'Angular',
        category: 'Front-End'
      }
    ];
  }
}
