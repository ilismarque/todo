import { Trash, NotePencil } from "phosphor-react";
import { ChangeEvent } from "react";
import styles from "./Task.module.css";

export interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onDeleteTask?: (id: string) => void;
  onEditTask?: (id: string) => void;
  onCompleteTask?: (id: string, isCheck: boolean) => void;
}

export function Task({
  id,
  content,
  isCompleted,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask?.(id);
  }

  function handleEditTask() {
    onEditTask?.(id);
  }

  function handleCompleteTask(event: ChangeEvent<HTMLInputElement>) {
    const isCheck = event.target.checked;
    onCompleteTask?.(id, isCheck);
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <label className={styles.container}>
          <input
            id={`task_${id}`}
            name="taskcheckbox"
            type="checkbox"
            checked={isCompleted}
            onChange={handleCompleteTask}
          />
          <span className={styles.checkmark}></span>
          <span className={isCompleted ? styles.taskCompleted : ""}>
            {content}
          </span>
        </label>
      </div>
      <div>
        <button className={styles.edit} onClick={handleEditTask}>
          <NotePencil size={16} weight="bold" />
        </button>
        <button className={styles.delete} onClick={handleDeleteTask}>
          <Trash size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
