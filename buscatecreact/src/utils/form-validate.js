export const matriculaValidate = {
    required: {
        value: true,
        message: "Ingresa tu matricula"
    },
    pattern: {
        value: /^A\d{8}$/i,
        message: "La matricula no es valida, intenta otra vez"
    },
};


export const emailValidate = {
    required: {
        value: true,
        message: "Please enter an email address",
    },
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email address is not valid",
    },
};

export const passwordValidate = {
    required: {
        value: true,
        message: "Please enter password",
    },
    minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
    },
};