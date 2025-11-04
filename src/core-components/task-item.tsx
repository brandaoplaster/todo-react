import React from "react";
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";

import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import InputText from "../components/input-text";
import { TaskState, type Task } from "../types/task";
import { cx } from "class-variance-authority";
import useTasks from "../hooks/use-tasks";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [taskTitle, setTaskTitle] = React.useState(task?.title || "");
  const { updateTask, updateTaskStatus, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = React.useState(
    task?.state === TaskState.Creating
  );

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleExitEditTask() {
    if (task?.state === TaskState.Creating) {
      deleteTask(task.id);
    }
    setIsEditing(false);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || "");
  }

  function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateTask(task.id, { title: taskTitle });
    setIsEditing(false);
  }

  function handleChangeStatus(e: React.ChangeEvent<HTMLInputElement>) {
    const concluded = e.target.checked;
    updateTaskStatus(task.id, concluded);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task.concluded}
            onChange={handleChangeStatus}
          />
          <Text className={cx("flex-1", { "line-through": task?.concluded })}>
            {task?.title}
          </Text>
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              variant="tertiary"
              onClick={handleDeleteTask}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant="tertiary"
              onClick={handleEditTask}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText
            value={taskTitle}
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            autoFocus
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              variant="secondary"
              type="button"
              onClick={handleExitEditTask}
            />
            <ButtonIcon type="submit" icon={CheckIcon} variant="primary" />
          </div>
        </form>
      )}
    </Card>
  );
}
