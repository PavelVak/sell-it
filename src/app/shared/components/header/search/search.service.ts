import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
  private subject = new Subject<any>();

  public sendQuery(queryString: string) {
    this.subject.next({ text: queryString });
  }

  public clearQuery() {
    this.subject.next();
  }

  public subscribeToQuery(): Observable<any> {
    return this.subject.asObservable();
  }
}
