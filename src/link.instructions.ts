import { Instructions } from './Instructions';
import { Task } from './task';
import { Links } from './links';
import { ConstTask } from './const.task';
import { GithubUriParticipant } from './github.uri.participant';

export class LinkInstructions implements Instructions {
  private links: Links;
  private cursor: number;
  private done: boolean;

  constructor(links: Links) {
    this.links = links;
    this.cursor = 0;
    this.done = true;
  }

  hasNext(): boolean {
    return this.done;
  }

  next(): Task {


    // TODO: #42 - provide one by one task iteration
    const iterable = this.links.iterate(); // Relations.Recipient

    let first = iterable[0];
    let second = iterable[1];

    const assignee = new GithubUriParticipant(
      new URL(first.uri())
    );

    const description = `Please, read [${second.title()}](${second.uri()})`;


    return new ConstTask(assignee, description);
  }




}
