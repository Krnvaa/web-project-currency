import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import './styles/App.css';

interface CurrencyPair {
  id: number;
  dt: string;
  kt: string;
}

const currencyPairs: CurrencyPair[] = [
  { id: 1, dt: 'USD', kt: 'RUB' },
  { id: 2, dt: 'USD', kt: 'EUR' },
  { id: 3, dt: 'USD', kt: 'AZN' },
  { id: 4, dt: 'USD', kt: 'CNY' },
];

const CurrencyGrid: React.FC = () => {
  const [gifUrl, setGifUrl] = useState('');
  const [open, setOpen] = useState(false);

  const handleRowClick = async (params: CurrencyPair) => {
    const dt = params.dt;
    const kt = params.kt;
    try {
      const response = await axios.get(`currency/getGifByCurrency?baseCurrency=${dt}&currencyCode=${kt}`);
      const gifUrl = response.data;
      setGifUrl(gifUrl);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching GIF:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="currency-grid">
      {currencyPairs.map((pair) => (
        <div key={pair.id} className="currency-item" onDoubleClick={() => handleRowClick(pair)}>
          <div>{pair.dt}</div>
          <div>{pair.kt}</div>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {gifUrl && <img src={gifUrl} alt="GIF" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrencyGrid;