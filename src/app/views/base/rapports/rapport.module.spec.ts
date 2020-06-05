import { RapportModule } from './rapport.module';

describe('RapportModule', () => {
  let rapportModule: RapportModule;

  beforeEach(() => {
    rapportModule = new RapportModule();
  });

  it('should create an instance', () => {
    expect(rapportModule).toBeTruthy();
  });
});
