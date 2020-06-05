import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegatMaterielDetailComponent } from './degat-materiel-detail.component';

describe('DegatMaterielDetailComponent', () => {
  let component: DegatMaterielDetailComponent;
  let fixture: ComponentFixture<DegatMaterielDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegatMaterielDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegatMaterielDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
