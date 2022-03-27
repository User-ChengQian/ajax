function fun(options) {
    //获取数据
    var dt = getst(options.data)
        //创建xhr对象
    console.log(dt);
    var xhr = new XMLHttpRequest()
        //进行判断是get还是post
    if (options.method.toUpperCase() === 'POST') {
        xhr.open('post', options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(dt)
    } else if (options.method.toUpperCase() === 'GET') {
        xhr.open('get', options.url + '?' + dt)
            //get利用查询字符串的形式获取带参的get请求
        xhr.send()
    }
    //添加事件监听
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = JSON.parse(xhr.responseText)
            console.log(res);
        }
    }
}
//获取数据函数
function getst(data) {
    //将对象转为数组,再转为&连接的字符串
    var arr = []
    for (k in data) {
        //k属性名,data[k]属性值
        var st = k + "=" + data[k]
        arr.push(st)
    }
    return arr.join("&")
}