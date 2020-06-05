import { VictimeModule } from './victime.module';

describe('VictimeModule', () => {
  let victimeModule: VictimeModule;

  beforeEach(() => {
    victimeModule = new VictimeModule();
  });

  it('should create an instance', () => {
    expect(victimeModule).toBeTruthy();
  });
});