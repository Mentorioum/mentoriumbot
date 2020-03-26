import { Task } from './task';
import { Participant } from './participant';
import { NotYetImplementedException } from './not.yet.implemented.exception';

export class GithubTask implements Task {
  assignee(): Participant {
    throw new NotYetImplementedException();
    return undefined;
  }

  description(): string {
    throw new NotYetImplementedException();
    return '';
  }



}
