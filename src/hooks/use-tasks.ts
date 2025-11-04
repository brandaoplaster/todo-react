import useLocalStorage from "use-local-storage";
import type { Task } from "../types/task";
import { TASKS_KEY, TaskState } from "../types/task";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  function getTasksCount(tasks: Task[]) {
    return tasks.length;
  }

  function getConcludedTasksCount(tasks: Task[]) {
    return tasks.filter((t) => t.concluded).length;
  }

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        state: TaskState.Creating,
      },
    ]);
  }

  function updateTask(id: string, payload: { title: Task["title"] }) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, state: TaskState.Created, ...payload }
          : task
      )
    );
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, concluded } : task))
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return {
    tasks,
    tasksCount: getTasksCount(tasks),
    concludedTasksCount: getConcludedTasksCount(tasks),
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
}
