import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
  private subject = new Subject<any>();

  sendQuery(queryString: string) {
    this.subject.next({ text: queryString });
  }

  clearQuery() {
    this.subject.next();
  }

  subscribeToQuery(): Observable<any> {
    return this.subject.asObservable();
  }
}
