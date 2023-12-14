import React from 'react';
// import moment from "moment";
function App() {
  const log = async () => {
    const moment = await import('moment');
    alert(moment.default().format('MMMM Do YYYY, h:mm:ss a'));
    // alert(moment().format('MMMM Do YYYY, h:mm:ss a'))
  };
  return (
    <div>
      <h2>template_react_ts</h2>
      <button onClick={log}>log import</button>
    </div>
  );
}

export default App;
