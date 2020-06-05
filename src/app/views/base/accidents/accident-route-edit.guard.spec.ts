import { TestBed, async, inject } from '@angular/core/testing';

import { AccidentRouteeEditGuard } from './accident-route-edit.guard';

describe('AccidentRouteEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccidentRouteEditGuard]
    });
  });

  it('should ...', inject([AccidentRouteEditGuard], (guard: AccidentRouteEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
