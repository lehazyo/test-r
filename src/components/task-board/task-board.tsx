import React, { createContext } from 'react';
import { Columns } from '../columns/columns';
import { DetailsPanel } from '../details-panel/details-panel';
import { TaskStore } from '../../mobx-store/task-store';
import '../../common.scss';
import './task-board.scss';

const taskStoreTest = new TaskStore();
export const TaskContext = createContext(taskStoreTest);

export const TaskBoard = () => (
  <TaskContext.Provider value={taskStoreTest}>
    <section className="task-board-wrapper">
      <Columns />
      <DetailsPanel />
    </section>
  </TaskContext.Provider>
);
