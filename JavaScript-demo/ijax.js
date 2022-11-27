class ijax {

    baseUrl;

    get(url, fn, type) {
        if (type == undefined || type == '') {
            type = "json";
        }
        this.request({
            url: url,
            method: "GET",
            dataType: type,
            success: fn
        })
    }

    post(url, data, fn, type) {
        if (type == undefined || type == '') {
            type = "json";
        }
        this.request({
            url: url,
            method: "POST",
            data: data,
            dataType: type,
            success: fn
        })
    }

    request(requestData) {
        var xhr = new XMLHttpRequest();
        xhr.open(requestData.method, this.baseUrl + requestData.url, requestData.async);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 300) {
                if (requestData.dataType.toLowerCase() == "json") {
                    requestData.success(JSON.parse(xhr.responseText));
                } else if (requestData.dataType.toLowerCase() == "text") {
                    requestData.success(xhr.responseText);
                } else if (requestData.dataType.toLowerCase() == "xml") {
                    requestData.success(xhr.responseXML)
                }
            }
        }

        if (requestData.method.toLowerCase() == "get") {
            xhr.send()
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(requestData.daa)
        }

    }

    static create(baseUrl) {
        let ajax = new ijax();
        if (baseUrl === undefined) {
            baseUrl = '';
        }
        ajax.baseUrl = baseUrl;
        return ajax;
    }
}