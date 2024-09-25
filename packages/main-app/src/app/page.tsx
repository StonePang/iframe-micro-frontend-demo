import IFrameComponent from "@/components/iframe-component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      主应用
      <IFrameComponent/>
    </div>
  );
}
