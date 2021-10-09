import { action, observable, runInAction } from 'mobx';
import { Task, TaskStatus } from '../types/task';
import { TaskPriority } from '../types/task';
import jsonTasks from '../mocks/tasks.json';

export interface TaskStoreParams {
  tasksLoaded: boolean;
  tasksByStatus: Map<TaskStatus, Task[]>;
  allTasks: Task[];
};

export const defaultTaskStoreData: TaskStoreParams = {
  tasksLoaded: false,
  tasksByStatus: new Map(),
  allTasks: [],
};

export const taskStoreData = observable({...defaultTaskStoreData});

const parseLocalStorageTasks = (): Task[] | false => {
  if (localStorage === undefined) {
    return false;
  }
  const tasksJson = localStorage.getItem("tasks");
  if (tasksJson === null) {
    return false;
  }
  const parsedTasks = JSON.parse(tasksJson);
  return parsedTasks.map((task: any) => {
    return task as Task;
  });
};

const loadTasks = action(() => {
  const localTasks = parseLocalStorageTasks();

  taskStoreData.allTasks = (!localTasks)
    ? jsonTasks.map((task: any) => {
      return task as Task;
    })
    : localTasks;

  // imitation of http request time gap
  setTimeout(() => {
    runInAction(() => {
      taskStoreData.tasksLoaded = true;
    });
  }, 500 + Math.random() * 2000);
});

export const getTasksByStatus = action((status: TaskStatus): Task[] => {
  if (taskStoreData.tasksByStatus.get(status) === undefined) {
    taskStoreData.tasksByStatus.set(status, taskStoreData.allTasks.filter((task) => {
      return task.status === status;
    }));
  }
  const returnResult = taskStoreData.tasksByStatus.get(status);
  return returnResult ?? [];
});

loadTasks();