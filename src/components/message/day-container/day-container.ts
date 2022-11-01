import Block from 'core/Block';

export default class DayContainer extends Block<{}> {
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
