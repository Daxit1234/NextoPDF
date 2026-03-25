import { blogPosts, BlogPost } from './blog';
import { getToolBySlug } from './tools';

const slugToToolMap: Record<string, string> = {
  merge: 'merge-pdf',
  compress: 'compress-pdf',
  summarizer: 'ai-summarizer',
  translate: 'translate-pdf',
  split: 'split-pdf',
  rotate: 'rotate-pdf',
  delete: 'delete-pages',
  extract: 'extract-pdf-pages',
  organize: 'organize-pdf',
  edit: 'edit-pdf',
  reader: 'pdf-reader',
  number: 'number-pages',
  crop: 'crop-pdf',
  watermark: 'watermark-pdf',
  'pdf-to-word': 'pdf-to-word',
  'pdf-to-excel': 'pdf-to-excel',
  'pdf-to-ppt': 'pdf-to-ppt',
  'pdf-to-image': 'pdf-to-image',
  'word-to-pdf': 'word-to-pdf',
  'excel-to-pdf': 'excel-to-pdf',
  'ppt-to-pdf': 'ppt-to-pdf',
  'jpg-to-pdf': 'image-to-pdf',
  sign: 'sign-pdf',
  unlock: 'unlock-pdf',
  protect: 'protect-pdf',
  flatten: 'flatten-pdf',
};

export function getToolSlugFromPost(post: BlogPost) {
  const matchedKey = Object.keys(slugToToolMap).find((key) => post.slug.includes(key));
  return matchedKey ? slugToToolMap[matchedKey] : 'merge-pdf';
}

export function getReadingTime(post: BlogPost) {
  const words = post.content.replace(/\s+/g, ' ').trim().split(' ').length;
  return Math.max(3, Math.round(words / 220));
}

export function getRelatedPosts(post: BlogPost) {
  const toolSlug = getToolSlugFromPost(post);
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = getToolSlugFromPost(a) === toolSlug ? 1 : 0;
      const bMatches = getToolSlugFromPost(b) === toolSlug ? 1 : 0;
      return bMatches - aMatches;
    })
    .slice(0, 3);
}

export function getBlogFaqs(post: BlogPost) {
  const toolSlug = getToolSlugFromPost(post);
  const tool = getToolBySlug(toolSlug);
  const toolName = tool?.name || 'PDF tool';

  return [
    {
      question: `Who should use this ${toolName.toLowerCase()} guide?`,
      answer:
        'It is useful for anyone who wants a practical browser-first workflow before moving into a larger desktop or team process.',
    },
    {
      question: `What should I do after using ${toolName}?`,
      answer:
        'Review the output, make sure the file still looks correct, and combine it with related tools such as organize, compress, sign, or convert if your workflow needs another step.',
    },
    {
      question: 'Can this workflow save time for everyday document tasks?',
      answer:
        'Yes. These guides are built around common tasks like sharing, printing, cleaning up files, and preparing documents for clients or teams.',
    },
  ];
}
