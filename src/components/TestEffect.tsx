import { useEffect, useReducer, useState } from 'react';
import { useImmer } from 'use-immer';

export default function TestEffect({ nameKey }: { nameKey?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
    // const timer = setInterval(() => {
    //   console.log('setInterval');
    //   setCount(count => count + 1);
    // }, 1000);
    // return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(c => c + 1);
        }}
      >
        changeFormData
      </button>
    </>
  );
}
