import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Concept} from '../../modelos/concept';
import {ConceptService} from '../../servicios/concept.service';

@Component({
  selector: 'app-search-concepts',
  templateUrl: './search-concepts.component.html',
  styleUrls: ['./search-concepts.component.scss']
})
export class SearchConceptsComponent implements OnInit {
  concepts: Observable<Concept[]>;
  private searchTerms = new Subject<string>();

  constructor(private conceptService: ConceptService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.concepts = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.conceptService.searchConcepts(term)),
    );
  }
}
