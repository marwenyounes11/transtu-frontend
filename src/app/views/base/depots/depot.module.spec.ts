import { DepotModule } from './depot.module';

describe('DepotModule', () => {
  let depotModule: DepotModule;

  beforeEach(() => {
    depotModule = new DepotModule();
  });

  it('should create an instance', () => {
    expect(depotModule).toBeTruthy();
  });
});