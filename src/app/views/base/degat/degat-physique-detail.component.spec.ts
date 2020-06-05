import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegatPhysiqueDetailComponent } from './degat-physique-detail.component';

describe('DegatPhysiqueDetailComponent', () => {
  let component: DegatPhysiqueDetailComponent;
  let fixture: ComponentFixture<DegatPhysiqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegatPhysiqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegatPhysiqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
