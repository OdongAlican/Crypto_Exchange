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
  const API = '95CF4C23-5C1F-467A-910C-F6F9DBCEBC79';
  // const API2 = "9B4DA46A-CA8D-4D85-924D-7F2FF3F413C7";

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
    <div data-testid="appCoin" className="App">
      <div className="input-sections">
        <div className="input-sections-top">
          <input aria-label="value-input" value={value} type="number" onChange={ e => {
            if(e.target.value < 0) 
            {
              alert('We cannot exchange for values less than 0!!')
              return setSetValue(1);              
            } 
              setSetValue(e.target.value);
            }
            }/>
        </div>
        <div className="input-sections-lower">
          <select name="coin" value={coin} onChange={e => setCoin(e.target.value)}>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="DGD">Dodgecoin (DGD)</option>
            <option value="ETH">Etherium (ETH)</option>
          </select>
          <div className="icon-section">
          <i className="fas fa-exchange-alt" />
          </div>
          <select name="currency" value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="USD">United States Dollar "$" (USD)</option>
            <option value="GBP">British Pounds "£" (GBP)</option>
            <option value="EUR">Euro "€" (EUR)</option>
          </select>
        </div>
            {
              !amount ? (
                <div className="information-section">Loading !!!</div>
              ) : (
                <div className="information-section">
                  <div>{value} {currentCoin}</div>
                  <div> = </div>
                  <div>{ amount && parseFloat(amount).toFixed(2)} {currentCurrency}</div>
                </div>
              )
            }
      </div>
    </div>
  );
}

export default App;
