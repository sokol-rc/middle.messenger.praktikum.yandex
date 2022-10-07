type FormValues = {
    [key: string]: string;
};

const getFormValues = (inputsRefs: Array<ValidateInput>): FormValues => {
    const formValues: FormValues = {};

    inputsRefs.forEach((inputRef) => {
        const inputProps: ValidateInput =
            inputRef.refs.inputInnerRef.getProps();

        if (inputProps.value !== '' && inputProps.type !== 'checkbox') {
            formValues[inputProps.name] = inputProps.value;
        }
    });

    return formValues;
};
export default getFormValues;
