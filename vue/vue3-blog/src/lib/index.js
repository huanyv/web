
import { ElMessage } from "element-plus";

export const message = (type, msg) => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type,
    });
}

export const checkUsername = (username) => {
    return /^[A-Za-z][a-zA-Z0-9]{3,10}$/.test(username);
}

export const checkPassword = (password) => {
    return /^[A-Za-z][a-zA-Z0-9]{5,15}$/.test(password);
}

// 设置cookie
export const setCookie = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};

// 获取cookie
export const getCookie = (key) => {
    const cookieStr = unescape(document.cookie);
       const arr = cookieStr.split('; ');
       let cookieValue = '';
       for (let i = 0; i < arr.length; i++) {
           const temp = arr[i].split('=');
           if (temp[0] === key) {
               cookieValue = temp[1];
               break
       }
    }
    return cookieValue
};

// 删除cookie
export const delCookie = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};