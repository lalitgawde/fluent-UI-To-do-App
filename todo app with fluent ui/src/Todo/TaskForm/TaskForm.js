import { MessageBar, Stack, TextField } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { MessageBarType } from "@fluentui/react";
import { TaskContext } from "../../store/task-context";
import React, { useState, useContext, useEffect } from "react";
import { PivotKeys } from "../Type.ts";

function TaskForm(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const taskList = useContext(TaskContext).tasks;
  const [discription, setDiscription] = useState("");
  const ctx = useContext(TaskContext);

  useEffect(() => {
    if (props.editId) {
      setTitle(taskList.filter((t) => t.id === props.editId)[0].name);
      setDiscription(
        taskList.filter((t) => t.id === props.editId)[0].discription
      );
    }
  }, [props.editId]);

  useEffect(() => {
    if (showAlert === true) {
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  }, [showAlert]);
  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };
  const discriptionChangeHandler = (event) => {
    setDiscription(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const task = {
      id: Math.random(),
      name: props.editId ? event.target[0].value : title,
      isFav: false,
      discription: discription,
    };
    setShowAlert(true);
    setDiscription("");
    setTitle("");
    if (!props.editId) {
      ctx.addTask(task);
    } else {
      ctx.updateTask(props.editId, task);
      props.onChangeId("");
      props.onPageChange(PivotKeys.Task);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Stack style={{ margin: "30px" }}>
        {showAlert && (
          <Stack style={{ width: "50%" }}>
            <MessageBar
              dismissButtonAriaLabel="Close"
              onClose={() => {}}
              messageBarType={MessageBarType.success}
            >
              Task {props.editId ? "Updated" : "Added"} SuccessFully
            </MessageBar>
          </Stack>
        )}
        <TextField
          label="Task"
          value={
            // editId
            //   ? taskList.filter((t) => t.id === props.editId)[0].name
            //   : title
            title
          }
          onChange={titleChangeHandler}
          required
        />
        <TextField
          label="Discription"
          value={
            // editId
            //   ? taskList.filter((t) => t.id === props.editId)[0].discription
            //   : discription
            discription
          }
          onChange={discriptionChangeHandler}
          multiline
          rows={5}
        />
        <Stack horizontal style={{ marginLeft: "40%", marginTop: "20px" }}>
          <PrimaryButton
            text={props.editId ? "Update" : "Submit"}
            type="submit"
          />
        </Stack>
      </Stack>
    </form>
  );
}

export default TaskForm;
