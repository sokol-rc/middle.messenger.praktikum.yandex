/* eslint-disable */
import Block from 'core/Block';
import './person-name.css';

export class PersonName extends Block {
	constructor(props:{ name: string}) { 
		super(props);
	}

    static componentName = 'PersonName';

    protected render(): string {
        return `<div class="person-name">
		<span class="person-name__text">${this.props.name}</span>
	</div>`;
    }
}
