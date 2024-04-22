import { useEffect, useState } from 'react';

import './PinYinList.css';

function PinYinList(props: any) {
  const [usage, setUsage] = useState(props.usage);

  useEffect(() => {
    setUsage(props.usage);
  }, [props.usage]);

  return (
    <>
      <div className='pinyin-list'>
        {props.pinYinList.map((value: string, _: number) => (
          <div className={`pinyin-list__pinyin usage-${usage.get(value)}`}>{value}</div>
        ))}
      </div>
    </>
  );
}

export default PinYinList;
