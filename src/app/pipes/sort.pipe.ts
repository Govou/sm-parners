//  import { Pipe, PipeTransform } from "@angular/core";

// @Pipe({name:'sort'})
// export class SortPipe implements PipeTransform{
// transform(items:[],direction:string,column:string,type:string){
// let sortedItems=[];
// sortedItems=direction==='asc' ?
// this.sortAscending(items,column,type):
// this.sortDescending(items,column,type)
// return sortedItems;
// }
// sortAscending(items: any,column: string,type: string): any[]{
// return [items.sort(function(a:any,b:any){
// if(type==='string'){
// if (a[column].toUpperCase() < b[column].toUpperCase()) return -1;
// }
// else{
// return a[column]-b[column];
// }
// })]
// }
// sortDescending(items: any,column: string,type: string){
// return [...items.sort(function(a:any,b:any){
// if(type==='string'){
// if (a[column].toUpperCase() > b[column].toUpperCase()) return -1;
// }
// else{
// return b[column]-a[column];
// }
// })]
// }
// }


import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(value: any[], order:any = '', column: string = '', type: any): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') {
      console.log('sort')
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    if (!column || column === '') {
      if(type==='date'){
        value.sort((a: any, b: any) => {
          console.log('date sort')
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        });}
    }
    return orderBy(value, [column], [order]);
  }
}
