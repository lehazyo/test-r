import React, { createContext } from 'react';
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Task } from '../../../types/task';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskPriority, TaskStatus } from "../../../types/task";
import { TaskItem } from "../task-item";
import { TaskStore } from '../../../mobx-store/task-store';
import userEvent from "@testing-library/user-event";

let container: Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  cleanup();
});

describe("TaskItem tests", () => {
  test("id and title get into DOM", () => { 
    render(
      <DndProvider backend={HTML5Backend}>
        <TaskItem {...mockTask} />
      </DndProvider>,
      { container }
    );

    expect(screen.getByText('Title for test task')).toBeInTheDocument();
    expect(screen.getByText('TSK-3')).toBeInTheDocument();
  });

  test("Upon click on task 'Details of TSK-XXXX are open' aria label is added, and on second click it disappears", () => {   
    const taskStore = new TaskStore({
      delayedLoad: true,
      initialTasks: [mockTask],
    });
    const TaskContext = createContext(taskStore);

    render(
      <TaskContext.Provider value={taskStore}>
        <DndProvider backend={HTML5Backend}>
          <TaskItem {...mockTask} />
        </DndProvider>
      </TaskContext.Provider>,
      { container }
    );

    expect(screen.queryByLabelText("Details of TSK-3 are open")).toBeNull();

    userEvent.click(screen.getByText('TSK-3'));

    expect(screen.getByLabelText("Details of TSK-3 are open")).toBeInTheDocument();

    userEvent.click(screen.getByText('TSK-3'));

    expect(screen.queryByLabelText("Details of TSK-3 are open")).toBeNull();
  });

  // i won't have enough time to write d-n-d tests :[
});

const mockTask = {
  id: 3,
  lastName: 'lastName',
  firstName: 'firstName',
  status: TaskStatus.IN_PROGRESS,
  priority: TaskPriority.MUST,
  date: "2021-09-23",
  title: 'Title for test task'
} as Task;