import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPointComponent } from './sales-point.component';

describe('SalesPointComponent', () => {
  let component: SalesPointComponent;
  let fixture: ComponentFixture<SalesPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
