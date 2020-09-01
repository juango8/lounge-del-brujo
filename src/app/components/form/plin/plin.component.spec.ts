import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlinComponent } from './plin.component';

describe('PlinComponent', () => {
  let component: PlinComponent;
  let fixture: ComponentFixture<PlinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
