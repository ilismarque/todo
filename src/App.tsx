import { FormEvent, useState, ChangeEvent } from "react";
import { PlusCircle } from "phosphor-react";
import uuid from "react-uuid";

import { Header } from "./components/Header";
import { Task, TaskProps } from "./components/Task";
import { Empty } from "./components/Empty";

import styles from "./App.module.css";

export function App() {
  const storagedTasks = localStorage.getItem("tasks");
  const tasksInStorage = storagedTasks ? JSON.parse(storagedTasks) : [];

  const [tasks, setTasks] = useState<TaskProps[]>(tasksInStorage);
  const [newTaskText, setNewTaskText] = useState("");
  const [taskUuid, setTaskUuid] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      content: newTaskText,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value.trim();
    setNewTaskText(text.length !== 0 ? event.target.value : "");
  }

  function handleEditTask(event: FormEvent) {
    event.preventDefault();

    const editedTask = {
      id: taskUuid,
      content: newTaskText,
      isCompleted: false,
    };

    const newTasksList = tasks.filter((task) => {
      return task.id !== taskUuid;
    });

    setTasks([...newTasksList, editedTask]);
    setNewTaskText("");
    setTaskUuid("");
  }

  function deleteTask(taskId: string) {
    const newTasksList = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(newTasksList);
  }

  function editTask(taskId: string) {
    const taskToEdit = tasks.find((task) => task.id == taskId);

    if (taskToEdit) {
      setNewTaskText(taskToEdit ? taskToEdit.content : "");
      setTaskUuid(taskToEdit ? taskToEdit.id : "");
    }
  }

  function completeTask(taskId: string, isCheck: boolean) {
    const newTasksList = tasks.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = isCheck;
      }
      return task;
    });

    setTasks(newTasksList);
  }

  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.reduce((acc, task) => {
    if (task.isCompleted) {
      acc++;
    }
    return acc;
  }, 0);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  const isEmptyInput = newTaskText.trim().length === 0;
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form
          onSubmit={taskUuid.length > 0 ? handleEditTask : handleCreateNewTask}
          className={styles.inputBox}
        >
          <input
            type="text"
            name="task"
            onChange={handleNewTaskChange}
            value={newTaskText}
            placeholder="Adicione uma nova tarefa"
            required
          />
          <input type="hidden" value={taskUuid} />
          <button type="submit" disabled={isEmptyInput}>
            Criar
            <PlusCircle size={16} weight={"bold"} />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.created}>
              <strong>Tarefas criadas</strong>
              <span>{createdTasksCount}</span>
            </div>
            <div className={styles.done}>
              <strong>Concluídas</strong>
              <span>
                {completedTasksCount} de {createdTasksCount}
              </span>
            </div>
          </div>

          <div className={styles.taskList}>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <Task
                    id={task.id}
                    key={task.id}
                    content={task.content}
                    isCompleted={task.isCompleted}
                    onDeleteTask={deleteTask}
                    onEditTask={editTask}
                    onCompleteTask={completeTask}
                  />
                );
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
