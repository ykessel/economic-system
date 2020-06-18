import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Concept } from './concepts/concepts.component';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  private conceptsUrl = 'api/concepts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient,) { }

  getConcepts(): Observable<Concept[]> {
    return this.http.get<Concept[]>(this.conceptsUrl).pipe(
      tap(_ => this.log('fetched concepts')),
      catchError(this.handleError<Concept[]>('getConcepts', []))
    )
  }

  searchConcepts(term: string): Observable<Concept[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Concept[]>(`${this.conceptsUrl}/?title=${term}`).pipe(
      tap(_ => this.log(`found Concepts matching "${term}"`)),
      catchError(this.handleError<Concept[]>('searchConcepts', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`Mensaje: ${message}`)
  }
}
