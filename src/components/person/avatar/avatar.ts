/* eslint-disable */
import Block from 'core/Block';
import './avatar.css';
import personAvatar from '../../../assets/avatar.png';

interface AvatarProps {
	image?: string;
}

export class Avatar extends Block {
    constructor({ ...props }: AvatarProps) {
		super({ ...props });
    }
    static componentName = 'Avatar';

	protected render(): string {
		let avatar: string = this.props.image || personAvatar;

        return `<div class="avatar">
		<div class="avatar__img-wrapper">
			<img class="avatar__img" src="${avatar}" alt="">
		</div>
		</div>`;
    }
}
