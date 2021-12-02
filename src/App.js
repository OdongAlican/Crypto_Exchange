import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loading, setLoading]  = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(1);
  const [coin, setCoin] = useState('BTC');
  const [currency, setCurrency] = useState('USD');
  const [selectedCoin, setSelectedCoin] = useState({});
  const [price, setPrice] = useState(0);
  const [modal, setModal] = useState(false);

  const SERVICEREQUEST = axios.create({baseURL: 'https://thawing-gorge-77198.herokuapp.com/'});

  const selectCoin = (coinDetails) => {
    if(coin === 'DGD') { setSelectedCoin(coinDetails?.DGD) }
    if(coin === 'BTC') { setSelectedCoin(coinDetails?.BTC) }
    if(coin === 'ETH') { setSelectedCoin(coinDetails?.ETH) }
  }

  useEffect(( )=>{ 
    if(currency === 'USD') return setPrice(parseFloat((selectedCoin?.quote?.USD?.price) * value).toFixed(2));
    if(currency === 'EUR') return setPrice(parseFloat((selectedCoin?.quote?.USD?.price) * 0.88 * value).toFixed(2));
    if(currency === 'GBP') return setPrice(parseFloat((selectedCoin?.quote?.USD?.price) * 0.75 * value).toFixed(2));
  },[selectedCoin]);

  useEffect(()=>{ 
    setLoading(true);
    SERVICEREQUEST.get(`coin?coin=${coin}`).then(
      response => { selectCoin(response?.data.data); setLoading(false);}
    ).catch(error => {setError(error?.message); setLoading(false);});
  },[value, coin, currency]);
 
  return (
    <div data-testid="appCoin" className="App">
      <div className="input-sections">
      { modal &&
        (<div className="display-rates">
          <h5>Exchange Rates</h5>
          <div className="rates-details">
              1 USD = 0.88 EURO <br/>
              1 USD = 0.75 GBP
          </div>
        </div>) }
        <div className="input-sections-top">
          <input aria-label="value-input" value={value} type="number" onChange={ e => {
            if(e.target.value < 0) 
            {
              alert('We cannot exchange for values less than 0!!')
              return setValue(1);              
            } 
              setValue(e.target.value);
            }
            }/>
        </div>
        <div className="input-sections-lower">
        <select name="coin" value={coin} onChange={e => setCoin(e.target.value)}>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="DGD">Dodgecoin (DGD)</option>
            <option value="ETH">Etherium (ETH)</option>
          </select>
          <div className="icon-section" onClick={() =>setModal(!modal)} >
            <i className="fas fa-exchange-alt" />
          </div>
          <select name="currency" value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="USD">United States Dollar "$" (USD)</option>
            <option value="GBP">British Pounds "£" (GBP)</option>
            <option value="EUR">Euro "€" (EUR)</option>
          </select>
        </div>
            {
              loading ? (
                <div className="information-section">Loading !!!</div>
              ) : error ? ( <div>{error}</div>) : (
                <div className="information-section">
                  <div>{value} {coin}</div>
                  <div> = </div>
                  <div>{ price && price} {currency}</div>
                </div>
              )
            }
      </div>
    </div>
  );
}

export default App;
