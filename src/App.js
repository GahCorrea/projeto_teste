import { useState, useEffect } from 'react';
import { FaThermometerEmpty, FaWind, FaSpinner } from 'react-icons/fa';
import './styles/App.css'

function App() {
  const [weathers, setWeathers] = useState([]);
  const [city, setCity] = useState('');
  const [lasCity, setLastCity] = useState('')
  const [loading, setLoading] = useState('')

  function submitHandler(event) {
    event.preventDefault()
    setLastCity(city)
  }

  useEffect(() => {
    async function getCity() {
      setLoading(true);

      try {
        const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`)
        const data = await response.json();
        setWeathers(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }

    getCity()
  }, [lasCity])

  return (
    <div className='container'>
      <form action='submit' onSubmit={submitHandler}>
        <div className='form'>
          <input type='text' className='form input' placeholder='Ex: São Paulo' value={city} onChange={event => setCity(event.target.value)} />
          <button type='submit' className='form button' >
            {loading ? <FaSpinner className='loading'/> : <span>Search City</span>}
          </button>
        </div>
      </form>

      {lasCity && weathers && (
        <div className='card'>
          <h1>{lasCity}</h1>
          <h2>Current Weather</h2>
          <h2><strong>{weathers.description}</strong></h2>
          <div>
            <FaThermometerEmpty className='icon'/>
            <h2><strong>{weathers.temperature}</strong></h2>
          </div>
          <div>
            <FaWind className='icon'/>
            <h2><strong>{weathers.wind}</strong></h2>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;

// animation: spin 1s infinite @keyframe spin { 0%{transform: rotateZ(0Deg) 100%{transform: rotateZ(360Deg)}}}