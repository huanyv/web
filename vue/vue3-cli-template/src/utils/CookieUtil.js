const CookieUtil = {
    setCookie: (key, value, expire) => {
        const d = new Date();
        d.setDate(d.getDate() + expire);
        document.cookie = `${key}=${value};expires=${d.toUTCString()}`
    },
    
    // 获取cookie
    getCookie: (key) => {
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
    },
    
    // 删除cookie
    delCookie: (key) => {
        document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
    },
}

export default CookieUtil