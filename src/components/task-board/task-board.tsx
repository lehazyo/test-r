import React from 'react';
import { Column } from '../column/column';
import { TaskPriority, TaskStatus } from '../../types/task';
import { nanoid } from 'nanoid';
import { defaultTaskStoreData, taskStoreData } from '../../mobx-store/task-store';
import '../../common.scss';
import './task-board.scss';

export const TaskBoard = () => {
  const columns = [
    TaskStatus.PLAN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TESTING,
    TaskStatus.DONE,
  ].map((status) => <Column key={nanoid()} status={status} />);

  const TaskContext = React.createContext(defaultTaskStoreData);

  return (
    <TaskContext.Provider value={taskStoreData}>
      <section className="task-board-wrapper">
        <div className="columns-wrapper">{columns}</div>
      </section>
    </TaskContext.Provider>
  );
};
