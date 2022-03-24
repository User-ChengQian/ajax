function fun(id, data) {
    var st = document.getElementById(id).innerHTML
    var rg = /{{\s*([a-zA-Z]+)\s*}}/
    var temp = null
    while (temp = rg.exec(st)) {
        st = st.replace(temp[0], data[temp[1]])
    }
    return st
}