import React, { FC, useContext } from 'react';
import { TaskStatus } from '../../types/task';
import { TaskItem } from '../task-item/task-item';
import { TaskContext } from '../task-board/task-board';
import { TaskStore } from '../../mobx-store/task-store';
import { mapTaskStatusToLabel } from '../../utils/task-status-name';
import './column.scss';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';
import { useDrop } from 'react-dnd'
import { DndItemTypes } from '../../utils/dnd-item-types';

export interface ColumnProps {
  status: TaskStatus;
}

export const Column: FC<ColumnProps> = observer(({ status }) => {
  const [, dropRef] = useDrop(
    () => ({
      accept: DndItemTypes.TASK_ITEM,
      drop: () => ({ status })
    }), []
  );

  const taskStore: TaskStore = useContext(TaskContext);

  const taskListContent = (taskStore.isTasksLoading())
    ? <div className="column-preloader" />
    : taskStore.getTasksByStatus(status).map((task) => <TaskItem key={nanoid()} {...task} />);
  
  return (
    <div className="column-wrapper" ref={dropRef}>
      <header className="column-header">{mapTaskStatusToLabel(status)}</header>
      <div className="column-tasks-wrapper">{taskListContent}</div>
    </div>
  )
});
