export type Task = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  status: TaskStatus;
  priority: TaskPriority;
  date: string;
};

export enum TaskStatus {
  PLAN = 'PLAN',
  IN_PROGRESS = 'IN_PROGRESS',
  TESTING = 'TESTING',
  DONE = 'DONE',
};

export enum TaskPriority {
  MUST = 'MUST',
  SHOULD = 'SHOULD',
  COULD = 'COULD',
};
