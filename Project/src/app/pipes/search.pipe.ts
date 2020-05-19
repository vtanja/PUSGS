import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';

@Pipe({
  name: 'search',
  pure:false
})
export class SearchPipe implements PipeTransform {
  transform(value: User[], filterString:string): any {
    const resultArray:User[]=[];

    if(value.length===0 || filterString===''){
      return value;
    }
    for(const item of value){
      if(item.firstName.concat(' ').concat(item.lastName).toLowerCase().includes(filterString.toLowerCase())){
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
