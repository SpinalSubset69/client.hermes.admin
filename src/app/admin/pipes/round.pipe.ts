import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value:number): unknown {
    const valueString = value.toString();

    const valueSplit = valueString.split('.');

    if(valueSplit[1]){
      let valueNumber=  Number(valueSplit[0]);
      return ++valueNumber;
    }
    return Math.round(value);
  }

}
