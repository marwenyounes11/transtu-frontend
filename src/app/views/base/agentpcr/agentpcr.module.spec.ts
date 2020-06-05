import { AgentPcrModule } from './agentpcr.module';

describe('AgentPcrModule', () => {
  let agentpcrModule: AgentPcrModule;

  beforeEach(() => {
    agentpcrModule = new AgentPcrModule();
  });

  it('should create an instance', () => {
    expect(agentpcrModule).toBeTruthy();
  });
});