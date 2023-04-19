import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newPipe'
})
export class NewPipePipe implements PipeTransform {

  transform(value: number, exponent=2): number {
    return Math.pow(value, exponent);
  }

}
