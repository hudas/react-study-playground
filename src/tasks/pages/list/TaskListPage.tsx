import React, {Component} from "react";
import {TaskList, TaskRow} from "../../components/list/TaskList";
import {getTaskList} from "../../services/TaskService";
import {TaskListDto} from "../../services/dto/TaskListDto";
import {taskListDtoToRow} from "../../services/TaskMappers";
import {getAllTasks} from "../../store/list/TaskListSelectors";
import {loadTaskListFactory} from "../../store/list/TaskListActions";
import { connect } from 'react-redux'

export interface TaskListPageState {
  rows: TaskRow[];
}

const INITIAL_STATE: TaskListPageState = {
  rows: []
};

class TaskListPage extends Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.props.load();
    this.loadTaskList();
  }

  render(): React.ReactNode {
    return <TaskList rows={this.state.rows}/>;
  }

  private loadTaskList() {
    getTaskList()
      .then((tasks: Partial<TaskListDto>[]) =>
        this.setState({
          rows: taskListDtoToRow(tasks) as TaskRow[]
        })
      );
  }
}


const mapStateToProps = (state: any) => ({
  tasks: getAllTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  load: () => dispatch(loadTaskListFactory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListPage);
