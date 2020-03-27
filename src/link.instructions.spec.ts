import { LinkInstructions } from './link.instructions';
import { Links } from './links';
import { ConstLinks } from './const.links';
import { ConstLink } from './const.link';
import { Link } from './link';
import { ConstTask } from './const.task';
import { ConstParticipant } from './const.participant';
import { ProviderEnum } from './provider.enum';
import { RelationEnum } from './relation.enum';

describe('Links Instructions', () => {
  let links: Links, first: Link, second: Link, third: Link, fourth: Link;

  beforeEach(() => {
    first = new ConstLink(
      'https://github/bazzika',
      'Trainee',
      RelationEnum.RECIPIENT,
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
      RelationEnum.VERIFICATION,
    );

    links = new ConstLinks([first, second, third, fourth]);
  });

  it('creates instructions', () => {
    let instructions = new LinkInstructions(links);

    expect(instructions).toBeDefined();
  });

  it('get all tasks one by one tasks', () => {
    let instructions = new LinkInstructions(links);
    let participant = new ConstParticipant(
      'bazzika',
      ProviderEnum.GITHUB
    );

    let next = new ConstTask(
       participant,
      `Please, read [${second.title()}](${second.uri()})`
    );

    expect(instructions.hasNext()).toBeTruthy();
    expect(instructions.next().toJSON()).toEqual(next.toJSON());

    next = new ConstTask(
      participant,
      `Please, read [${third.title()}](${third.uri()})`
    );

    expect(instructions.hasNext()).toBeTruthy();
    expect(instructions.next().toJSON()).toEqual(next.toJSON());

    participant = new ConstParticipant(
      'nesterone',
      ProviderEnum.GITHUB
    );

    next = new ConstTask(
      participant,
      `Please, read [${fourth.title()}](${fourth.uri()})`
    );

    expect(instructions.hasNext()).toBeTruthy();
    expect(instructions.next().toJSON()).toEqual(next.toJSON());

    expect(instructions.hasNext()).toBeFalsy();
  });

});
