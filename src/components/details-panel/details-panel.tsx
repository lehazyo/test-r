import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { TaskContext } from '../task-board/task-board';
import { DetailsPanelHeader } from './details-panel-header';
import './details-panel.scss';
import { mapTaskStatusToLabel } from '../../utils/map-task-status-to-label';

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
        <div className="details-panel-assignee">
          Assignee: {selectedTask.lastName}, {selectedTask.firstName}
        </div>
        <div className="details-panel-assignee">
          Date created: {selectedTask.date}
        </div>
        <div className="details-panel-status">
          Status: {mapTaskStatusToLabel(selectedTask.status)}
        </div>
      </div>
    </div>
  );
});
