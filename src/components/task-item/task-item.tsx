import React, { FC, useContext, useEffect, useRef } from 'react';
import { Task } from '../../types/task';
import { TaskContext } from '../task-board/task-board';
import { TaskStore } from '../../mobx-store/task-store';
import { observer } from 'mobx-react';
import './task-item.scss';

export const TaskItem: FC<Task> = observer(({
  id,
  title,
  priority,
}) => {
  const taskStore: TaskStore = useContext(TaskContext);

  const taskItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (taskItemRef.current !== null) {
      taskItemRef.current.addEventListener("click", () =>
        taskStore.setSelectedId((taskStore.isIdSelected(id)) ? null : id));
    }
  }, []);

  const taskCssClasses = [
    'task-wrapper',
    `priority-${priority}`,
  ];

  if (taskStore.isIdSelected(id)) {
    taskCssClasses.push('task-wrapper--selected');
  }

  return (
    <div
      ref={taskItemRef}
      className={taskCssClasses.join(" ")}
    >
      <header className="task-header">TSK-{id}</header>
      <div className="task-body">
        <div className="task-title">{title}</div>
      </div>
    </div>
  );
});
