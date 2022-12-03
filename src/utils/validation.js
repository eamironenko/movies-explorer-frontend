export default function validate(values, capture) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email должен быть заполнен';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email введен некоректно';
    }
    if (capture!=="ep") {
        if (!values.password) {
            errors.password = 'Пароль должен быть заполнен';
        } else if (values.password.length < 2) {
            errors.password = 'Пароль должен быть более 2 знаков';
        } else if (values.password.length > 30) {
            errors.password = 'Пароль должен быть не более 30 знаков';
        }
    }
    if (capture!=="lg") {
        if (!values.name) {
            errors.name = 'Имя должено быть заполнено';
        } else if (values.name.length < 2) {
            errors.name = 'Имя должено быть более 2 знаков';
        } else if (values.name.lenпth > 30) {
            errors.name = 'Имя должено быть не более 30 знаков';
        }
    }
    return errors;
}