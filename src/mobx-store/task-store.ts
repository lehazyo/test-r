import { action, computed, observable } from 'mobx';
import { Task, TaskStatus } from '../types/task';
import { taskPriorityArray } from '../utils/task-priority';

interface TaskStoreParams {
  allTasks: Task[];
  tasksLoading: boolean;
  selectedId: number | null;
  tasksByStatus: Map<TaskStatus, Task[]>;
}

interface TaskStoreOptions {
  delayedLoad: boolean;
  initialTasks: Task[] | null;
}

export class TaskStore {
  private privates = observable({
    allTasks: [],
    tasksLoading: false,
    selectedId: null,
    tasksByStatus: new Map(),
  } as TaskStoreParams);
  private delayedLoad: boolean = false;
  private initialTasks: Task[] | null = null;

  constructor(options: TaskStoreOptions) {
    this.delayedLoad = options.delayedLoad;
    this.initialTasks = options.initialTasks;
    this.loadTasks();
  }

  parseLocalStorageTasks(): Task[] | false {
    if (localStorage === undefined) {
      return false;
    }
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson === null || tasksJson === undefined) {
      return false;
    }
    const parsedTasks = JSON.parse(tasksJson);
    return parsedTasks.map((task: any) => {
      return task as Task;
    });
  };

  @action
  loadTasks(): void {
    this.privates.tasksLoading = true;

    const localTasks = this.parseLocalStorageTasks();

    if (localTasks) {
      this.privates.allTasks = localTasks;
    } else {
      this.privates.allTasks = (this.initialTasks !== null) 
        ? this.initialTasks
        : [];
    }
  
    if (this.delayedLoad) {
      // imitation of http request delay
      setTimeout(() => {
        this.privates.tasksLoading = false;
      }, 500 + Math.random() * 2000);
    } else {
      this.privates.tasksLoading = false;
    }
  }

  @action
  setSelectedId(id: number | null): void {
    this.privates.selectedId = id;
  }

  @computed
  getSelectedId(): number | null {
    return this.privates.selectedId;
  }

  @computed
  isIdSelected(id: number): boolean {
    return (id === this.getSelectedId());
  }

  sortTasks(arrayToSort: Task[]) {
    arrayToSort.sort((a, b) => {
      const aFullName = `${a.lastName} ${a.firstName}`;
      const bFullName = `${b.lastName} ${b.firstName}`;

      // first sort by Last name
      if (aFullName > bFullName) {
        return 1;
      }

      if (aFullName < bFullName) {
        return -1;
      }

      // if Last names are equal, sort by priority
      const aPriority = taskPriorityArray.indexOf(a.priority);
      const bPriority = taskPriorityArray.indexOf(b.priority);
      if (aPriority > bPriority) {
        return 1;
      }

      return (aPriority < bPriority) ? -1 : 0;
    });
  }

  @action
  getTasksByStatus(status: TaskStatus): Task[] {
    if (this.privates.tasksByStatus.get(status) === undefined) {
      const tasksByStatus = this.privates.allTasks.filter((task) => task.status === status);  
      this.sortTasks(tasksByStatus);
      this.privates.tasksByStatus.set(status, tasksByStatus);
    }
    const returnResult = this.privates.tasksByStatus.get(status);
    return returnResult ?? [];
  }

  isTasksLoading(): boolean {
    return this.privates.tasksLoading;
  }

  getSelectedTask(): Task | null {
    return this.privates.allTasks.find((task) => {
      return task.id === this.privates.selectedId;
    }) ?? null;
  }

  @action
  setStatus(id: number, status: TaskStatus): void {
    const taskById = this.privates.allTasks.find((task) => task.id === id);
    if (!taskById) {
      throw new Error('Task not found');
    }
    const oldStatus = taskById.status;
    taskById.status = status;

    const oldStatusTasks = this.getTasksByStatus(oldStatus);
    const taskToDeleteIndex = oldStatusTasks.findIndex((task) => task.id === id);
    oldStatusTasks.splice(taskToDeleteIndex, 1);
    this.privates.tasksByStatus.set(oldStatus, oldStatusTasks);

    const newStatusTasks = this.getTasksByStatus(status);
    newStatusTasks.push(taskById);
    this.sortTasks(newStatusTasks);
    this.privates.tasksByStatus.set(status, newStatusTasks);

    this.writeTasksToLocalStorage();
  }

  writeTasksToLocalStorage(): void {
    if (localStorage === undefined) {
      return;
    }
    const tasksJson = JSON.stringify(this.privates.allTasks);
    localStorage.setItem("tasks", tasksJson);
  }
}