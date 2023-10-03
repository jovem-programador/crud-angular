import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      delay(1000),
      first(),
      tap((courses) => console.log(courses))
    );
  }

  // Pegando os dados do curso atraves do ID
  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  // Verifica se o ID existe, chama o POST ou PUT
  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }

    return this.create(record);
  }

  // POST do banco de dados
  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record);
  }

  // PUT do banco de dados
  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record);
  }

  // Delete do banco de dados
  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
