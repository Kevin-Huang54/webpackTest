import moment from 'moment';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      now: {moment().format('YYYY-MM-DD HH:mm:ss')}
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}
