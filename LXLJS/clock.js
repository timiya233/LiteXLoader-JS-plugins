load();

function LoadName(pl) {
    setTimeout(function () {
        pl.tell('§l§a=============================================\n§d你好呀，欢迎进入服务器,获取钟请输入/clock哦\nHello, welcome to the server. Please input /clock to get the clock\n§a=============================================');
    }, 25000);
}
function command(pl, comm) {
    mc.runcmdEx('give "'+pl.name+'" clock');
    pl.tell('§l§d[Clock] §e你的钟已发放!');
    return false;
}

function load() {
    mc.listen("onJoin",LoadName)
    mc.regPlayerCmd('clock','§l§e获得钟&Get clock',command,0)
}