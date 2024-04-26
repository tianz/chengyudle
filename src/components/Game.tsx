import { useEffect, useState } from 'react';

import { ChengYuList } from '../lib/chengYuList';
import { finalList, initialList } from '../lib/pinyin';

import './Game.css';

import Guess from './Guess';
import PinYinList from './PinYinList';

function Game(props: any) {
  const [initialsUsage, setInitialsUsage] = useState(new Map<string, string>());
  const [finalsUsage, setFinalsUsage] = useState(new Map<string, string>());
  const [count, setCount] = useState(0);
  const [guesses, setGuesses] = useState([<Guess />]);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    let newInitials = new Map<string, string>();
    for (let initial of initialList) {
      newInitials.set(initial, 'unknown');
    }
    setInitialsUsage(newInitials);

    let newFinals = new Map<string, string>();
    for (let final of finalList) {
      newFinals.set(final, 'unknown');
    }
    setFinalsUsage(newFinals);
  }, []);

  const updateInitialUsage = (newInitials: any) => {
    setInitialsUsage(newInitials);
  };

  const updateFinalUsage = (newFinals: any) => {
    setFinalsUsage(newFinals);
  };

  const handleInputChange = (event: any) => {
    setInputVal(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const handleGuess = () => {
    const guess = inputVal.trim();
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
          initials={initialsUsage}
          finals={finalsUsage}
        />
      );
      newGuesses.push(<Guess />);
      setGuesses(newGuesses);
      setCount(count + 1);
      setInputVal('');
    } else {
      setInputVal(guess); // trim
    }
  };

  return (
    <>
      <h3>难度：{props.correctAnswer.difficulty}</h3>
      <div className='guess-container'>{guesses.map((guess: any) => guess)}</div>
      <div className='input'>
        <input className='input__field' onKeyDown={handleKeyDown} onChange={handleInputChange} value={inputVal}></input>
        <div className='input__button' onClick={handleGuess}>
          确认
        </div>
      </div>
      <h4>声母</h4>
      <PinYinList pinYinList={initialList} usage={initialsUsage} />
      <h4>韵母</h4>
      <PinYinList pinYinList={finalList} usage={finalsUsage} />
    </>
  );
}

export default Game;
