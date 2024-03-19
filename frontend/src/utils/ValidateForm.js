export const validateForm = (formData, isSignup) => {
    const errors = {};

    if (isSignup) {
        // Check for signup-specific validation
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        }
    }

    // Common validation for both signup and login
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    }

    return errors;
};