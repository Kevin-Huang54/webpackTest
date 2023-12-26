import { useState } from 'react';
import { useImmer } from 'use-immer';

export default function TestUseState({ nameKey }: { nameKey: string }) {
  const [formData, updateFormData] = useImmer([{ age: 1 }, { age: 1 }, { age: 1 }, { age: 1 }]);
  return (
    <>
      <div>{JSON.stringify(formData)}</div>
      <button
        onClick={() => {
          updateFormData(list => {
            list[0].age = 2;
          });
        }}
      >
        updateFormData
      </button>
    </>
  );
}
