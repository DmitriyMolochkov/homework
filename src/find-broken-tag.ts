
const tagPattern = /<[^<>]*>/g;
const openTagPattern = /<[^/]*>/;
const tagNamePattern = /[^/<>]+/;

export default function findBrokenTag(xml: string): boolean | string {
  const openTags: string[] = [];

  for (const [tag] of xml.matchAll(tagPattern)) {
    const tagName = tag.match(tagNamePattern)![0];

    if (tag.match(openTagPattern)) {
      openTags.push(tagName);
      continue;
    }

    const lastOpenTag = openTags.pop();
    if (tagName !== lastOpenTag)
      return lastOpenTag || tagName;
  }

  return openTags.slice(-1)[0] || true;
}