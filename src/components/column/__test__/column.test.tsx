import React, { createContext } from 'react';
import { cleanup, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { TaskStatus } from "../../../types/task";
import { TaskStore } from "../../../mobx-store/task-store";
import { Column } from "../column";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Task } from '../../../types/task';

let container: Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  cleanup();
});

describe("Column tests", () => {
  test.each([
    ['Plan', TaskStatus.PLAN],
    ['In Progress', TaskStatus.IN_PROGRESS],
    ['Testing', TaskStatus.TESTING],
    ['Done', TaskStatus.DONE],
  ])("Column receives '%s' header if status is %s", (label, status) => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Column status={status} />
      </DndProvider>,
      { container }
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("Preloader is visible when tasks are not loaded yet", () => {
    const taskStore = new TaskStore({
      delayedLoad: true,
      initialTasks: [
        { id: 1, firstName: "fn1", lastName: "ln1", status: TaskStatus.IN_PROGRESS, title: '1', date: "2021-09-23" },
      ] as Task[],
    });
    const TaskContext = createContext(taskStore);

    render(
      <TaskContext.Provider value={taskStore}>
        <DndProvider backend={HTML5Backend}>
          <Column status={TaskStatus.IN_PROGRESS} />
        </DndProvider>
      </TaskContext.Provider>,
      { container }
    );

    expect(screen.getByLabelText("Tasks are loading...")).toBeInTheDocument();
  });

  // i won't have enough time to write d-n-d tests :[
});