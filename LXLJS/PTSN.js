var tmp = {}
function O(e) {
	mc.sendCmdOutput('[PTSN INFO] ' +e)
}
mc.listen("onJoin", function (pl) {
	if (tmp[pl.name] == null) {
	    tmp[pl.name] = 1
	} else {
		tmp[pl.name] += 1
	}
	if (tmp[pl.name] == 2) {
		let r = pl.kick('警告！出现了一个分身bug！');
		if (r == true) {
			O('"'+pl.name+'" 试图卡一个分身bug,但是被拒绝了');
		}
	}
});
mc.listen('onLeft', function (pl) {
	tmp[pl.name] -= 1;
});
log('PTSN 加载成功!版本:0.2');