import React from 'react';
import { CascaderInput } from './inputs/CascaderInput';
import './rentalForm.scss';

export const RentalForm = () => {
  return (
    <header className="active">
      <div className="inner">
        <CascaderInput />
      </div>
    </header>
  );
};
