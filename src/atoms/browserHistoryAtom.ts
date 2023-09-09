import { atom } from 'jotai';
import { searchWordAtom } from './searchWordAtom';

export const browserHistoryAtom = atom(async (get) => {
  const searchWord = get(searchWordAtom);
  return await chrome.history.search({
    text: searchWord,
    maxResults: 10,
  });
});
