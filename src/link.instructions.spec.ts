import { LinkInstructions } from './link.instructions';
import { Links } from './links';
import { ConstLinks } from './const.links';
import { ConstLink } from './const.link';
import { Link } from './link';
import { ConstTask } from './const.task';
import { ConstParticipant } from './const.participant';
import { ProviderEnum } from './provider.enum';

describe('Links Instructions', () => {

  let links: Links, first: Link, second: Link, third: Link, fourth: Link;

  beforeEach(() => {
    first = new ConstLink(
      'https://github/bazzika',
      'Trainee',
      'recipient',
    );
    second = new ConstLink(
      'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
      'Chapter 1: What Is JavaScript?',
    );
    third = new ConstLink(
      'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md',
      'Chapter 2: Surveying JS',
    );
    fourth = new ConstLink(
      'https://github/nesterone',
      'Interview Checkpoint',
      'verify',
    );

    links = new ConstLinks([first, second, third, fourth]);
  });

  it('creates instructions', () => {
    let instructions = new LinkInstructions(links);

    expect(instructions).toBeDefined();
  });

  it('get first task', () => {
    let instructions = new LinkInstructions(links);
    let expected = new ConstTask(
      new ConstParticipant(
        'bazzika',
        ProviderEnum.GITHUB
      ),
      `Please, read [${second.title()}](${second.uri()})`
    );

    expect(instructions.hasNext()).toBeTruthy();
    expect(instructions.next().toJSON()).toEqual(expected.toJSON());
  });

});
