import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceveurDetailComponent } from './receveur-detail.component';

describe('ReceveurDetailComponent', () => {
  let component: ReceveurDetailComponent;
  let fixture: ComponentFixture<ReceveurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceveurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceveurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
