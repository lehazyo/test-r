import React, { FC, useContext, useEffect, useRef } from 'react';
import { Task } from '../../types/task';
import { TaskContext } from '../task-board/task-board';
import { observer } from 'mobx-react';
import './details-panel-header.scss';

export interface DetailsPanelHeaderProps {
  selectedTask: Task;
}

export const DetailsPanelHeader: FC<DetailsPanelHeaderProps> = observer(({ selectedTask }) => {
  const taskStore = useContext(TaskContext);

  const closerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (closerRef.current !== null) {
      closerRef.current.addEventListener("click", () => {
        taskStore.setSelectedId(null);
      });
    }
  }, []);

  return (
    <header className={`details-panel-header priority-${selectedTask.priority}`}>
      <span className="details-panel-id">TSK-{selectedTask.id}</span>
      <span className="details-panel-title">{selectedTask.title}</span>

      <button
        className="details-panel-closer"
        aria-label="Close task details panel"
        ref={closerRef}
      >🗙</button>
    </header>
  );
});
