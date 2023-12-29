import TestUseState from './components/TestUseState';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TestReducer from './components/TestReducer';
import TestEffect from './components/TestEffect';
import TestUseMemo from './components/TestUseMemo';
import TestRequest from './components/TestRequest';
import styles from './app.modules.css';
import './app.css';

function App() {
  useEffect(() => {
    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    import('moment').then(response => {
      const moment = response.default;
      console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    });
  }, []);
  return (
    <>
      <TestRequest />
      <div className={styles.father}>123</div>
      <div className="test">123</div>
      <img src="./static/test.png" alt="test" />
      <button
        onClick={() => {
          // setVersion(k => k + 1);
        }}
      >
        render father
      </button>
    </>
  );
}

export default App;
