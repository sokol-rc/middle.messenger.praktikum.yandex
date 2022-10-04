/* eslint-disable */
import Block from 'core/Block';


interface DayContainerProps {
    day: string;

}

export class DayContainer extends Block {
    constructor(props: DayContainerProps) {
        super(props);
       
    }
    static componentName = 'DayContainer';

	protected render(): string {

		return `
		<div class="bubbles-day-section">
			<div class="day-title">{{day}}</div>
			<div data-cont="1"></div>
		</div>
		`;
    }
}
