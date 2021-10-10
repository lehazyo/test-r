import React, { createContext, useEffect } from 'react';
import { Columns } from '../columns/columns';
import { DetailsPanel } from '../details-panel/details-panel';
import { TaskStore } from '../../mobx-store/task-store';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Task } from '../../types/task';
import jsonTasks from '../../mocks/tasks.json';
import '../../common.scss';
import './task-board.scss';

const taskStore = new TaskStore({
  delayedLoad: true,
  initialTasks: (jsonTasks as Task[]),
});
export const TaskContext = createContext(taskStore);

export const TaskBoard = () => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        taskStore.setSelectedId(null);
      }
    })
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <TaskContext.Provider value={taskStore}>
        <section className="task-board-wrapper">
          <Columns />
          <DetailsPanel />
        </section>
      </TaskContext.Provider>
    </DndProvider>
  );
};