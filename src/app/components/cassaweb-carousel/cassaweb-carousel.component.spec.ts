import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassawebCarouselComponent } from './cassaweb-carousel.component';

describe('CassawebCarouselComponent', () => {
  let component: CassawebCarouselComponent;
  let fixture: ComponentFixture<CassawebCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassawebCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassawebCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
