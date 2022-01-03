import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'articleimage'
})
export class ArticleimagePipe implements PipeTransform {
  baseApiUrl = environment.baseApiUri;
  transform(imageName:string): unknown {
    const  base = this.baseApiUrl.split("api")[0];
    return base + '/uploads/articles/' + imageName;
  }

}
