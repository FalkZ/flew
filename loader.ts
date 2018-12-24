import demo from './demo.yml';
import flew from './demo.flew';

import './style.styl';
import './mapPrototypes';
import './logicPrototypes';

import { safeLoad } from 'js-yaml';

import interpreter from './interpreter';

fetch(flew)
  .then(response => response.text())
  .then(text => text.replace(/=>/g, '=>: ').replace(/(?!=>)(=)/g, '=: '))
  .then(text => safeLoad(text))
  .then(interpreter);
