import { SourceInfoModule } from './sourceinfo.module';

describe('SourceInfoModule', () => {
  let sourceinfoModule: SourceInfoModule;

  beforeEach(() => {
    sourceinfoModule = new SourceInfoModule();
  });

  it('should create an instance', () => {
    expect(sourceinfoModule).toBeTruthy();
  });
});