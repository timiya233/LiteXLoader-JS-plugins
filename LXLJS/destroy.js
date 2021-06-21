mc.listen("onServerStarted", load);
function destroy(pl, bl) {
    let shu = pl.getScore('phbf') + 1;
    pl.setScore('phbf', shu);
    pl.setScore('phb', shu);
    return true;
};
function left(pl) {
    mc.runcmdEx('scoreboard players reset * phb');
    mc.runcmdEx('execute @a ~ ~ ~ scoreboard players operation @s phb = @s phbf');
};
function tongbu(pl) {
    mc.runcmdEx('execute @a ~ ~ ~ scoreboard players operation @s phb = @s phbf');
};
function load() {
    let haveq = file.read('plugins\\destroy\\configure.json');
    if (haveq == null) {
        file.createDir('.\\plugins\\destroy');
        let normal = { "显示在哪": "sidebar" };
        let Json = JSON.stringify(normal, null, "\t");
        mc.runcmdEx('scoreboard objectives add phb dummy §l§b破坏榜');
        mc.runcmdEx('scoreboard objectives add phbf dummy');
        file.write('plugins\\destroy\\configure.json', Json);
        log('第一次加载破坏榜插件，配置文件已生成置.\\plugins\\destroy\\configure.json')
    }
    let open = file.read('plugins\\destroy\\configure.json');
    let jsonopen = JSON.parse(open);
    let info = jsonopen["显示在哪"];
    mc.runcmdEx('scoreboard objectives setdisplay ' + info + ' phb');
    mc.listen('onLeft', left);
    mc.listen('onJoin', tongbu);
    mc.listen("onDestroyBlock", destroy);
    log('[破坏榜][INFO] 监听器设置完成！');
};