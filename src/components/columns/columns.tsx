import React from 'react';
import { Column } from '../column/column';
import { TaskStatus } from '../../types/task';
import { nanoid } from 'nanoid';
import './columns.scss';

export const Columns = () => (
  <div className="columns-wrapper">{[
    TaskStatus.PLAN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TESTING,
    TaskStatus.DONE,
  ].map((status) => <Column key={nanoid()} status={status} />)}</div>
);
