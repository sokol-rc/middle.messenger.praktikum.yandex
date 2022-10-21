import Block from 'core/Block';
import './loader.css';

type Props = {
    isLoading: boolean;
};

export default class Loader extends Block<Props> {
    static componentName = 'Loader';

    protected render(): string {
        if (!this.props.isLoading) {
            return '<div></div>';
        }
        return `<span class="loader-line-wrapper" role="progressbar"><span class="loader-line1"></span><span class="loader-line2"></span></span>
		
		`;
    }
	// protected render(): string {
    //     if (!this.props.isLoading()) {
    //         return '<div></div>';
    //     }
    //     return `<div class="loader-wrapper">
	// 	<div class="loader">Loading...</div>
	// 	</div>
		
	// 	`;
    // }
}
