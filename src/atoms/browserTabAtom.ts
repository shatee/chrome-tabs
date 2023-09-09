import { atom } from 'jotai';
import { searchWordAtom } from './searchWordAtom';

const LIMIT = 10;

export const browserTabAtom = atom(async (get) => {
  const searchWord = get(searchWordAtom);

  const tabs = await chrome.tabs.query({});
  console.log('tabs', searchWord);
  return tabs
    .filter((tab) => {
      return tab.url?.includes(searchWord) || tab.title?.includes(searchWord);
    })
    .slice(0, LIMIT);
});
