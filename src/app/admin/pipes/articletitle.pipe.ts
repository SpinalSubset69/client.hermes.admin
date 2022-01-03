import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articletitle'
})
export class ArticletitlePipe implements PipeTransform {

  transform(title: string):string {
    const words = title.split(' ');

    let result:string = '';

    for(let word in words){
      const firstWord = words[word].charAt(0);
      result += firstWord.toUpperCase() + words[word].substring(1, words[word].length) + " ";

      if(word === '4'){
        break;
      }
    }
      return (result + '....').trim();
  }

}
