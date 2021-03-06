import { Pipe, PipeTransform } from '@angular/core';

const NO_DIV = 'no-div';

@Pipe({
  name: 'noHTML'
})
export class NoHTMLPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const arg = args;
    let result =  value.replace(/<\/div>/g, '<br>');
    result = result.replace(/<\/h.*?>/g, '<br>');
    result = result.replace(/<div.*?>/g, '');
    if (arg !== NO_DIV) { result = result.replace(/((?!<br>)<.*?>)/g, ''); }
    return result;
  }

}
