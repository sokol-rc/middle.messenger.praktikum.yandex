import Block from 'core/Block';

interface Props {
    errorNumber: number;
}

export default class ErrorPage extends Block<Props> {

    render() {
        return `{{{Error 
					value='${this.props.errorNumber}'
				}}}`;
    }
}
