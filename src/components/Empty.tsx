import styles from "./Empty.module.css";
import clipboard from "../assets/clipboard.svg";
export function Empty() {
  return (
    <div className={styles.wrapper}>
      <img src={clipboard} alt="Imagem de uma lista" />
      <div>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}
