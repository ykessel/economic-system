import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Concept} from '../modelos/concept';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {


  constructor(private http: HttpClient) {  }

  ecoUrl = 'http://localhost:3000/ecoapi/concepts';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getConcepts() {
    return this.http.get<Concept[]>(this.ecoUrl);
  }

  addConcepto(concept: Concept) {
    return this.http.post(this.ecoUrl, concept, this.httpOptions);
  }

  searchConcepts(term: string): Observable<Concept[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Concept[]>(`${this.ecoUrl}/?title=${term}`).pipe(
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
  log(message: string) {
    console.log(`Mensaje: ${message}`);
  }
}
