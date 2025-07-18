import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>An error has occurred while fetching tasks...</div>;
  return (
    <div className="dark:bg-dark-bg min-h-screen bg-white px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="bg-blue-primary flex items-center rounded px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              New Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
