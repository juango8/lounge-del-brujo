import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenceComponent } from './transference.component';

describe('TransferenceComponent', () => {
  let component: TransferenceComponent;
  let fixture: ComponentFixture<TransferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
