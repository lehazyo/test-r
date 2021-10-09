import { action, computed, observable } from 'mobx';
import { Task, TaskStatus } from '../types/task';
import { taskPriorityArray } from '../utils/task-priority';
import jsonTasks from '../mocks/tasks.json';

export interface TaskStoreParams {
  allTasks: Task[];
  tasksLoading: boolean;
  selectedId: number | null;
  tasksByStatus: Map<TaskStatus, Task[]>;
}

export class TaskStore {
  private privates = observable({
    allTasks: [],
    tasksLoading: false,
    selectedId: null,
    tasksByStatus: new Map(),
  } as TaskStoreParams);

  constructor() {
    this.loadTasks();
  }

  parseLocalStorageTasks(): Task[] | false {
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

  @action
  loadTasks(): void {
    this.privates.tasksLoading = true;

    const localTasks = this.parseLocalStorageTasks();
  
    this.privates.allTasks = (!localTasks)
      ? jsonTasks.map((task: any) => {
        return task as Task;
      })
      : localTasks;
  
    // imitation of http request time gap
    setTimeout(() => {
      this.privates.tasksLoading = false;
    }, 500 + Math.random() * 2000);
  }

  @action
  setSelectedId(id: number | null): void {
    console.log('id was set');
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

  @action
  getTasksByStatus(status: TaskStatus): Task[] {
    if (this.privates.tasksByStatus.get(status) === undefined) {
      const tasksByStatus = this.privates.allTasks.filter((task) => task.status === status);  
      tasksByStatus.sort((a, b) => {
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
}