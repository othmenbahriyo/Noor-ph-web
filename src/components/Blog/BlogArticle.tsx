import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog';
import styles from './Blog.module.css';

interface BlogArticleProps {
  post: BlogPost;
  homeLabel: string;
  blogLabel: string;
  backLabel: string;
  relatedPageHref?: string;
  relatedPageLabel: string;
}

export default function BlogArticle({
  post,
  homeLabel,
  blogLabel,
  backLabel,
  relatedPageHref,
  relatedPageLabel,
}: BlogArticleProps) {
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
            <div className={styles.articleCoverImage}>
              <Image src={post.image} alt={post.title} fill sizes="(max-width: 900px) 100vw, 800px" priority />
            </div>

            <div className={styles.articleContent}>
              <MDXRemote source={post.content} />
            </div>

            {relatedPageHref && (
              <Link href={relatedPageHref} className={styles.relatedFeatureLink}>
                <i className="fas fa-mobile-screen-button" />
                {relatedPageLabel}
              </Link>
            )}

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
