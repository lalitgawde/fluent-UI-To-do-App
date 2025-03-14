import React, { useState } from "react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import styled from "./List/TodoList.module.css";
import { TeachingBubble } from "@fluentui/react/lib/TeachingBubble";
import { useBoolean, useId } from "@fluentui/react-hooks";
import InfoIcon from "@mui/icons-material/Info";

function TaskDiscription(props) {
  // const buttonId = useId("targetButton");
  const buttonId = useId("targetButton");
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);
  // const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <InfoIcon
        id={buttonId}
        aria-label="Info"
        size="small"
        iconName={teachingBubbleVisible ? "InfoSolid" : "Info"}
        className={styled.iconClass}
        disabled={props.task.discription === "" ? true : false}
        onClick={
          // setShowInfo((showInfo) => !showInfo);
          toggleTeachingBubbleVisible
        }
      />
      {teachingBubbleVisible && (
        <TeachingBubble
          target={`#${buttonId}`}
          onDismiss={() => {}}
          headline={props.task.name}
        >
          <span>
            Discription:<p>{props.task.discription}</p>
          </span>
        </TeachingBubble>
      )}
    </div>
  );
}

export default TaskDiscription;
