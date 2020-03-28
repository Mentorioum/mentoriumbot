import { Participant, ParticipantOutput } from './participant';

export interface TaskOutput {
  assignee: ParticipantOutput,
  description: string
}

export interface Task {
  title(): string
  assignee(): Participant
  description(): string
  toJSON(): TaskOutput
}
