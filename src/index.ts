/* eslint-disable */
require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';

//import './app.css';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import Button from './components/button';
import Input from './components/input';
import { InputInner } from './components/input/inputInner'
import { InputError } from './components/input/error'
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';

registerComponent(Button);
registerComponent(Input);
registerComponent(InputInner);
registerComponent(InputError);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new RegistrationPage());
});
