import React, { createContext } from 'react';
import { Column } from '../column/column';
import { TaskStatus } from '../../types/task';
import { nanoid } from 'nanoid';
import '../../common.scss';
import './task-board.scss';
import { TaskStore } from '../../mobx-store/task-store';

const taskStoreTest = new TaskStore();
export const TaskContext = createContext(taskStoreTest);

export const TaskBoard = () => {
  const columns = [
    TaskStatus.PLAN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TESTING,
    TaskStatus.DONE,
  ].map((status) => <Column key={nanoid()} status={status} />);

  return (
    <TaskContext.Provider value={taskStoreTest}>
      <section className="task-board-wrapper">
        <div className="columns-wrapper">{columns}</div>
      </section>
    </TaskContext.Provider>
  );
};
