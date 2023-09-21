import { atomWithStorage } from 'jotai/utils';

const STORAGE_KEY = 'lastActiveTabTimes';

type Data = Record<string, number>;

const storage = {
  getItem: async () => {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    return STORAGE_KEY in stored ? (stored[STORAGE_KEY] as Data) : {};
  },
  setItem: async (_: string, data: Data) => {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    stored[STORAGE_KEY] = data;
    chrome.storage.local.set(stored);
  },
  removeItem: async () => {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    delete stored[STORAGE_KEY];
    chrome.storage.local.set(stored);
  },
};

export const lastActiveTabTimesAtom = atomWithStorage<Data>('', {}, storage);
