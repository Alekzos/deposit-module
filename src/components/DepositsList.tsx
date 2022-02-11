
import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

import {IDeposit} from '../../data/types';

const DepositsList: React.FC<IDeposit> = (props) => {
  return (
    <div>
      <p>тест</p>

      <ul>
        {props.map(item => 
            (<li key={item.id}>
                {item.title}
            </li>))}
      </ul>
    </div>
  );
};

export default DepositsList