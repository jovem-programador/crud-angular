import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  // Colunas da lista
  readonly displayedColumns = ['name', 'category', 'actions'];

  onAdd() {
    // Navega para a rota "new", relativa a rota atual
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }
}
