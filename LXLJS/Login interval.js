mc.listen('onJoin', function (pl) {
    var lg = file.read('plugins/Login/Logininterval.json');
    var lgj = JSON.parse(lg);
    var i;
    var ii = lgj.lgt.sz.length - 1;
    var havaplayer = false;
    for (i in lgj.lgt.sz) {
        if (i <= ii && lgj.lgt.sz[i].id == pl.name) {
            var d = new Date();
            var logint = d.getTime();
            var logout = lgj.lgt.sz[i].logout
            var interval = logint - logout
            let days = Math.floor(interval / (24 * 3600 * 1000));
            let leavel = interval % (24 * 3600 * 1000);
            let hours = Math.floor(leavel / (3600 * 1000));
            let leavel2 = leavel % (3600 * 1000);
            let minutes = Math.floor(leavel2 / (60 * 1000));
            setTimeout(function () {
                log('时隔' + days + '天' + hours + '时' + minutes + '分 玩家' + pl.name + '再次进入了服务器');
                var lgc = '§l§a欢迎进入服务器，现在距离你上次登出服务器§e' + days + '天' + hours + '时' + minutes + '分';
                pl.tell(lgc);
            }, 35000);
            havaplayer = true;
        } else if (i == ii && lgj.lgt.sz[i].id != pl.name && havaplayer == false) {
            var xr = '},{"id":' + '"' + pl.name + '"' + ',"logout":0}]}}'
            var xrz = lg.replace("}]}}", xr);
            file.write('plugins/Login/Logininterval.json', xrz);
            setTimeout(function () {
                log('玩家' + pl.name + '首次进入服务器')
                var ts = '§l§a你是首次进入本服务器，§e祝你游戏愉快';
                pl.tell(ts)
            }, 35000);
        }
    }
});
mc.listen('onLeft', function (pl) {
    var lg = file.read('plugins/Login/Logininterval.json');
    var lgj = JSON.parse(lg);
    var i;
    var ii = lgj.lgt.sz.length - 1;
    for (i in lgj.lgt.sz) {
        if (i <= ii && lgj.lgt.sz[i].id == pl.name) {
            var d = new Date();
            var logout = d.getTime();
            lgj.lgt.sz[i].logout = logout
            var jz = JSON.stringify(lgj);
            file.write('plugins/Login/Logininterval.json', jz);
        }
    }
});
mc.listen('onServerStarted', function () {
    var have = file.read('plugins/Login/Logininterval.json');
    if (have == null) {
        var lg = { "lgt": { "sz": [{ "id": "player", "logout": 0 }] } }
        var jz = JSON.stringify(lg);
        file.createDir('.\\plugins\\Login');
        file.write('plugins/Login/Logininterval.json', jz);
        log('首次加载Login interval插件 数据json文件已保存于BDS根目录/Logininterval.json')
    }
    log('Login interval >> 登入时间间隔插件加载完成 | by siyue')
})