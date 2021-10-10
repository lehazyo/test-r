import { localStorageMock } from '../__test__/utils/local-storage-mock';
import { TaskPriority, TaskStatus } from '../types/task';
import '../__test__/utils/local-storage-mock';
import { TaskStore } from './task-store';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  localStorage.removeItem("tasks");
  cleanup();
})

describe("TaskStore tests", () => {

  test("Store reads values from mocks/tasks.json properly", () => {
    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: mockJsonTasks,
    });

    [
      TaskStatus.PLAN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.TESTING,
      TaskStatus.DONE
    ].forEach((status, index) => {
      expect(taskStore.getTasksByStatus(status)).toStrictEqual([mockJsonTasks[index]]);
    });
  });

  test("Store reads values from localStorage if they are present", () => {
    const originalLocalStorage = global.localStorage;

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    localStorage.setItem("tasks", JSON.stringify(mockLocalStorageTasks));

    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: [],
    });

    [
      TaskStatus.PLAN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.TESTING,
      TaskStatus.DONE
    ].forEach((status, index) => {
      expect(taskStore.getTasksByStatus(status)).toStrictEqual([mockLocalStorageTasks[index]]);
    });

    localStorage.removeItem("tasks");

    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
  });

  test("Selected task id is set and read", () => {
    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: mockJsonTasks,
    });

    taskStore.setSelectedId(3);
    expect(taskStore.isIdSelected(3)).toBeTruthy();

    taskStore.setSelectedId(2);
    expect(taskStore.isIdSelected(2)).toBeTruthy();

    taskStore.setSelectedId(null);
    expect(taskStore.getSelectedId()).toBeNull();
  });

  test("Tasks are properly sorted", () => {
    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: unsortedPlanTasks,
    });

    expect(taskStore.getTasksByStatus(TaskStatus.PLAN)).toStrictEqual(sortedPlanTasks);
  });

  test("After setting new status for a task columns' list of tasks changes", () => {
    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: mockJsonTasks,
    });

    expect(taskStore.getTasksByStatus(TaskStatus.IN_PROGRESS).length).toBe(1);
    expect(taskStore.getTasksByStatus(TaskStatus.TESTING).length).toBe(1);

    taskStore.setStatus(3, TaskStatus.IN_PROGRESS);

    expect(taskStore.getTasksByStatus(TaskStatus.IN_PROGRESS).length).toBe(2);
    expect(taskStore.getTasksByStatus(TaskStatus.TESTING).length).toBe(0);
  });


  test("After setting new status for a task localStorage is written", () => {
    const taskStore = new TaskStore({
      delayedLoad: false,
      initialTasks: mockJsonTasks,
    });

    expect(localStorage.getItem("tasks")).toBeFalsy();

    // moving task to another status writes localStorage
    taskStore.setStatus(3, TaskStatus.IN_PROGRESS);

    expect(localStorage.getItem("tasks")).toBeTruthy();

    // moving previously moved task back makes localStorage equal to the original array
    taskStore.setStatus(3, TaskStatus.TESTING);

    expect(JSON.parse(localStorage.getItem("tasks"))).toStrictEqual(mockJsonTasks);
  });
});


const mockLocalStorageTasks = [
  {
    id: 1,
    status: TaskStatus.PLAN,
    firstName: "fn1",
    lastName: "ln1",
    priority: TaskPriority.MUST,
    date: "2021-01-01"
  },
  {
    id: 2,
    status: TaskStatus.IN_PROGRESS,
    firstName: "fn2",
    lastName: "ln2",
    priority: TaskPriority.SHOULD,
    date: "2021-01-02"
  },
  {
    id: 3,
    status: TaskStatus.TESTING,
    firstName: "fn3",
    lastName: "ln3",
    priority: TaskPriority.COULD,
    date: "2021-01-03"
  },
  {
    id: 4,
    status: TaskStatus.DONE,
    firstName: "fn4",
    lastName: "ln4",
    priority: TaskPriority.MUST,
    date: "2021-01-04"
  }
];


const mockJsonTasks = [
  {
    id: 1,
    status: TaskStatus.PLAN,
    firstName: "json-fn1",
    lastName: "json-ln1",
    priority: TaskPriority.MUST,
    date: "2021-01-01"
  },
  {
    id: 2,
    status: TaskStatus.IN_PROGRESS,
    firstName: "json-fn2",
    lastName: "json-ln2",
    priority: TaskPriority.SHOULD,
    date: "2021-01-02"
  },
  {
    id: 3,
    status: TaskStatus.TESTING,
    firstName: "json-fn3",
    lastName: "json-ln3",
    priority: TaskPriority.COULD,
    date: "2021-01-03"
  },
  {
    id: 4,
    status: TaskStatus.DONE,
    firstName: "json-fn4",
    lastName: "json-ln4",
    priority: TaskPriority.MUST,
    date: "2021-01-04"
  }
];

const sortedPlanTasks = [
  {
    date: "2021-01-01",
    firstName: "sort-fn1",
    id: 551,
    lastName: "sort-ln1",
    priority: TaskPriority.MUST,
    status: TaskStatus.PLAN,
  },
  {
    id: 552,
    status: TaskStatus.PLAN,
    firstName: "sort-fn1",
    lastName: "sort-ln1",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
  {
    id: 553,
    status: TaskStatus.PLAN,
    firstName: "sort-fn1",
    lastName: "sort-ln1",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
  {
    id: 554,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.MUST,
    date: "2021-01-01",
  },
  {
    id: 555,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
  {
    id: 556,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
  {
    id: 557,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.MUST,
    date: "2021-01-01",
  },
  {
    id: 558,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
  {
    id: 559,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
];

const unsortedPlanTasks = [
  {
    id: 551,
    status: TaskStatus.PLAN,
    firstName: "sort-fn1",
    lastName: "sort-ln1",
    priority: TaskPriority.MUST,
    date: "2021-01-01",
  },
  {
    id: 554,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.MUST,
    date: "2021-01-01",
  },
  {
    id: 553,
    status: TaskStatus.PLAN,
    firstName: "sort-fn1",
    lastName: "sort-ln1",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
  {
    id: 557,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.MUST,
    date: "2021-01-01",
  },
  {
    id: 556,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
  {
    id: 559,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.COULD,
    date: "2021-01-01",
  },
  {
    id: 558,
    status: TaskStatus.PLAN,
    firstName: "sort-fn3",
    lastName: "sort-ln3",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
  {
    id: 555,
    status: TaskStatus.PLAN,
    firstName: "sort-fn2",
    lastName: "sort-ln2",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
  {
    id: 552,
    status: TaskStatus.PLAN,
    firstName: "sort-fn1",
    lastName: "sort-ln1",
    priority: TaskPriority.SHOULD,
    date: "2021-01-01",
  },
];