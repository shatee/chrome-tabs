import { atom } from 'jotai';
import { searchWordAtom } from './searchWordAtom';
import { lastActiveTabTimesAtom } from './lastActiveTabTimesAtom';

const LIMIT = 10;

export const browserTabAtom = atom(async (get) => {
  const searchWord = get(searchWordAtom);
  const lastActiveTabTimes = await get(lastActiveTabTimesAtom);

  const tabs = await chrome.tabs.query({});
  console.log('tabs', searchWord);
  return tabs
    .filter((tab) => {
      return tab.url?.includes(searchWord) || tab.title?.includes(searchWord);
    })
    .sort((a, b) => {
      const aTime = a.id && `${a.id}` in lastActiveTabTimes ? lastActiveTabTimes[`${a.id}`] : 0;
      const bTime = b.id && `${b.id}` in lastActiveTabTimes ? lastActiveTabTimes[`${b.id}`] : 0;
      return bTime - aTime;
    })
    .slice(0, LIMIT);
});
