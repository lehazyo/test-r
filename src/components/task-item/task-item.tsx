import React, { FC, useContext, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd'
import { Task, TaskStatus } from '../../types/task';
import { TaskContext } from '../task-board/task-board';
import { TaskStore } from '../../mobx-store/task-store';
import { observer } from 'mobx-react';
import './task-item.scss';
import { DndItemTypes } from '../../utils/dnd-item-types';

interface DropResult {
  status: TaskStatus;
}

export const TaskItem: FC<Task> = observer(({
  id,
  title,
  priority,
}) => {
  const taskStore: TaskStore = useContext(TaskContext);

  // drag-n-drop
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DndItemTypes.TASK_ITEM,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (dropResult !== null) {
        taskStore.setStatus(id, dropResult.status);
      }
    }
  }));

  const taskItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (taskItemRef.current !== null) {
      taskItemRef.current.addEventListener("click", () =>
        taskStore.setSelectedId((taskStore.isIdSelected(id)) ? null : id));
    }
    // @ts-ignore react-hooks/exhaustive-deps
  }, []);

  const taskCssClasses = [
    'task-wrapper',
    `priority-${priority}`,
  ];

  if (isDragging) {
    taskCssClasses.push('task-wrapper--dragged');
  }

  if (taskStore.isIdSelected(id)) {
    taskCssClasses.push('task-wrapper--selected');
  }

  return (
    <div ref={dragRef} className="task-wrapper-dragger">
      <div
        ref={taskItemRef}
        className={taskCssClasses.join(" ")}
      >
        <header className="task-header">TSK-{id}</header>
        <div className="task-body">
          <div className="task-title">{title}</div>
        </div>
      </div>
    </div>
  );
});
