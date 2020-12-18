export const login = () => {
    return {
        type : "LOGIN"
    }
}

export const setUserId = (userId : string) => {
    return {
        type : "USER",
        payload: userId
    }
}

export const setRole = (role : string) => {
    return {
        type : "ROLE",
        payload: role
    }
}

export const setUsername = (username : string) => {
    return {
        type : "USERNAME",
        payload: username
    }
}

export const setName = (name : string) => {
    return {
        type : "NAME",
        payload: name
    }
}

export const logout = () => {
    return {
        type : "LOGOUT"
    }
}