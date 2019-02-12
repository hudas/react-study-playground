import {TaskListActions, TaskListActionTypes} from "./TaskListActions";
import {Dispatch} from "redux";

export function taskListMiddleware(dispatch: any) {
  return function(next: Dispatch) {
    return function(action: TaskListActions) {
      // do your stuff
      if (action.type === TaskListActionTypes.LOAD) {
        console.log('Im acting on action !!!');
      }

      return next(action);
    };
  };
}