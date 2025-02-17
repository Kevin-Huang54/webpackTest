import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Home
      <div>
        <Link to="/about">about</Link>
      </div>
    </div>
  );
}
