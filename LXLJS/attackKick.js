var tmp = {}
function GoKick(player, entity) {
    var pl2 = mc.getPlayer(entity.name);
	if (pl2 != null && player.isOP() == true && pl2.type == 'entity.player.name') {
		if (tmp[player.name] == true) {
			let info = pl2.kick('服务器拒绝了你的数据包！');
			player.tell('§d已踢出§e '+pl2.name+' §d返回值§a '+info)
		}
	}
}

function kickHand(pl, cmd) {
    if (tmp[pl.name] == null) {
        tmp[pl.name] = true;
	    pl.tell('§d踢人模式已开启！攻击即可让对方下线!')
	} else if (tmp[pl.name] == true) {
	    delete tmp[pl.name];
		pl.tell('§a踢人模式已关闭!');
	}
}

mc.listen("onAttack",GoKick);
mc.regPlayerCmd('hkick','进入或退出踢人模式',kickHand,1)
log('[INFO]攻击踢人加载成功！')