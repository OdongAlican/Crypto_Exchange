import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [coin, setCoin] = useState('BTC');
  const [currency, setCurrency] = useState('USD');
  const [value, setSetValue] = useState(1);
  const [currentCoin, setCurrentCoin] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const API = '9C51E2D5-7418-4839-90FB-211E06A605EF';

  const APIREQUEST = axios.create({
    baseURL: 'https://rest.coinapi.io/v1/exchangerate',
    headers: { 'X-CoinAPI-Key': API,}
  });

  const setCoinName = coin => {
    if(coin === 'BTC') {setCurrentCoin('Bitcoin (BTC)')}
    if (coin === 'DGD') { setCurrentCoin('Dodge Coin (DGD)')} 
    if (coin === 'ETH') {setCurrentCoin('Etherium (ETH)')}
  };

  const setCurrencyName = currency => {
    if(currency === 'USD') {setCurrentCurrency('United Sates Dollars "$" (USD)')}
    if (currency === 'GBP') { setCurrentCurrency('Great British Pound "£" (GBP)')} 
    if (currency === 'EUR') {setCurrentCurrency('Euros "€" (EUR)')}
  };

  useEffect(()=> {
    if(coin && currency) {
      APIREQUEST.get(`/${coin}/${currency}`).then(response => {
        setAmount((response?.data?.rate) * value);
        setCoinName(coin);
        setCurrencyName(currency);
      }
        ).catch(error => console.log(error));
    }
  }, [coin,currency, value]);
 
  return (
    <div className="App">
      <div className="input-sections">
        <div className="input-sections-top">
          <input type="number" onChange={ e => {
            if(e.target.value < 0) 
            {
              alert('We cannot exchange for values less than 0!!')
              return setSetValue(0);              
            } 
              setSetValue(e.target.value);
            }
            }/>
        </div>
        <div className="input-sections-lower">
          <select name="coin" value={coin} onChange={e => setCoin(e.target.value)}>
            <option value="" disabled defaultValue hidden>Select</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="DGD">Dodgecoin (DGD)</option>
            <option value="ETH">Etherium (ETH)</option>
          </select>
          <div className="icon-section">
          <i className="fas fa-exchange-alt" />
          </div>
          <select name="currency" value={currency} onChange={e => setCurrency(e.target.value)}>
          <option value="" disabled defaultValue hidden>Select</option>
            <option value="USD">United States Dollar "$" (USD)</option>
            <option value="GBP">British Pounds &pound; (PDS)</option>
            <option value="EUR">Euro &euro; (EURO)</option>
          </select>
        </div>
        <div className="information-section">
          <div>{value} {currentCoin}</div>
          <div> = </div>
          <div>{amount.toFixed(2)} {currentCurrency}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
