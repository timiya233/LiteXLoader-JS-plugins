load();
let haveq = file.read('plugins\\destroy\\configure.json');
if (haveq == null) {
    file.createDir('.\\plugins\\destroy');
	let normal = { "显示在哪": "sidebar" };
	let Json = JSON.stringify(normal, null, "\t");
	runcmdEx('scoreboard objectives add phb dummy §l§b破坏榜');
	runcmdEx('scoreboard objectives add phbf dummy');
	file.write('plugins\\destroy\\configure.json', Json);
	log('第一次加载破坏榜插件，配置文件已生成置.\\plugins\\destroy\\configure.json')
};
let open = file.read('plugins\\destroy\\configure.json');
let jsonopen = JSON.parse(open);
let info = jsonopen["显示在哪"];
runcmd('scoreboard objectives setdisplay '+info+' phb');
function destroy(pl, bl) {
    let shu = pl.getScore('phbf') + 1;
    pl.setScore('phbf', shu)
    pl.setScore('phb', shu)
    return true
};
function left(pl) {
    pl.setScore('phb',null);
};
function tongbu(pl) {
    let shu = pl.getScore('phbf');
    pl.setScore('phb',shu)
};
function load() {
    mc.listen('onPlayerLeft', left);
    mc.listen('onJoin', tongbu);
    mc.listen('onDestroyBlock', destroy);
    log('[破坏榜][INFO] 监听器设置完成！');
};
log('[破坏榜][INFO] 破坏榜加载成功！插件作者:提米吖');