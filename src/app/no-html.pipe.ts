import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noHTML'
})
export class NoHTMLPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let result =  value.replace(/<\/div>/g, '\n');
    result = result.replace(/<.*?>/g, '');
    return result;
  }

}
