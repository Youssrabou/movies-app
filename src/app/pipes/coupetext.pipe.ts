import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coupetext'
})
export class CoupetextPipe implements PipeTransform {

  transform(value:string): string {
    return value.substring(0,99) + '...';
  }

}
