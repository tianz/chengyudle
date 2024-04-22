import { useEffect, useState } from 'react';

import './Guess.css';

const NUM_CHARACTERS = 4;

function Guess(props: any) {
  const emptyGuess = (
    <>
      <div className='guess-list'>
        {[...Array(NUM_CHARACTERS)].map(_ => (
          <div className='character-pinyin'>
            <div className='pinyin'></div>
            <div className='character'></div>
          </div>
        ))}
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

    setInitialClass(newInitialClass);
    setFinalClass(newFinalClass);
  }, [props.correctAnswer]);

  return props.theGuess ? (
    <>
      <div className='guess-list'>
        {[...Array(NUM_CHARACTERS)].map((_, index) => (
          <div className='character-pinyin'>
            <div className='pinyin'>
              <span className={initialClass[index]}>{props.theGuess.initials[index]}</span>
              <span className={finalClass[index]}>{props.theGuess.finals_toneless[index]}</span>
            </div>
            <div className='character'>{props.theGuess.word[index]}</div>
          </div>
        ))}
      </div>
    </>
  ) : (
    emptyGuess
  );
}

export default Guess;
