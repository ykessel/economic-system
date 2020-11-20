import {Component, OnInit} from '@angular/core';
import {Concept} from '../../modelos/Concept';
import {ConceptService} from '../../servicios/concept.service';


@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  concepts: Concept[];
  loading = true;
  total: number;

  constructor(private conceptService: ConceptService) {  }

  ngOnInit() {
    this.getConcepts();
  }

  getConcepts(){
    this.conceptService.getConcepts()
      .subscribe(concepts => {
        this.concepts = concepts;
        this.loading = false;
        this.total = concepts.length;
      });
  }

}
