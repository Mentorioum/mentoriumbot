import { Participant, ParticipantOutput } from './participant';

export interface TaskOutput {
  assignee: ParticipantOutput,
  description: string
}

export interface Task {
  assignee(): Participant
  description(): string,
  toJSON(): TaskOutput
}
