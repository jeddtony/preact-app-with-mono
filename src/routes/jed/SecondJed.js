import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
	// Trigger your effect
	const fetchApi = async() => {
		let results = axios.get('http://91.109.117.92/api/dashboard');
	}
	fetchApi()
	return () => {
	  // Optional: Any cleanup code
	};
  }, []);

  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div style={{marginTop: '600px'}}>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter