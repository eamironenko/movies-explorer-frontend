import React from "react";

export function useForm(callback, validate, capture) {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({email:''});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]:value});
        setErrors(validate(values,capture))
    };

    React.useEffect(() => {
        Object.keys(errors).length === 0 ? setIsValid(true) : setIsValid(false);
    }, [errors]);

    const handleSubmit = React.useCallback(
        (newValues ={}, newErrors={}, newIsValid=false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    )

    return {values, handleChange, errors, isValid, handleSubmit, setIsValid};
}
export default useForm;