import { TaskStatus } from "../../types/task";
import { mapTaskStatusToLabel } from "../map-task-status-to-label";

describe("mapTaskStatusToLabel function tests", () => {
  test.each([
    [TaskStatus.PLAN, 'Plan'],
    [TaskStatus.IN_PROGRESS, 'In Progress'],
    [TaskStatus.TESTING, 'Testing'],
    [TaskStatus.DONE, 'Done'],
  ])("TaskStatus.%s maps to '%s' label", (status: TaskStatus, label: string) => {
    expect(mapTaskStatusToLabel(status)).toBe(label);
  });

  test("Wrong status causes error", () => {
    // @ts-ignore
    expect(() => { mapTaskStatusToLabel(TaskStatus.NOT_EXISTING) }).toThrowError();
  })
});