import Block from 'core/Block';
import './avatar.css';
import isEmpty from 'utils/helpers/isEmpty';
import { BASE_URL } from 'utils/api/auth-api';
import personAvatar from '../../../assets/avatar.png';

interface Props {
	image: string;
	alt?: string;
}

export default class Avatar extends Block<Props> {
    static componentName = 'Avatar';

    protected render(): string {
		const { image, alt } = this.props;
		let avatarDefault: string = personAvatar;
		let altDefault = 'Аватар';
        if (
            typeof image !== 'undefined' &&
            !isEmpty(image) &&
			image !== 'null' &&
			image !== 'undefined' &&
			image !== null
		) {
            avatarDefault = `${BASE_URL}resources/${image}`;
		}
		if (typeof alt !== 'undefined' && alt !== '') { 
			altDefault = `${alt}`
		}

        return `<div class="avatar">
		<div class="avatar__img-wrapper">
			<img class="avatar__img" src="${avatarDefault}" alt="${altDefault}">
		</div>
		</div>`;
    }
}
