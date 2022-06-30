import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private newShowSource = new Subject<boolean>();

  // Observable string streams
  newShow = this.newShowSource.asObservable();

constructor() { }
changeShowSignIns(show: boolean) {
      this.newShowSource.next(show);
  }
}
