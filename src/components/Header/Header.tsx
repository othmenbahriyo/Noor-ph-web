import { getLocale } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/blog';
import HeaderClient from './HeaderClient';

// Server wrapper: reads blog posts from disk (only possible server-side)
// and hands them to the interactive client header, so the search modal
// can include blog results without every page needing to fetch and pass
// this data down itself.
export default async function Header() {
  const locale = await getLocale();
  const recentPosts = getAllBlogPosts(locale);

  return <HeaderClient recentPosts={recentPosts} />;
}
