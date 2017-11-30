import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dependencySelect'
})
export class DependencySelectPipe implements PipeTransform {

  transform(elements: any[], elementType: string): any[] {
    return elements.filter(e => e.type == elementType);
  }

}
