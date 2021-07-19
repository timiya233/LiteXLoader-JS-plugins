function healths() {
    var list = mc.getOnlinePlayers();
    if (list != []) {
        try {
            for (var i = 0; i < list.length; i++) {
                mc.runcmdEx('scoreboard players set "' + list[i].name + '" syhealth ' + list[i].health);
            }
        } catch (error) { }
    }
};

mc.listen("onServerStarted", function () {
    var have = file.readFrom('.\\plugins\\health\\health.txt');
    if (have == null) {
        var jz = '加载完成';
        file.createDir('.\\plugins\\health');
        file.writeTo('.\\plugins\\health\\health.txt', jz);
        mc.runcmdEx('scoreboard objectives add syhealth dummy §l§chealth');
        mc.runcmdEx('scoreboard objectives setdisplay belowname syhealth');
        log('[health]首次加载血量显示插件 前置记分板已创建');
    }
    setInterval("healths()", 500);
    log('[health]血量插件加载成功');
});