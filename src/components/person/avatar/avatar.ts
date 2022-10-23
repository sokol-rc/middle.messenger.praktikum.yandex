import Block from 'core/Block';
import './avatar.css';
import isEmpty from 'utils/helpers/isEmpty';
import personAvatar from '../../../assets/avatar.png';

interface Props {
    image: string;
}

export default class Avatar extends Block<Props> {

    static componentName = 'Avatar';

	protected render(): string {
		let avatar: string = personAvatar;
		if (typeof this.props.image !== 'undefined' && !isEmpty(this.props.image)) { 
			avatar = `https://ya-praktikum.tech/api/v2/resources/${this.props.image}`;
		}
		
		
        return `<div class="avatar">
		<div class="avatar__img-wrapper">
			<img class="avatar__img" src="${avatar}" alt="">
		</div>
		</div>`;
    }
}
