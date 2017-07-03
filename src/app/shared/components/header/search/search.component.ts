import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'sellit-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public queryString: string = '';

  constructor(private searchService: SearchService ) {}

  public sendQuery() {
    this.searchService.sendQuery(this.queryString);
  }
}
