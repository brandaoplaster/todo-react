import useLocalStorage from "use-local-storage";
import type { Task } from "../types/task";
import { TASKS_KEY } from "../types/task";

export default function useTasks() {
  const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  function getTasksCount(tasks: Task[]) {
    return tasks.length;
  }

  function getConcludedTasksCount(tasks: Task[]) {
    return tasks.filter((t) => t.concluded).length;
  }

  return {
    tasks,
    tasksCount: getTasksCount(tasks),
    concludedTasksCount: getConcludedTasksCount(tasks),
  };
}
