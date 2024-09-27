export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
        return "Email is required."
    }

    if (!emailRegex.test(email)) {
        return "Please enter a valid email address."
    }

    return true
}

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/

    // Check if the username length is within the specified range
    if (username.length < 4) {
        return "character in username need to be 4-50 letters"
    }
    if (username.length > 50) {
        return "character in username need to be 4-50 letters"
    }

    // Check if the username matches the regex pattern
    if (!usernameRegex.test(username)) {
        return "Username can only be English language."
    }

    return true
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/

    // Check if the password length is within the specified range
    if (password.length < 8) {
        return "Password must be at least 8 characters long."
    }
    if (password.length > 50) {
        return "Password cannot exceed 50 characters."
    }

    // Check if the password contains at least one lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
        return "Password must contain at least one lowercase letter."
    }

    // Check if the password contains at least one uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
        return "Password must contain at least one uppercase letter."
    }
    
    // Check if the password matches the regex pattern
    if (!passwordRegex.test(password)) {
        return "Password can only contain letters, numbers, and special characters (!@#$%^&*)."
    }

    return true
}