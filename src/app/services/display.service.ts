import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService implements OnDestroy {
  private newShowSource = new Subject<boolean>();

  // Observable string streams
  newShow = this.newShowSource.asObservable();

constructor() { }
changeShowSignIns(show: boolean) {
      this.newShowSource.next(show);
  }

  ngOnDestroy(): void {
    this.newShowSource.next(false);
    this.newShowSource.complete();
  }
}
