function command(pl, cmd) {
    if (pl.inAir == true) {
        let position = je.XYZ.x + ' ' + je.XYZ.y + ' ' + je.XYZ.z;
        runcmdEx('execute "' + pl.name + '" ~~~ tp 0 1000 0');
        setTimeout(function () { runcmdEx('execute "' + pl.name + '" ~~~ tp ' + position); pl.tell('§l§b区块已重新加载！'); }, 300)
            return false;
    } else {
        runcmd('w "' + pl.name + '" §l§c你无法在悬空状态下进行重载区块！');
        return false;
    }
}
mc.regPlayerCmd('rc', '重新加载区块',command)
log('[INFO][Reload_Chunk] 加载成功,使用方法:/rc')