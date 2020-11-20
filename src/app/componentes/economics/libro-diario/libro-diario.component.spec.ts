import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LibroDiarioComponent} from './libro-diario.component';

describe('LibroDiarioComponent', () => {
  let component: LibroDiarioComponent;
  let fixture: ComponentFixture<LibroDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibroDiarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
