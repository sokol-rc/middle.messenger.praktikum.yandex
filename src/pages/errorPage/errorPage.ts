/* eslint-disable */
import Block from 'core/Block';
interface InputProps {
    errorNumber: number;
}

export class ErrorPage extends Block {
    constructor({ errorNumber }: InputProps) {
        super({ errorNumber });
    }

    render() {
        return `{{{Error 
					value='${this.props.errorNumber}'
				}}}`;
    }
}
