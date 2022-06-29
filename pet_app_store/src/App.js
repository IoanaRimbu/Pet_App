import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPets} from './actions/Pets';

function App() {
  const pets = useSelector(state => state.pets);
  const dispatch = useDispatch();
  console.log(pets);
  useEffect(() => {
    dispatch(getPets());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
