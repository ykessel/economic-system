import { Component, OnInit } from '@angular/core';
import { ConceptService } from '../concept.service';
import { Concept } from '../model/Concept';


@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {
  
  concepts: Concept[]
  
  constructor(public conceptService: ConceptService) { }

  ngOnInit(): void {
    this.getConcepts()
  }

  getConcepts(): void {
    this.conceptService.getConcepts()
      .subscribe(concepts => this.concepts = concepts);
  }

}
