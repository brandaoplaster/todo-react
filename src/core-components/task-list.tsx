import Button from "../components/button";
import PlusIcon from "../assets/icons/plus.svg?react";
import TaskItem from "./task-item";
import useTasks from "../hooks/use-tasks";

export default function TaskList() {
  const { tasks, prepareTask } = useTasks();

  function handleNewTask() {
    prepareTask();
  }

  return (
    <>
      <section>
        <Button icon={PlusIcon} className="w-full" onClick={handleNewTask}>
          New Task
        </Button>
      </section>

      <section className="space-y-2">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </section>
    </>
  );
}
