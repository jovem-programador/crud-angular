import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];

  // Colunas da lista
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onAdd() {
    // Navega para a rota "new", relativa a rota atual
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
