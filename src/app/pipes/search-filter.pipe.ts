import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const resultArray = []
    for (const item of value){
      let val = item[propName].toLowerCase()
      let formattedFilter = filterString.toLowerCase()
      if(val.includes(formattedFilter)){
        resultArray.push(item)
      }
    }
    return resultArray
  }

}
