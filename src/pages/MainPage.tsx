import { useEffect, useState } from 'react';

import Game from '../components/Game';

import { ChengYuList } from '../lib/chengYuList';

function MainPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * ChengYuList.length));
  }, []);

  return (
    <>
      <Game correctAnswer={ChengYuList[index]} />
    </>
  );
}

export default MainPage;
