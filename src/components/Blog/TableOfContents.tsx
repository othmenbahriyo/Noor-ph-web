import type { TocEntry } from '@/lib/toc';
import styles from './Blog.module.css';

interface TableOfContentsProps {
  entries: TocEntry[];
  title: string;
}

export default function TableOfContents({ entries, title }: TableOfContentsProps) {
  if (entries.length < 2) return null;

  return (
    <nav className={styles.toc} aria-label={title}>
      <span className={styles.tocTitle}>{title}</span>
      <ol className={styles.tocList}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`}>{entry.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
