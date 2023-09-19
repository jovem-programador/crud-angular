import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value.toLowerCase()) {
      case 'front-end': return 'code';
      case 'back-end': return 'storage';
    }
    return 'null';
  }

}
