import { TestBed, async, inject } from '@angular/core/testing';

import { ReceveurEditGuard } from './receveur-edit.guard';

describe('ReceveurEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceveurEditGuard]
    });
  });

  it('should ...', inject([ReceveurEditGuard], (guard: ReceveurEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
