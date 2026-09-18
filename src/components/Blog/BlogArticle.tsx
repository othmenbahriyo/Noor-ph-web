import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog';
import styles from './Blog.module.css';

interface BlogArticleProps {
  post: BlogPost;
  homeLabel: string;
  blogLabel: string;
  backLabel: string;
}

export default function BlogArticle({ post, homeLabel, blogLabel, backLabel }: BlogArticleProps) {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link href="/">{homeLabel}</Link> / <Link href="/blog">{blogLabel}</Link>
          </p>
          <span className={styles.heroCategory}>{post.category}</span>
          <h1>{post.title}</h1>
          <p className={styles.heroMeta}>{post.date}</p>
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleContainer}>
            <div className={styles.articleContent}>
              <MDXRemote source={post.content} />
            </div>

            <div className={styles.articleFooter}>
              <Link href="/blog" className={styles.backLink}>
                <i className="fas fa-arrow-left" />
                {backLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
