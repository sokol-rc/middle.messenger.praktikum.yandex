type FormValues = {
    [key: string]: string;
};

const getFormValues = (inputsArray: Array<ValidateInput>): FormValues => {
    const formValues: FormValues = {};
	inputsArray.forEach((input) => {
		const inputProps: ValidateInput = input.refs.inputInnerRef.getProps();
		
        if (inputProps.value !== '' && inputProps.type !== 'checkbox') {
			formValues[inputProps.name] = inputProps.value;
        }
    });

    return formValues;
};
export default getFormValues;
