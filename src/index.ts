/* eslint-disable */
require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';

//import './app.css';
import LoginPage from './pages/login';
import Button from './components/button';
import Input from './components/input';
import { InputInner } from './components/input/inputInner'
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';

registerComponent(Button);
registerComponent(Input);
registerComponent(InputInner);
// registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new LoginPage());
});
