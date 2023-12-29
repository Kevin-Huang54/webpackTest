import { useEffect, useReducer, useState } from 'react';
import { useImmer } from 'use-immer';

function getInitList() {
  console.log('getInitList');
  return [{ age: 1 }, { age: 1 }, { age: 1 }, { age: 1 }];
}

interface IData {
  name: string;
}
interface reducerType {
  type: 'push' | 'pop' | 'clear';
  payload: string;
}
function reducer(state: IData[], action: reducerType) {
  switch (action.type) {
    case 'push':
      return [...state, { name: action.payload }];
    case 'clear':
      return [];
    case 'pop':
      return [...state];
    default:
      return [];
  }
}

export default function TestReducer({ nameKey }: { nameKey?: string }) {
  const [formData, dispatch] = useReducer(reducer, [{ name: 'hjj' }]);
  return (
    <>
      <div>{JSON.stringify(formData)}</div>
      <button
        onClick={() => {
          dispatch({ type: 'push', payload: 'aaa' });
        }}
      >
        push action
      </button>
    </>
  );
}
