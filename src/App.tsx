import TestUseState from './components/TestUseState';
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import TestReducer from './components/TestReducer';
import TestEffect from './components/TestEffect';
import TestUseMemo from './components/TestUseMemo';
import TestRequest from './components/TestRequest';
import styles from './app.modules.css';
import './app.css';
import axios from 'axios';
// @ts-ignore
import SparkMD5 from 'spark-md5';

function App() {
  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileContent = await file.text();
    let fileHash = SparkMD5.hash(fileContent);

    const size = file.size;
    const chunkCount = 10;
    const chunkSize = Math.ceil(size / chunkCount);
    let offset = 0;

    console.log(fileHash);

    for (let i = 0; i < chunkCount; i++) {
      if (offset <= size) {
        const end = offset + chunkSize > size ? size : offset + chunkSize;
        const thisChunk = file.slice(offset, end);

        const content = await thisChunk.text();
        let chunkHash = SparkMD5.hash(content);
        uploadChunk(thisChunk, fileHash, chunkHash + '-' + i).then(res => {
          // debugger;
        });
        offset += chunkSize;
      }
    }
  };

  function uploadChunk(blob: Blob, fileHash: string, chunkHash: string) {
    const formData = new FormData();
    formData.append('file', blob); // fileInput 为 <input type="file" />
    formData.append('chunkHash', chunkHash); // fileInput 为 <input type="file" />
    formData.append('fileHash', fileHash); // fileInput 为 <input type="file" />

    return axios.post('http://127.0.0.1:5000/upload', formData);
  }

  return (
    <>
      <TestRequest />
      <div className={styles.father}>123</div>
      <div className="test">123</div>
      <img src="./static/test.png" alt="test" />
      <button
        onClick={() => {
          console.log('111');
          // setVersion(k => k + 1);
        }}
      >
        render father
      </button>
      <input type="file" onChange={onUpload} />
    </>
  );
}

export default App;
