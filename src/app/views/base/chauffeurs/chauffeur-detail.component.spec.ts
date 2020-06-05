import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurDetailComponent } from './chauffeur-detail.component';

describe('ChauffeurDetailComponent', () => {
  let component: ChauffeurDetailComponent;
  let fixture: ComponentFixture<ChauffeurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
