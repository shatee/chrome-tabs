import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import './App.css';
import { searchWordAtom } from './atoms/searchWordAtom';
import { browserHistoryAtom } from './atoms/browserHistoryAtom';
import { browserTabAtom } from './atoms/browserTabAtom';
import { List } from './components/List';
import { SearchForm } from './components/SearchForm';
import { lastActiveTabTimesAtom } from './atoms/lastActiveTabTimesAtom';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchWord, setSearchWord] = useAtom(searchWordAtom);

  const [tabs] = useAtom(browserTabAtom);
  const [histories] = useAtom(browserHistoryAtom);
  const [lastActiveTabTimes, setLastActiveTabTimes] = useAtom(lastActiveTabTimesAtom);

  const [, startTransition] = useTransition();

  const onSearchInputChange = useCallback(() => {
    startTransition(() => {
      setSearchWord(inputRef.current?.value ?? '');
    });
  }, []);

  const openTab = useCallback((tabId: number) => {
    chrome.tabs.update(tabId, { active: true });
  }, []);

  const [lastTabId, setLastTabId] = useState<number>();
  useEffect(() => {
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
      if (!lastTabId) return;
      // setLastActiveTabTimes({
      //   ...lastActiveTabTimes,
      //   [`${lastTabId}`]: Date.now()
      // });
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
        <SearchForm.Input onInput={onSearchInputChange} ref={inputRef} />
        <ul className="">
          <List.Separator>Open tabs</List.Separator>
          {tabs.map((tab) => (
            <List.Item>
              <List.ItemTitle
                onClick={() => {
                  if (tab.id) openTab(tab.id);
                }}
              >
                {tab.title}
              </List.ItemTitle>
              <List.ItemUrl>{tab.url}</List.ItemUrl>
            </List.Item>
          ))}
          <List.Separator>History</List.Separator>
          {histories.map((history) => (
            <List.Item>
              <List.ItemTitle>{history.title}</List.ItemTitle>
              <List.ItemUrl>{history.url}</List.ItemUrl>
            </List.Item>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
