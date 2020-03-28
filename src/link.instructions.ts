import { Instructions } from './Instructions';
import { Task } from './task';
import { Links } from './links';
import { ConstTask } from './const.task';
import { GithubUriParticipant } from './github.uri.participant';
import { RelationEnum } from './relation.enum';
import { Participant } from './participant';
import * as assert from 'assert';

export class LinkInstructions implements Instructions {
  private links: Links;
  private cursor: number;
  private done: boolean;
  private recipient: Participant | null;

  constructor(links: Links) {
    this.links = links;
    this.cursor = -1;
    this.done = false;
  }

  hasNext(): boolean {
    return !this.done;
  }

  next(): Task {
    this.cursor = this.cursor + 1;

    if (!this.hasNext()){
      throw new Error('No Instructions Left');
    }

    const iterables = this.links.iterate();
    let link = iterables[this.cursor];

    if (this.cursor >= iterables.length - 1) {
      this.done = true;
    }

    /**
     * @todo #42:50m/DEV Extend links iterate with search args
     *  we need ability to search by relation through links
     *
     */

    if (link.relation() === RelationEnum.RECIPIENT) {
      this.recipient = new GithubUriParticipant(
        new URL(link.uri())
      );

      return this.next();
    }

    /**
     * @todo #42:30m/DEV Introduce MarkdownDescriptionPrinters
     *   a lot of places where generation of description is duplicated
     *
     */

    let description = `Please, read [${link.title()}](${link.uri()})`;
    let title = `Read: ${link.title()}`;

    if (link.relation() === RelationEnum.VERIFICATION){
      description = `Please, check that @${this.recipient.login()} done assigned tasks`;
      title = `Verification: ${link.title()}`;

      this.recipient = new GithubUriParticipant(
        new URL(link.uri())
      );
    }

    assert.ok(this.recipient, 'should find recipient first');

    return new ConstTask(this.recipient, description, title);
  }

}
