var cps = {};
var tmp = {};
var PATH = '.\\plugins\\cps';
var CONFIGURE = 'plugins\\cps\\configure.json';
var DISPLAY = 'plugins\\cps\\display.json';
var tmpdisplay;
var AntiCpsCheat;
var number
var Timer
//监听器
function cmd(e) {
    READ('Console');
}
function command(pl,cmd) {
    READ('op');
}
function command1(pl,cmd) {
    if (tmpdisplay[pl.name] == true) {
        tmpdisplay[pl.name] = false;
        save();
        pl.tell("§d已关闭CPS显示",0);
    } else if (tmpdisplay[pl.name] == false) {
        tmpdisplay[pl.name] = true;
        save();
        pl.tell("§d已开启CPS显示",0);
    }
}
function Attack(pl,en) {
    if (cps[pl.name] == null) {
        cps[pl.name] = 1;
        return true;
    } else {
        cps[pl.name] += 1;
        return true;
    }
}
function destroy(pl,bl) {
    if (cps[pl.name] == null) {
        cps[pl.name] = 1;
        return true;
    } else {
        cps[pl.name] += 1;
        return true;
    }
}
function ues(pl,it) {
    if (cps[pl.name] == null) {
        cps[pl.name] = 1;
        return true;
    } else {
        cps[pl.name] += 1;
        return true;
    }
}

function cpss() {
    var list = mc.getOnlinePlayers();
    if (list != null) {
        for (var i in list) {
            var aaa = tmpdisplay[list[i].name];
            if (aaa == null) {
                tmpdisplay[list[i].name] = true;
                save();
                aaa = true;
            }
            if (aaa == true && cps[list[i].name] != null) {
                if (AntiCpsCheat == true)
                    CPSPAN(list[i], cps[list[i].name]);
                list[i].tell(cps[list[i].name] + ' CPS',5);
                delete cps[list[i].name];
            } else if (cps[list[i].name] != null) {
                if (AntiCpsCheat == true)
                    CPSPAN(list[i], cps[list[i].name]);
                delete cps[list[i].name];
            }
        }
    }
}

function CPSPAN(player, cps) {
    try {
        if (player != null && cps != null) {
            if (cps > number - 1) {
                player.tell("§c请注意！你的CPS过高！如果不降低的话，将会将你踢出！",0);
                if (tmp[player.name] == null) {
                    tmp[player.name] = 1;
                } else {
                    tmp[player.name] += 1;
                }
            } else if (cps < number - 1) {
                tmp[player.name] = 0;
            }
            if (tmp[player.name] == Timer) {
                player.kick('CPS过高！');
                tmp[player.name] = 0;
            }
        }
    } catch (error) { }
};

//读取配置
function READ(type) {
    var ha = file.readFrom(DISPLAY);
    if (ha == null) {
        file.createDir(PATH);
        file.writeTo(DISPLAY, '{}');
        ha = file.readFrom(DISPLAY);
    };
    tmpdisplay = JSON.parse(ha);
    var havez = file.readFrom(CONFIGURE);
    if (havez == null) {
        file.createDir(PATH);
        let xie = { "防止使用连点器": true, "多少cps踢出玩家": "40", "超出多少秒之后踢出": "4" };
        let Json = JSON.stringify(xie, null, "\t");
        file.writeTo(CONFIGURE, Json);
        log('无法读取配置!自动将配置文件生成置' + PATH);
        havez = file.readFrom(CONFIGURE);
    };
    let jr = JSON.parse(havez);
    if (jr["防止使用连点器"] == true) {
        if (type == 'Console') {
            mc.sendCmdOutput('[INFO][CPS]防止使用连点器已开启!CPS超过 ' + jr["多少cps踢出玩家"] + ' 之后 ' + jr["超出多少秒之后踢出"] + ' 秒将会踢出该玩家');
        } else if (type == 'op') {
            runcmd('tellraw @a {"rawtext":[{"text":"§a[INFO][CPS]防止使用连点器已开启!CPS超过 ' + jr["多少cps踢出玩家"] + ' 之后 ' + jr["超出多少秒之后踢出"] + ' 秒将会踢出该玩家"}]}');
        }
        AntiCpsCheat = true;
        number = jr["多少cps踢出玩家"];
        Timer = jr["超出多少秒之后踢出"];
    } else {
        if (type == 'Console') {
            mc.sendCmdOutput('[INFO][CPS]防止使用连点器已关闭');
        } else if (type == 'op') {
            runcmd('tellraw @a {"rawtext":[{"text":"§a[INFO][CPS]防止使用连点器已关闭"}]}');
        }
        AntiCpsCheat = false;
    }
};
//写出玩家DISPLAY配置文件
function save() {
    let Json = JSON.stringify(tmpdisplay, null, "\t");
    file.writeTo(DISPLAY, Json);
    log('[CPS]已保存玩家设置');
}

//load开始
function load() {
    READ('Console');
    mc.listen("onAttack",Attack);
    mc.listen("onDestroyBlock",destroy);
    mc.listen("onUseItem",ues);
    mc.regConsoleCmd('cpsreload','开启或者关闭CPS显示',cmd)
    mc.regPlayerCmd('cps','开启或者关闭CPS显示',command,0);
    mc.regPlayerCmd('cpsreload','重新读取CPS配置',command1,0)
    setInterval("cpss()", 1000);
    log('[INFO][CPS]成功加载！版本：0.95')
}
mc.listen("onServerStarted",load);