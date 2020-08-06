import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollableComponent } from './infinite-scrollable.component';

describe('InfiniteScrollableComponent', () => {
  let component: InfiniteScrollableComponent;
  let fixture: ComponentFixture<InfiniteScrollableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
