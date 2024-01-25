import { ChangeEvent, useState } from 'react';
import TestRequest from './components/TestRequest';
import styles from './app.modules.css';
import './app.css';
import axios from 'axios';
// @ts-ignore
import SparkMD5 from 'spark-md5';

function App() {
  const [progress, setProgress] = useState<(number | null)[]>(
    new Array(10).fill(null),
  );

  async function checkProgress(fileHash: string, originFileName: string) {
    const { data: earlierProgress } = await axios.get<number[]>(
      'http://127.0.0.1:5000/getProgress',
      {
        params: {
          fileHash,
          originFileName,
        },
      },
    );
    setProgress(earlierProgress);
    return earlierProgress;
  }
  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const hashSeed = file.name + file.lastModified + file.size;
    let fileHash = SparkMD5.hash(hashSeed);

    const earlierProgress = await checkProgress(fileHash, file.name);

    // 全部已下载
    if (earlierProgress.every(i => i === 1)) {
      return;
    }
    const size = file.size;
    console.log('size = ' + size);
    const chunkCount = 10;
    const chunkSize = Math.ceil(size / chunkCount);
    let offset = 0;

    for (let i = 0; i < chunkCount; i++) {
      if (earlierProgress[i] === 1) continue;
      if (offset <= size) {
        const end = offset + chunkSize > size ? size : offset + chunkSize;
        const thisChunk = file.slice(offset, end);

        const content =
          thisChunk.size > 100000
            ? await thisChunk.slice(0, 100000).text()
            : await thisChunk.text();
        let chunkHash = SparkMD5.hash(content);
        uploadChunk(thisChunk, fileHash, chunkHash + '-' + i, file.name).then(
          res => {
            setProgress(progress => {
              const foo = progress.map((j, index) => (index === i ? 1 : j));
              return foo;
            });
          },
        );
        offset += chunkSize;
      }
    }
  };

  function uploadChunk(
    blob: Blob,
    fileHash: string,
    chunkHash: string,
    originFileName: string,
  ) {
    const formData = new FormData();
    formData.append('file', blob); // fileInput 为 <input type="file" />
    formData.append('chunkHash', chunkHash); // fileInput 为 <input type="file" />
    formData.append('fileHash', fileHash); // fileInput 为 <input type="file" />
    formData.append('originFileName', originFileName); // fileInput 为 <input type="file" />

    return axios.post('http://127.0.0.1:5000/upload', formData);
  }

  function test(path: string) {
    axios.get('http://127.0.0.1:5000/' + path).then(response => {
      console.log(response.data);
    });
  }

  return (
    <>
      <TestRequest />

      <input type="file" onChange={onUpload} />
      {/*<div>{JSON.stringify(progress)}</div>*/}
      <div className={styles.progressBox}>
        {progress.map((i, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: i === 1 ? 'antiquewhite' : undefined }}
              className={styles.progressBlock}
            />
          );
        })}
      </div>

      <button
        onClick={() => {
          test('hello');
        }}
      >
        getHello
      </button>
      <button
        onClick={() => {
          test('testSync');
          test('hello');
        }}
      >
        testSync
      </button>
    </>
  );
}

export default App;
