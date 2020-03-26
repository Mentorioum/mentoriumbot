import { Instructions } from './Instructions';
import { Task } from './task';
import { NotYetImplementedException } from './not.yet.implemented.exception';

export class LinkInstructions implements Instructions {
  hasNext(): boolean {
    throw new NotYetImplementedException();
    return false;
  }

  next(): Task {
    throw new NotYetImplementedException();

    return undefined;
  }




}
