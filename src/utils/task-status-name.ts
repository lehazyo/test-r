import { TaskStatus } from "../types/task";

export const mapTaskStatusToLabel = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.DONE:
      return 'Done';
    case TaskStatus.IN_PROGRESS:
      return 'In Progress';
    case TaskStatus.PLAN:
      return 'Plan';
    case TaskStatus.TESTING:
      return 'Testing';
    default:
      throw new Error('Unknown TaskStatus used');
  }
};
