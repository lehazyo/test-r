import React, { FC } from 'react';
import { TaskStatus } from '../../types/task';
import { TaskItem } from '../task/task';
import { taskStoreData, getTasksByStatus } from '../../mobx-store/task-store';
import './column.scss';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';

export interface ColumnProps {
  status: TaskStatus;
}

export const Column: FC<ColumnProps> = observer(({ status }) => {
  const tasks = getTasksByStatus(status);

  const statusLowerCase = status.toLowerCase();
  const statusNormalCase = status.substring(0, 1) + statusLowerCase.substring(1);

  const tasksList = tasks.map((task) => <TaskItem key={nanoid()} {...task} />);

  const columnCssClasses = ['column-wrapper'];

  if (!taskStoreData.tasksLoaded) {
    columnCssClasses.push('column-wrapper-loading');
  }
  
  return (
    <div className={columnCssClasses.join(' ')}>
      <header className="column-header">{statusNormalCase}</header>
      <div className="column-tasks-wrapper">{tasksList}</div>
    </div>
  )
});
