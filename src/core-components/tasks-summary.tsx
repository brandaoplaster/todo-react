import Badge from "../components/badge";
import Text from "../components/text";
import useTasks from "../hooks/use-tasks";

export default function TasksSummary() {
  const { createdTasksCount, concludedTasksCount, isLoadingTasks } = useTasks();

  return (
    <>
      <div className="flex items-center gap-2">
        <Text className="text-gray-300!" variant="body-sm-bold">
          Created Tasks
        </Text>
        <Badge variant="secondary" loading={isLoadingTasks}>
          {createdTasksCount}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Text className="text-gray-300!" variant="body-sm-bold">
          Concluded
        </Text>
        <Badge variant="primary" loading={isLoadingTasks}>
          {concludedTasksCount} de {createdTasksCount}
        </Badge>
      </div>
    </>
  );
}
