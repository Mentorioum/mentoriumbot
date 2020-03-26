import { Task } from './task';

export interface Instructions {
  next(): Task
  hasNext(): boolean
}
