import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestRequest() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get<string[]>('http://localhost:5000/getList', { params: { id: 100 } })
      .then(response => {
        // setData(response.data);
      })
      .catch(error => {
        // debugger;
      })
      .finally(() => setLoading(false));
  }, []);
  return <>{!loading ? data.map(i => <div key={i}>{i}</div>) : <div>loading</div>}</>;
}
