import styled from "./TodoList.module.css";
import { Checkbox, Stack } from "@fluentui/react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import React, { useContext } from "react";
import { TaskContext } from "../../store/task-context";
import TaskDiscription from "../TaskDiscrption";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

function CompletedTask() {
  const ctx = useContext(TaskContext);
  const onClickHandler = (operation, id) => {
    if (operation === "delete") {
      if (window.confirm("Do you realy want to delete")) {
        ctx.deleteTask(id);
      }
    }
  };
  const onSelectChange = (id) => {
    ctx.completedTask(id);
  };
  return (
    <div>
      {ctx.tasks.filter((elem) => elem.isCompleted === true).length > 0 ? (
        ctx.tasks.map((task) => {
          return task.isCompleted === true ? (
            <Stack horizontal className={styled.taskItem} key={task.id}>
              <Stack horizontal style={{ width: "90%" }}>
                <Checkbox
                  label=""
                  // disabled={true}
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
                  // width: "10%",
                  width: "50%",
                  paddingRight: "10px",
                  justifyContent: "end",
                }}
              >
                <TaskDiscription task={task} />
                <DeleteIcon
                  fontSize="medium"
                  className={styled.iconClass}
                  onClick={() => {
                    onClickHandler("delete", task.id);
                  }}
                />
                {task.isFav ? (
                  <StarIcon fontSize="medium" className={styled.iconClass} />
                ) : (
                  <StarIcon fontSize="medium" className={styled.iconClass} />
                )}
              </Stack>
            </Stack>
          ) : null;
        })
      ) : (
        <p style={{ textAlign: "center" }}>No Completed Tasks Found.</p>
      )}
    </div>
  );
}

export default CompletedTask;
