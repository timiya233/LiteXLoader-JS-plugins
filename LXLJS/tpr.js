//加载部分
function load() {
    mc.regPlayerCmd('tpr','随机传送',tpr,0)
    log('[INFO][tpr]tpr装载成功！');
    log('[INFO][tpr]作者 提米吖');
};
function tpr(pl, comm) {
    var zb = fu(pl).split(",");
    mc.runcmdEx('execute "' + pl.name + '" ~~~ tp @s '+zb[0]+' '+zb[1]+' '+zb[2]);
    mc.runcmdEx('effect "' + pl.name + '" resistance 30 10 true');
    mc.runcmdEx('effect "' + pl.name + '" slow_falling 30 1 true');
    mc.runcmdEx('effect "' + pl.name + '" Fire_Resistance 30 1 true');
    mc.runcmdEx('effect "' + pl.name + '" Water_Breathing 30 1 true');
    pl.tell('§l§a[TPR] §e已将您传送置§e'+zb[0]+','+zb[1]+','+zb[2]);
    return false;
};
//运算部分
function rando(pl) {
    var x = Math.floor(Math.random() * 10000);
    if (pl.pos.dimid == 0) {
        var y = 120;
    } else if (pl.pos.dimid == 1) {
        var y = 90;
    } else if (pl.pos.dimid >= 1) {
        var y = 150;
    };
    var z = Math.floor(Math.random() * 10000);
    return x+','+y+','+z;
};
function fu(pl) {
    var p = Math.floor(Math.random() * 4);
    var zhi = rando(pl).split(",");
    if (p == 0) {
        return zhi[0]+','+zhi[1]+','+zhi[2];
    }
    if (p == 1) {
        return -zhi[0]+','+zhi[1]+',-'+zhi[2];
    }
    if (p == 2) {
        return zhi[0]+','+zhi[1]+',-'+zhi[2];
    }
    if (p == 3) {
        return -zhi[0]+','+zhi[1]+','+zhi[2];
    }
};
load();