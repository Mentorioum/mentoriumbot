import { Task, TaskOutput } from './task';
import { Participant } from './participant';

export class ConstTask implements Task {
  private readonly _assignee: Participant;
  private readonly _description: string;
  private readonly _title: string;

  constructor(assignee: Participant, description: string, title: string) {
    this._assignee = assignee;
    this._description  = description;
    this._title = title;
  }

  title(): string {
    return this._title;
  }

  assignee(): Participant {
    return this._assignee;
  }

  description(): string {
    return this._description;
  }

  toJSON(): TaskOutput {
    return {
      assignee: this.assignee().toJSON(),
      description: this.description()
    };
  }
}
