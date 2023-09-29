import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import './App.css';
import { searchWordAtom } from './atoms/searchWordAtom';
import { browserHistoryAtom } from './atoms/browserHistoryAtom';
import { browserTabAtom } from './atoms/browserTabAtom';
import { List } from './components/List';
import { SearchForm } from './components/SearchForm';
import { lastActiveTabTimesAtom } from './atoms/lastActiveTabTimesAtom';
import { browserBookmarkAtom } from './atoms/browserBookmarkAtom';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchWord, setSearchWord] = useAtom(searchWordAtom);

  const [tabs] = useAtom(browserTabAtom);
  const [histories] = useAtom(browserHistoryAtom);
  const [bookmarks] = useAtom(browserBookmarkAtom);
  const [lastActiveTabTimes, setLastActiveTabTimes] = useAtom(lastActiveTabTimesAtom);

  const [index, setIndex] = useState(-1);

  const [, startTransition] = useTransition();

  // reset index when searchWord changed
  useEffect(() => {
    setIndex(-1);
  }, [searchWord]);

  const onSearchInputChange = useCallback(() => {
    startTransition(() => {
      setSearchWord(inputRef.current?.value ?? '');
    });
  }, []);

  const open = useCallback((item: chrome.tabs.Tab | chrome.history.HistoryItem | chrome.bookmarks.BookmarkTreeNode) => {
    if (typeof item.id === 'number') {
      // tab
      chrome.tabs.update(item.id, { active: true });
    } else {
      // history, bookmark
      chrome.tabs.create({ url: item.url });
    }
  }, []);

  const selectedItem = useMemo(() => {
    if (index === -1) return null;
    return [...tabs, ...histories, ...bookmarks][index] ?? null;
  }, [index, tabs, histories, bookmarks]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const count = tabs.length + histories.length + bookmarks.length;
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setIndex((index) => (count + index - 1) % count);
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setIndex((index) => (index + 1) % count);
      }
      if (event.key === 'Enter' && selectedItem) {
        event.preventDefault();
        open(selectedItem);
      }
    },
    [tabs, histories, bookmarks, selectedItem],
  );

  const [lastTabId, setLastTabId] = useState<number>();
  useEffect(() => {
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
      if (!lastTabId) return;
      setLastActiveTabTimes({
        ...lastActiveTabTimes,
        [`${lastTabId}`]: Date.now(),
      });
      setLastTabId(activeInfo.tabId);
    });
  }, []);

  // focus input when opened
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div>
        <SearchForm.Input onInput={onSearchInputChange} onKeyDown={onKeyDown} ref={inputRef} />
        <ul className="">
          <List.Separator>Open tabs</List.Separator>
          {tabs.map((tab) => (
            <List.Item
              selected={tab === selectedItem}
              onClick={() => {
                open(tab);
              }}
            >
              <List.ItemIcon src={tab.favIconUrl} />
              <List.ItemMain>
                <List.ItemTitle>{tab.title}</List.ItemTitle>
                <List.ItemUrl>{tab.url}</List.ItemUrl>
              </List.ItemMain>
            </List.Item>
          ))}
          <List.Separator>History</List.Separator>
          {histories.map((history) => (
            <List.Item
              selected={history === selectedItem}
              onClick={() => {
                open(history);
              }}
            >
              <List.ItemMain>
                <List.ItemTitle>{history.title}</List.ItemTitle>
                <List.ItemUrl>{history.url}</List.ItemUrl>
              </List.ItemMain>
            </List.Item>
          ))}
          <List.Separator>Bookmark</List.Separator>
          {bookmarks.map((bookmark) => (
            <List.Item
              selected={bookmark === selectedItem}
              onClick={() => {
                open(bookmark);
              }}
            >
              <List.ItemMain>
                <List.ItemTitle>{bookmark.title}</List.ItemTitle>
                <List.ItemUrl>{bookmark.url}</List.ItemUrl>
              </List.ItemMain>
            </List.Item>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
