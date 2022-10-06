import Handlebars from 'handlebars';
import * as avatar from '../../../../assets/avatar.png';

export const avatarComponent = `
<div class="avatar">
<div class="avatar__img-wrapper">
	<img class="avatar__img" src="${avatar}" alt="">
</div>
</div>`;
Handlebars.registerPartial('avatar', avatarComponent);
