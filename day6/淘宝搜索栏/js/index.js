$(function() {
    //防抖操作
    var timer = null;
    // 定义全局缓存对象
    var cacheObj = {}

    function fd(txt) {
        timer = setTimeout(function() {
            getlist(txt)
        }, 500)
    }
    $('.ipt').on('keyup', function() {
        //清空定时器
        clearTimeout(timer)
            //获取用户输入的内容
        var txt = $(this).val().trim()
            // console.log(txt);
            //判断用户内容是否为空,用户可能进行退格操作
        if (txt.length <= 0) {
            return $('#suggestlist').empty().hide()
        }
        var num = null;
        //如果不为空则获取建议列表
        // 如果缓存中有这个txt这个值则不用进行服务器访问直接渲染
        if (cacheObj[txt]) {
            return reload(cacheObj[txt])
        }
        fd(txt)
    })

    //建议列表获取
    function getlist(txt) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + txt,
            dataType: 'jsonp',
            success: function(res) {
                console.log(res);
                reload(res)
            }
        })
    }
    // 进行渲染
    function reload(res) {
        if (res.result <= 0) {
            return $('#suggestlist').empty().hide()
                //如果无建议列表直接return不进行渲染
        }
        //使用模板引擎
        var intxt = template('templateSuggest', res)
        $('#suggestlist').html(intxt).show()
            // 获取用户输入的内容作为键
        var k = $('.ipt').val().trim()
            // 2将需要的数组作为值,进行缓存
        cacheObj[k] = res
    }
    //发抖操作,减少服务器访问次数
})