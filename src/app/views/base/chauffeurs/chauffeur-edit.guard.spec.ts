import { TestBed, async, inject } from '@angular/core/testing';

import { ChauffeurEditGuard } from './chauffeur-edit.guard';

describe('ChauffeurEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChauffeurEditGuard]
    });
  });

  it('should ...', inject([ChauffeurEditGuard], (guard: ChauffeurEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
