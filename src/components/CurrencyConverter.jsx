import React, { useState, useMemo } from 'react';
import data from '../data/response.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Select, MenuItem, FormControl, TextField } from '@mui/material';

export default function CurrencyConverter() {
  const currencies = useMemo(
    () => [data.data.baseExchangeRate, ...data.data.exchangeRates],
    []
  );
  const [from, setFrom]     = useState(currencies[0]);
  const [to, setTo]         = useState(currencies[1] || currencies[0]);
  const [amount, setAmount] = useState('');

  const converted = useMemo(() => {
    if (!amount) return '';
    return ((amount * from.buyRate) / to.sellRate).toFixed(to.decimalPlaces);
  }, [amount, from, to]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="converter-container">
      <div className="converter-header">
        <FontAwesomeIcon icon={faCoins} className="fa-coins" />
        <h2 className="converter-title">Currency Converter</h2>
      </div>

      {/* "I have" */}
      <label className="field-label">Currency I have</label>
      
      <div className="field-wrapper">
        <FormControl variant="standard">
          
          <Select
            labelId="from-label"
            value={from.currencyCode}
            onChange={e => setFrom(currencies.find(c => c.currencyCode === e.target.value))}
            disableUnderline
            className="dropdown"
          >
            {currencies.map(c => (
              <MenuItem key={c.currencyCode} value={c.currencyCode}>
                <img src={c.imgUrl} alt="" width="24" height="16" style={{ marginRight: 8 }} />
                {c.currencyCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          type="text"
          value={amount}
          onChange={e => {
          const digitsOnly = e.target.value.replace(/\D/g, '');
          setAmount(digitsOnly);
          }}
          placeholder="0.00"
          className="amount-input"
          inputProps={{
          inputMode: 'numeric',                // numeric keypad on mobile
          pattern: '[0-9]*',                   // only digits valid
          style: { textAlign: 'right', paddingRight: '10px' },
          }}
        />
      </div>
      <div className="rate-text">Rate: {from.buyRate}</div>

      {/* Swap */}
      <div className="swap-button-wrapper">
        <FontAwesomeIcon icon={faExchangeAlt} className="fa-exchange-alt" onClick={handleSwap} />
      </div>

      {/* "I want" */}
      <label className="field-label">Currency I want</label>
      <div className="field-wrapper">
        <FormControl variant="standard">
          
          <Select
            labelId="to-label"
            value={to.currencyCode}
            onChange={e => setTo(currencies.find(c => c.currencyCode === e.target.value))}
            disableUnderline
            className="dropdown"
          >
            {currencies.map(c => (
              <MenuItem key={c.currencyCode} value={c.currencyCode}>
                <img src={c.imgUrl} alt="" width="24" height="16" style={{ marginRight: 8 }} />
                {c.currencyCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          value={converted}
          placeholder="0.00"
          className="converted-input"  
          inputProps={{ style: { textAlign: 'right', paddingRight: '10px', height: '40px' } }}
        />
      </div>
      <div className="rate-text">Rate: {to.sellRate}</div>

      {/* Footer */}
      <div className="footer-text">Rates as of {data.data.lastUpdate}</div>
    </div>
  );
}
