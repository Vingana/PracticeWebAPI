import styles from './ValidationErrors.module.css';
interface Props {
  errors: string[];
}
export function ValidationErrors({ errors }: Props) {
  if (errors.length === 0) return null;
  return (
    <div className={styles.errorBanner} role="alert" aria-live="polite">
      <strong className={styles.title}>Please fix the following errors:</strong>
      <ul className={styles.list}>
        {errors.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
