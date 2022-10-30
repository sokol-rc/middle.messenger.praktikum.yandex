import Block from 'core/Block';
import './person-name.css';

type Props = {
    name: string;
};

export default class PersonName extends Block<Props> {
    static componentName = 'PersonName';

    protected render(): string {
        return `<div class="person-name">
		<span class="person-name__text">${this.props.name}</span>
	</div>`;
    }
}
