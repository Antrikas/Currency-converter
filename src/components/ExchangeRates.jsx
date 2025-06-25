import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL =
  process.env.REACT_APP_API_URL ||
  'http://10.100.10.91:8080/netteller-apis-war/apis/systemTools/exchangeRatesInfo';

export function ExchangeRates() {
  const [ratesData, setRatesData] = useState({
    base: null,
    list: [],
    lastUpdate: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchRates() {
      try {
        const res = await axios.get(API_URL, { cancelToken: source.token });
        const { baseExchangeRate, exchangeRates, lastUpdate } = res.data.data;
        setRatesData({
          base: baseExchangeRate,
          list: exchangeRates,
          lastUpdate,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!axios.isCancel(err)) {
          setRatesData(sd => ({ ...sd, loading: false, error: err }));
        }
      }
    }

    fetchRates();
    return () => source.cancel();
  }, []);

  return ratesData;
}
