import { useAtom } from 'jotai';
import React, { useCallback, useTransition } from 'react';
import './App.css';
import { searchWordAtom } from './atoms/searchWordAtom';
import { browserHistoryAtom } from './atoms/browserHistoryAtom';

function App() {
  const [searchWord, setSearchWord] = useAtom(searchWordAtom);

  const [histories] = useAtom(browserHistoryAtom);

  const [, startTransition] = useTransition();

  const onSearchInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchWord(e.currentTarget.value);
    });
  }, []);

  return (
    <>
      <div>
        <input type="text" onInput={onSearchInputChange} />
        <ul>
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
