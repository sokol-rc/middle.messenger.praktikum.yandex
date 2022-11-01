export type BlurFocusHandler = (input: ValidateInput) => void;

export type ValidationHandlers = {
	validateOnBlur: BlurFocusHandler;
	validateOnFocus: BlurFocusHandler;
}
