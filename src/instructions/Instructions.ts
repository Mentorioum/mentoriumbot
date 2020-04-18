import { Task } from '../task/task';

export interface Instructions {
  next(): Task
  hasNext(): boolean
}
