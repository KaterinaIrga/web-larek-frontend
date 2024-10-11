import './scss/styles.scss';
import {GoodModel} from './components/GoodModel';
import { BusketModel } from './components/BusketModel';
import { CardView } from './components/CardView';
import { Page } from './components/Page';
import { IGood } from './types';
import { Component } from './components/base/Component';

enum Events  {
  BUTTON_CLICK = 'button:click',
  BUTTON_HOVER = 'button:hover',
  BUTTON_UNHOVER = 'button:unhover',
  GOOD_ADD = 'good:add',
  GOOD_DELETE = 'good:delete',
  BUSKET_CHANGE = 'busket:change',
  MODAL_CLOSE = 'modal:close',
  MODAL_OPEN = 'modal:open',
  MODAL_SUBMIT = 'modal:submit',
  INPUT_CHANGE = 'input:change'
}

  