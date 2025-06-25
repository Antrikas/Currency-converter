import React, { useRef, useEffect } from 'react';

export default function RatesModal({ currency, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const handleClose = () => {
    dialogRef.current.close();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="rates-modal-dialog">
      <button
        className="rates-modal-close"
        onClick={handleClose}
      >
        ✕
      </button>
      <h3>
        {currency.currency} ({currency.currencyCode})
      </h3>
      <dl className="rates-modal-rates">
        <dt>Buy Rate:</dt>
        <dd>{currency.buyRate}</dd>
        <dt>Sell Rate:</dt>
        <dd>{currency.sellRate}</dd>
      </dl>
      <button
        className="rates-modal-ok"
        onClick={handleClose}
      >
        OK
      </button>
    </dialog>
  );
}
