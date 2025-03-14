import styled from "./TodoList.module.css";
import { Checkbox, Stack } from "@fluentui/react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import React, { useContext } from "react";
import { TaskContext } from "../../store/task-context";
import TaskDiscription from "../TaskDiscrption";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

function TodoList(props) {
  const ctx = useContext(TaskContext);
  const taskList = useContext(TaskContext).tasks;
  // const [editId, setEditId] = useState("");
  console.log(taskList, "taskList");
  const onSelectChange = (id) => {
    ctx.completedTask(id);
  };
  const onClickHandler = (operation, id) => {
    if (operation === "fav") {
      ctx.favTask(id);
    } else if (operation === "delete") {
      if (window.confirm("Do you realy want to delete")) {
        ctx.deleteTask(id);
      }
    } else if (operation === "edit") {
      props.onEditChange(id);
    }
  };
  return (
    <div>
      {taskList.filter((elem) => !elem.isCompleted).length > 0 ? (
        taskList.map((task) => {
          return !task.isCompleted ? (
            <Stack horizontal className={styled.taskItem} key={task.id}>
              <Stack horizontal style={{ width: "85%" }}>
                <Checkbox
                  label=""
                  checked={task.isCompleted}
                  onChange={() => {
                    onSelectChange(task.id);
                  }}
                />
                {task.name}
              </Stack>
              <Stack
                horizontal
                style={{
                  width: "50%",
                  paddingRight: "10px",
                  justifyContent: "end",
                }}
              >
                <TaskDiscription task={task} />
                <EditCalendarIcon
                  className={styled.iconClass}
                  fontSize="medium"
                  onClick={() => {
                    onClickHandler("edit", task.id);
                  }}
                />
                <DeleteIcon
                  fontSize="medium"
                  className={styled.iconClass}
                  onClick={() => {
                    onClickHandler("delete", task.id);
                  }}
                />
                {task.isFav ? (
                  <StarIcon
                    fontSize="medium"
                    className={styled.iconClass}
                    onClick={() => {
                      onClickHandler("fav", task.id);
                    }}
                  />
                ) : (
                  <StarBorderOutlinedIcon
                    fontSize="medium"
                    className={styled.iconClass}
                    onClick={() => {
                      onClickHandler("fav", task.id);
                    }}
                  />
                )}
              </Stack>
            </Stack>
          ) : null;
        })
      ) : (
        <p style={{ textAlign: "center" }}>No Tasks Found.</p>
      )}
    </div>
  );
}

export default TodoList;
