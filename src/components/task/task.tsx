import React, { FC } from 'react';
import { Task } from '../../types/task';
import './task.scss';

export const TaskItem: FC<Task> = ({
  id,
  title,
  priority,
}) => {
  return (
    <div className={`task-wrapper priority-${priority}`}>
      <header className="task-header">TSK-{id}</header>
      <div className="task-body">
        <div className="task-title">{title}</div>
      </div>
    </div>
  );
};
