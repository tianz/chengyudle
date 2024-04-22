import { useEffect, useState } from 'react';

import { ChengYuList } from '../lib/chengYuList';

import './Guess.css';

function Guess(props) {
  const emptyGuess = (
    <>
      <div className='guess-list'>
        <div className='character-pinyin'>
          <div className='pinyin'></div>
          <div className='character'></div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'></div>
          <div className='character'></div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'></div>
          <div className='character'></div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'></div>
          <div className='character'></div>
        </div>
      </div>
    </>
  );

  const [initialClass, setInitialClass] = useState([
    'initial-black',
    'initial-black',
    'initial-black',
    'initial-black',
  ]);
  const [finalClass, setFinalClass] = useState(['final-black', 'final-black', 'final-black', 'final-black']);

  useEffect(() => {
    let newInitialClass = ['initial-black', 'initial-black', 'initial-black', 'initial-black'];
    let newFinalClass = ['final-black', 'final-black', 'final-black', 'final-black'];

    if (props.theGuess) {
      const guessedChengYu = props.theGuess;
      // count initials in correct answer
      let correctInitialCount = new Map<string, number>();
      for (let initial of props.correctAnswer.initials) {
        correctInitialCount.set(initial, (correctInitialCount.get(initial) ?? 0) + 1);
      }

      // count finals in correct answer
      let correctFinalCount = new Map<string, number>();
      for (let final of props.correctAnswer.finals_toneless) {
        correctFinalCount.set(final, (correctFinalCount.get(final) ?? 0) + 1);
      }

      // count initials in guess
      let guessInitialCount = new Map<string, number>();
      for (let initial of guessedChengYu.initials) {
        guessInitialCount.set(initial, (guessInitialCount.get(initial) ?? 0) + 1);
      }

      // count finals in guess
      let guessFinalCount = new Map<string, number>();
      for (let final of guessedChengYu.finals_toneless) {
        guessFinalCount.set(final, (guessFinalCount.get(final) ?? 0) + 1);
      }

      console.log(correctInitialCount);

      // process the green ones first
      for (let i = 0; i < 4; i++) {
        if (props.correctAnswer.initials[i] === guessedChengYu.initials[i]) {
          // exact match of initial
          newInitialClass[i] = 'initial-green';
          correctInitialCount.set(
            props.correctAnswer.initials[i],
            (correctInitialCount.get(props.correctAnswer.initials[i]) ?? 0) - 1,
          );
          // update usage to green
          props.initialUsageHandler(guessedChengYu.initials[i], 'green');
        }
        if (props.correctAnswer.finals_toneless[i] === guessedChengYu.finals_toneless[i]) {
          // exact match of final
          newFinalClass[i] = 'final-green';
          correctFinalCount.set(
            props.correctAnswer.finals_toneless[i],
            (correctFinalCount.get(props.correctAnswer.finals_toneless[i]) ?? 0) - 1,
          );
          // update usage to green
          props.finalUsageHandler(guessedChengYu.finals_toneless[i], 'green');
        }
      }

      // then process the yellow ones
      for (let i = 0; i < 4; i++) {
        if (props.correctAnswer.initials[i] !== guessedChengYu.initials[i]) {
          if ((correctInitialCount.get(guessedChengYu.initials[i]) ?? 0) > 0) {
            // wrong location of initial
            newInitialClass[i] = 'initial-yellow';
            correctInitialCount.set(
              guessedChengYu.initials[i],
              (correctInitialCount.get(guessedChengYu.initials[i]) ?? 0) - 1,
            );
            // if usage is unknown, it's yellow
            props.initialUsageHandler(guessedChengYu.initials[i], 'yellow');
          } else {
            // if usage is unknown, it's red
            props.initialUsageHandler(guessedChengYu.initials[i], 'red');
          }
        }

        if (props.correctAnswer.finals_toneless[i] !== guessedChengYu.finals_toneless[i]) {
          if ((correctFinalCount.get(guessedChengYu.finals_toneless[i]) ?? 0) > 0) {
            // wrong location of final
            newFinalClass[i] = 'final-yellow';
            correctFinalCount.set(
              guessedChengYu.finals_toneless[i],
              (correctFinalCount.get(guessedChengYu.finals_toneless[i]) ?? 0) - 1,
            );
            // if usage is unknown, it's yellow
            props.finalUsageHandler(guessedChengYu.finals_toneless[i], 'yellow');
          } else {
            // if usage is unknown, it's red
            props.finalUsageHandler(guessedChengYu.finals_toneless[i], 'red');
          }
        }
      }
    }

    console.log(newInitialClass);
    setInitialClass(newInitialClass);
    setFinalClass(newFinalClass);
  }, [props.correctAnswer]);

  return props.theGuess ? (
    <>
      <div className='guess-list'>
        <div className='character-pinyin'>
          <div className='pinyin'>
            <span className={initialClass[0]}>{props.theGuess.initials[0]}</span>
            <span className={finalClass[0]}>{props.theGuess.finals_toneless[0]}</span>
          </div>
          <div className='character'>{props.theGuess.word[0]}</div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'>
            <span className={initialClass[1]}>{props.theGuess.initials[1]}</span>
            <span className={finalClass[1]}>{props.theGuess.finals_toneless[1]}</span>
          </div>
          <div className='character'>{props.theGuess.word[1]}</div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'>
            <span className={initialClass[2]}>{props.theGuess.initials[2]}</span>
            <span className={finalClass[2]}>{props.theGuess.finals_toneless[2]}</span>
          </div>
          <div className='character'>{props.theGuess.word[2]}</div>
        </div>
        <div className='character-pinyin'>
          <div className='pinyin'>
            <span className={initialClass[3]}>{props.theGuess.initials[3]}</span>
            <span className={finalClass[3]}>{props.theGuess.finals_toneless[3]}</span>
          </div>
          <div className='character'>{props.theGuess.word[3]}</div>
        </div>
      </div>
    </>
  ) : (
    emptyGuess
  );
}

export default Guess;
