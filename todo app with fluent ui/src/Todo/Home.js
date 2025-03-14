import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Label, Pivot, PivotItem, Stack } from "@fluentui/react";
import { PivotKeys } from "./Type.ts";
import style from "./Home.module.css";
import TodoList from "./List/TodoList";
import TaskForm from "./TaskForm/TaskForm";
import CompletedTask from "./List/CompletedTask";

function Home() {
  const [selectedKey, setSelectedKey] = React.useState(PivotKeys.Task);
  // const onButtonClick = () => {
  //   setSelectedKey((selectedKey + 1) % 3);
  // };
  let [id, setId] = useState("");
  const onChangeItem = (item, event) => {
    setId("");
    setSelectedKey(item.props.itemKey);
  };
  const setEditTask = (eid) => {
    setId(eid);
    setSelectedKey(PivotKeys.TaskForm);
  };
  return (
    <Stack className={style.todoContainer}>
      <header className={style.header}>
        <h2>Todo List App</h2>
      </header>
      <Stack>
        <Pivot
          styles={{ root: style.pivot }}
          // aria-label="Override Selected Item Pivot Example"
          selectedKey={String(selectedKey)}
          onLinkClick={onChangeItem}
        >
          <PivotItem headerText={PivotKeys.Task} itemKey={PivotKeys.Task}>
            <TodoList onEditChange={setEditTask} />
          </PivotItem>
          <PivotItem
            headerText={PivotKeys.TaskForm}
            itemKey={PivotKeys.TaskForm}
          >
            <TaskForm
              editId={id}
              onChangeId={setId}
              onPageChange={(key) => {
                setSelectedKey(key);
              }}
            />
          </PivotItem>
          <PivotItem
            headerText={PivotKeys.Completed}
            itemKey={PivotKeys.Completed}
          >
            <CompletedTask />
          </PivotItem>
        </Pivot>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        {/* <DefaultButton onClick={onButtonClick}>Select next item</DefaultButton> */}
      </Stack>
    </Stack>
  );
}

export default Home;
