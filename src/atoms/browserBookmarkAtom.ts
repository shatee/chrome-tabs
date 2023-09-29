import { atom } from 'jotai';
import { searchWordAtom } from './searchWordAtom';

export const browserBookmarkAtom = atom(async (get) => {
  const searchWord = get(searchWordAtom);
  return new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
    chrome.bookmarks.search(searchWord, resolve);
  });
});
