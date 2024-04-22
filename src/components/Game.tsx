import { useEffect, useState } from 'react';

import { ChengYuList } from '../lib/chengYuList';

import './Game.css';

import Guess from './Guess';
import PinYinList from './PinYinList';

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
  const [guesses, setGuesses] = useState([<Guess />]);

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

  const updateInitialUsage = (newInitials: any) => {
    setInitials(newInitials);
  };

  const updateFinalUsage = (newFinals: any) => {
    setFinals(newFinals);
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
            initials={initials}
            finals={finals}
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
      <PinYinList pinYinList={initialList} usage={initials} />
      <h4>韵母</h4>
      <PinYinList pinYinList={finalList} usage={finals} />
    </>
  );
}

export default Game;
