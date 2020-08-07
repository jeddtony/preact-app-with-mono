export const setCode = (code)=> {
    localStorage.setItem('MONO_CODE', code);
}

export const getCode = ()=> {
    return localStorage.getItem('MONO_CODE');
}

export const setId = (id) => {
    localStorage.setItem('MONO_USER_ID', id);
}

export const getId = () => {
    return localStorage.getItem('MONO_USER_ID');
}