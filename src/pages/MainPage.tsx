import { useEffect, useState } from 'react';

import Game from '../components/Game';

import { ChengYuList } from '../lib/chengYuList';

import './MainPage.css';

function MainPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * ChengYuList.length));
  }, []);

  return (
    <>
    <div className="page-container">
      <div className="header">
      <h2>成语dle</h2>
      </div>
      <Game correctAnswer={ChengYuList[index]} />
    </div>
    </>
  );
}

export default MainPage;
