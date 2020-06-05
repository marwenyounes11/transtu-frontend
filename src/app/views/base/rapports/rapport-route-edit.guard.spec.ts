import { TestBed, async, inject } from '@angular/core/testing';

import { RapportRouteEditGuard } from './rapport-route-edit.guard';

describe('RapportRouteEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapportRouteEditGuard]
    });
  });

  it('should ...', inject([RapportRouteEditGuard], (guard: RapportRouteEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
