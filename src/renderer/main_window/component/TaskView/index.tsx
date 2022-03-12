import React from "react";
import { TaskType } from "../../../../share/TaskType";
import { useAppSelector } from "../../store";
import { TasksSliceSelector } from "../../store/TasksSlice";
import TcpClientView from "./TcpClientView";

export default function TaskView() {
  const type = useAppSelector(TasksSliceSelector.selectedType);

  const id = useAppSelector(TasksSliceSelector.selectedID);
  switch (type) {
    case TaskType.TCP_CLIENT:
      return <TcpClientView id={id} />;

    case undefined:
    default:
      return <p>No selected</p>;
  }
}
