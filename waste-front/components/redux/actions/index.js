export const login = () => {
    return {
        type : "LOGIN"
    }
}

export const setUserId = (userId) => {
    return {
        type : "USER",
        payload: userId
    }
}

export const setRole = (role) => {
    return {
        type : "ROLE",
        payload: role
    }
}

export const setUsername = (username) => {
    return {
        type : "USERNAME",
        payload: username
    }
}

export const logout = () => {
    return {
        type : "LOGOUT"
    }
}