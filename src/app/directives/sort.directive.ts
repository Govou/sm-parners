import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({selector: '[appSortParams]'})
export class SortParamsDirective {
@Output() param:EventEmitter<any>=new EventEmitter();
constructor(private element:ElementRef) { }
@HostListener('click') onClickIcon(){
this.selectSort(this.element.nativeElement.id)
}
selectSort(id: any){
switch(id){
case 'nameAsc':
this.param.emit({dir:'asc',col:'first',typ:'string'})
break;
case 'plateNumberAsc':
this.param.emit({dir:'asc',col:'last',typ:'string'})
break;
case 'dateAsc':
this.param.emit({dir:'asc',col:'age',typ:'number'})
break;
case 'nameDesc':
this.param.emit({dir:'desc',col:'first',typ:'string'})
break;
case 'plateNumberDesc':
this.param.emit({dir:'desc',col:'age',typ:'number'})
break;
case 'dateDesc':
this.param.emit({dir:'desc',col:'email',typ:'string'})
break;
}}}
