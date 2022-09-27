/* eslint-disable */
require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';

//import './app.css';
import LoginPage from './pages/login';
import Button from './components/button';
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';

registerComponent(Button);
// registerComponent(Link);
// registerComponent(Input);
// registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new LoginPage());
});
