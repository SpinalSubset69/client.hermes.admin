import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  baseApiUrl = environment.baseApiUri;
  transform(imageName: string): unknown {
    return this.baseApiUrl + '/reporters/getimage/' + imageName;
  }

}
