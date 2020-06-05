import { EmplacementModule } from './emplacement.module';

describe('EmplacementModule', () => {
  let emplacementModule: EmplacementModule;

  beforeEach(() => {
    emplacementModule = new EmplacementModule();
  });

  it('should create an instance', () => {
    expect(emplacementModule).toBeTruthy();
  });
});