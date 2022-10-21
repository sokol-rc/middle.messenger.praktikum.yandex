import Block from 'core/Block';
import './avatar.css';
import personAvatar from '../../../assets/avatar.png';

interface Props {
    image: string;
}

export default class Avatar extends Block<Props> {

    static componentName = 'Avatar';

    protected render(): string {
        const avatar: string = this.props.image || personAvatar;

        return `<div class="avatar">
		<div class="avatar__img-wrapper">
			<img class="avatar__img" src="https://ya-praktikum.tech/api/v2/resources/${avatar}" alt="">
		</div>
		</div>`;
    }
}
