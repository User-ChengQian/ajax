$(function() {
    function getlist() {
        $.get('http://www.liulongbin.top:3006/api/cmtlist', function(res) {
            console.log(res);
            if (res.status !== 200) return alert("获取失败")
            var rows = []
            $.each(res.data, function(i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">' + item.username + '</span>' + item.content + '</li>'
                rows.push(str)
            })
            $('#cmt-list').empty().append(rows.join(""))
        })
    }
    getlist()
        //进行发送数据
    $("#formAddCmt").on('submit', function(e) {
        e.preventDefault()
        var msg = $(this).serialize()
        console.log(msg);
        $.post("http://www.liulongbin.top:3006/api/addcmt", msg, function(res) {
            if (res.status !== 201) return alert('发送失败')
            getlist()
                //用dom清空表单中的内容
            $('#formAddCmt')[0].reset()
        })
    })
})