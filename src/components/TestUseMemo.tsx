import { memo, useEffect, useMemo, useReducer, useState } from 'react';
import { useImmer } from 'use-immer';
import { expensiveFn } from '../utils';

export default memo(function TestUseMemo({ list, fn }: { fn: () => void; list?: { name: string } }) {
  const [key, setKey] = useState(0);
  // 缓存结果
  // const res = useMemo(() => expensiveFn(), []);
  // const res = expensiveFn();
  console.log('render TestUseMemo');
  useEffect(() => {
    console.log('useEffect TestUseMemo');
  });
  return (
    <>
      {/*<div>{res}</div>*/}
      <div>{key}</div>
      <div>list:{JSON.stringify(list)}</div>
      <button
        onClick={() => {
          // setKey(k => k + 1);
          fn();
        }}
      >
        render child
      </button>
    </>
  );
});
