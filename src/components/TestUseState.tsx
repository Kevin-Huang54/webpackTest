import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

function getInitList() {
  console.log('getInitList');
  return [{ age: 1 }, { age: 1 }, { age: 1 }, { age: 1 }];
}
export default function TestUseState({ nameKey }: { nameKey: string }) {
  const [formData, updateFormData] = useImmer(getInitList);
  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <>
      <div>{JSON.stringify(formData)}</div>
      <button
        onClick={() => {
          updateFormData(list => {
            list.push({ age: 3 });
          });
        }}
      >
        updateFormData
      </button>
    </>
  );
}
