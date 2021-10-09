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

  console.log(1);
  const closerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log(2);
    if (closerRef.current !== null) {
      console.log(3);
      closerRef.current.addEventListener("click", () => {
        console.log(4);
        taskStore.setSelectedId(null);
      });
    }
  }, []);

  return (
    <header className="details-panel-header">
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
