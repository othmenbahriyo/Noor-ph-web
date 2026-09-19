import GithubSlugger from 'github-slugger';

export interface TocEntry {
  id: string;
  title: string;
}

// Mirrors what rehype-slug (applied to the rendered MDX) generates, so the
// anchors built here from the raw markdown match the actual heading ids in
// the DOM. Only ## (h2) headings are included — h3s are sub-points, not
// worth a top-level table of contents entry.
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  const headingPattern = /^##\s+(.+)$/gm;

  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(markdown)) !== null) {
    const title = match[1].trim();
    entries.push({ id: slugger.slug(title), title });
  }

  return entries;
}
