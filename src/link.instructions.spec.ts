import { LinkInstructions } from './link.instructions';
import { Links } from './links';

describe('Links Instructions', () => {

  let links: Links;

  beforeEach(() => {
    links
  });

  it('creates instructions', () => {
    let instructions = new LinkInstructions();

    expect(instructions).toBeDefined();
  })

});
