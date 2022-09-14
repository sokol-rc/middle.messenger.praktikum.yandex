import Handlebars from 'handlebars';
import {loginPageTemplate} from './pages/login/login.tmpl'
import {registrationPageTemplate} from './pages/registration/registration.tmpl';
import {chatPageTemplate} from './pages/chat/chat.tmpl';
import {profileTemplate} from './pages/profile/profile.tmpl'

import './partials/header.tmpl';
import './partials/footer.tmpl';
import './partials/elements/person/avatar/avatar.tmpl';
import './partials/components/chat-list/chat-item/chat-item.tmpl'
import './partials/components/chat-list/chat-list.tmpl';
import './partials/elements/person/name/name.tmpl';
import './partials/elements/message/preview/preview.tmpl';
import './partials/components/dialog-window/dialog-window.tmpl';
import './partials/elements/controls/sidebar-button/sidebar-button.tmpl';
import './partials/components/right-sidebar/right-sidebar.tmpl';

const template = Handlebars.compile(profileTemplate);

const html = template();
document.getElementById('root').innerHTML = html;