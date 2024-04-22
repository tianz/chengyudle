import { useEffect, useState } from 'react';

import { ChengYuList } from '../lib/chengYuList';

import './Game.css';

import Guess from './Guess';

function Game(props: any) {
  const initialList = [
    'b',
    'p',
    'm',
    'f',
    'd',
    't',
    'n',
    'l',
    'g',
    'k',
    'h',
    'j',
    'q',
    'x',
    'zh',
    'ch',
    'sh',
    'r',
    'z',
    'c',
    's',
    'y',
    'w',
  ];
  const finalList = [
    'a',
    'o',
    'e',
    'i',
    'u',
    'ü',
    'ao',
    'ai',
    'an',
    'ang',
    'ou',
    'ong',
    'ei',
    'en',
    'eng',
    'er',
    'ia',
    'iao',
    'ian',
    'iang',
    'iong',
    'ie',
    'iu',
    'in',
    'ing',
    'ua',
    'uai',
    'uan',
    'uang',
    'uo',
    'ue',
    'ui',
    'un',
    'üe',
  ];

  const [initials, setInitials] = useState(new Map<string, string>());
  const [finals, setFinals] = useState(new Map<string, string>());
  const [count, setCount] = useState(0);
  const [hack, setHack] = useState(0);
  const [guesses, setGuesses] = useState([<Guess />]);

  const pyClass = new Map<string, string>([
    ['unknown', 'pinyin-list__pinyin usage-known'],
    ['green', 'pinyin-list__pinyin usage-green'],
    ['yellow', 'pinyin-list__pinyin usage-yellow'],
    ['red', 'pinyin-list__pinyin usage-red'],
  ]);

  useEffect(() => {
    let newInitials = new Map<string, string>();
    for (let initial of initialList) {
      newInitials.set(initial, 'unknown');
    }
    setInitials(newInitials);

    let newFinals = new Map<string, string>();
    for (let final of finalList) {
      newFinals.set(final, 'unknown');
    }
    setFinals(newFinals);
  }, []);

  const updateInitialUsage = (initial: string, status: string) => {
    let mp = initials;
    if (mp.get(initial) === 'unknown' || status === 'green') {
      mp.set(initial, status);
    }
    setInitials(mp);
    setHack(hack + 1);
  };

  const updateFinalUsage = (final: string, status: string) => {
    let mp = finals;
    if (mp.get(final) === 'unknown' || status === 'green') {
      mp.set(final, status);
    }
    setFinals(mp);
    setHack(hack + 1);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      let guess = event.target.value.trim();
      if (ChengYuList.filter(chengyu => chengyu.word === guess).length == 1) {
        let myGuess = ChengYuList.filter(chengyu => chengyu.word === guess)[0];
        // valid guess
        let newGuesses = guesses;
        newGuesses[count] = (
          <Guess
            correctAnswer={props.correctAnswer}
            theGuess={myGuess}
            initialUsageHandler={updateInitialUsage}
            finalUsageHandler={updateFinalUsage}
          />
        );
        newGuesses.push(<Guess />);
        setCount(count + 1);
        setGuesses(newGuesses);
      }
    }
  };

  return (
    <>
      <div className='guess-container'>{guesses.map((guess: any) => guess)}</div>
      <div className='input'>
        <input onKeyDown={handleKeyDown}></input>
      </div>
      <h4>声母</h4>
      <div className='pinyin-list'>
        {initialList.map((value, _) => (
          <div className={pyClass.get(initials.get(value) ?? 'unknown')}>{value}</div>
        ))}
      </div>
      <h4>韵母</h4>
      <div className='pinyin-list'>
        {finalList.map((value, _) => (
          <div className={pyClass.get(finals.get(value) ?? 'unknown')}>{value}</div>
        ))}
      </div>
    </>
  );
}

export default Game;
