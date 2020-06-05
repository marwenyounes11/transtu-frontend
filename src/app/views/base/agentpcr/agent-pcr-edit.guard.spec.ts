import { TestBed, async, inject } from '@angular/core/testing';

import { AgentPcrEditGuard } from './agent-pcr-edit.guard';

describe('AgentPcrEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentPcrEditGuard]
    });
  });

  it('should ...', inject([AgentPcrEditGuard], (guard: AgentPcrEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
