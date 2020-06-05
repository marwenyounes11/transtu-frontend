import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotDetailComponent } from './depot-detail.component';

describe('DepotDetailComponent', () => {
  let component: DepotDetailComponent;
  let fixture: ComponentFixture<DepotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
