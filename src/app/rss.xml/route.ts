import { getAllBlogPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://noor-phonetic-quran.com';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// French (the default locale) is used for the feed, since RSS doesn't
// support per-item alternate-language variants the way the sitemap does.
export async function GET() {
  const posts = getAllBlogPosts(routing.defaultLocale);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      const pubDate = new Date(post.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Noor Phonetic Quran - Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Guides et conseils pratiques sur le Tajweed, la mémorisation du Coran et la récitation.</description>
    <language>fr</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
