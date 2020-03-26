import { Participant } from './participant';

export interface Task {
  assignee(): Participant
  description(): string
}
