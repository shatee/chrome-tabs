import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useRef, useTransition } from 'react';
import './App.css';
import { searchWordAtom } from './atoms/searchWordAtom';
import { browserHistoryAtom } from './atoms/browserHistoryAtom';
import { browserTabAtom } from './atoms/browserTabAtom';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchWord, setSearchWord] = useAtom(searchWordAtom);

  const [tabs] = useAtom(browserTabAtom);
  const [histories] = useAtom(browserHistoryAtom);

  const [, startTransition] = useTransition();

  const onSearchInputChange = useCallback(() => {
    startTransition(() => {
      setSearchWord(inputRef.current?.value ?? '');
    });
  }, []);

  // focus input when opened
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div>
        <input type="text" onInput={onSearchInputChange} ref={inputRef} />
        <ul>
          {tabs.map((tab) => (
            <li>
              <p>{tab.title}</p>
              <p>{tab.url}</p>
            </li>
          ))}
          {histories.map((history) => (
            <li>
              <p>{history.title}</p>
              <p>{history.url}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
