import { Task, TaskOutput } from './task';
import { Participant } from '../participant/participant';
import { NotYetImplementedException } from '../errors/not.yet.implemented.exception';

export class GithubTask implements Task {

  title(): string {
    throw new NotYetImplementedException();
    return '';
  }

  assignee(): Participant {
    throw new NotYetImplementedException();
    return undefined;
  }

  description(): string {
    throw new NotYetImplementedException();
    return '';
  }

  toJSON(): TaskOutput {
    throw new NotYetImplementedException();
    return undefined;
  }
}
