import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPcrDetailComponent } from './agent-pcr-detail.component';

describe('AgentPcrDetailComponent', () => {
  let component: AgentPcrDetailComponent;
  let fixture: ComponentFixture<AgentPcrDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPcrDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPcrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
