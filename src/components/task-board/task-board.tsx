import React, { createContext, useEffect } from 'react';
import { Columns } from '../columns/columns';
import { DetailsPanel } from '../details-panel/details-panel';
import { TaskStore } from '../../mobx-store/task-store';
import '../../common.scss';
import './task-board.scss';

const taskStore = new TaskStore();
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
    <TaskContext.Provider value={taskStore}>
      <section className="task-board-wrapper">
        <Columns />
        <DetailsPanel />
      </section>
    </TaskContext.Provider>
  );
};