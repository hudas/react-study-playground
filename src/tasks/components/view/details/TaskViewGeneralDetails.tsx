import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import style from "./TaskViewGeneralDetails.module.scss";
import {TextField} from "@material-ui/core";
import React from "react";
import {Task} from "../TaskView";

export interface TaskViewGeneralDetailsProps {
  task: Task;
}

export function TaskViewGeneralDetails({task}: TaskViewGeneralDetailsProps) {
  return (
    <FormPanel title="Task">
      <div className={style["form-container"]}>

        <TextField
          label="Name"
          value={task.name}
          disabled
          className={style["name-field"]}
        />

        <TextField
          label="Description"
          value={task.description}
          rows={5}
          multiline
          disabled
          className={style["description-field"]}
        />

        <TextField
          label="Created by"
          value={task.createdBy}
          disabled
          className={style["created-by-field"]}
        />

        <TextField
          label="Created at"
          value={task.createdAt && task.createdAt.toISOString() || ''}
          disabled
          className={style["created-at-field"]}
        />
      </div>
    </FormPanel>
  );
}