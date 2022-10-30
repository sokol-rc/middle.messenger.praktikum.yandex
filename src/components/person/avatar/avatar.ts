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
        const { image } = this.props;
		let avatar: string = personAvatar;
        if (
            typeof image !== 'undefined' &&
            !isEmpty(image) &&
			image !== 'null' &&
			image !== null
		) {
            avatar = `https://ya-praktikum.tech/api/v2/resources/${image}`;
        }

        return `<div class="avatar">
		<div class="avatar__img-wrapper">
			<img class="avatar__img" src="${avatar}" alt="">
		</div>
		</div>`;
    }
}
