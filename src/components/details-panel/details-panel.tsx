import React, { useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { TaskContext } from '../task-board/task-board';
import { DetailsPanelHeader } from './details-panel-header';
import './details-panel.scss';

export const DetailsPanel = observer(() => {
  const taskStore = useContext(TaskContext);

  const selectedTask = taskStore.getSelectedTask();

  if (!selectedTask) {
    return null;
  }
  
  return (
    <div className="details-panel-wrapper">
      <DetailsPanelHeader selectedTask={selectedTask} />
      <div className="details-panel-body">
        I am a details panel
      </div>
    </div>
  );
});
