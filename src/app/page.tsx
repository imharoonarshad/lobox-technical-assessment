
import styles from "./page.module.css";
import MultiDropdownSection from "@/components/MultiDropdownSection/MultiDropdownSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MultiDropdownSection />
      </main>
    </div>
  );
}
