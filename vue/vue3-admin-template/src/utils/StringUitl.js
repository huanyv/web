
const StringUtil = {
    checkUsername: username => /^[A-Za-z][a-zA-Z0-9]{3,10}$/.test(username),
    checkPassword: password => /^[a-zA-Z0-9]{5,15}$/.test(password),
}





export default StringUtil