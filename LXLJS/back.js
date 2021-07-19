var tmp = { "backdata": {}, "back": {}, "Invincible": [], "config": null };
var conf = { "BACK开关": true, "保存/读取死亡记录": true, "每人最大存入数量": 5, "返回死亡点后无敌时间": 5 };

function ST(pl, text) {
    pl.tell('§l§d[BACK] ' + text + '');
}

function tp(pl, x, y, z, dimid) {
    pl.teleport(new FloatPos(x, y, z, dimid));
    ST(pl, '§b传送到暴毙点成功');
}

function save() {
    file.writeTo('.\\plugins\\Timiya\\data\\deathlist.json', JSON.stringify(tmp["backdata"], null, 2));
}

function back(en, hurtname) {
    var pl = en.toPlayer();
    if (pl != null) {
        var time = new Date().getTime();
        if (tmp["backdata"][pl.name] == null)
            tmp["backdata"][pl.name] = [];
        tmp["backdata"][pl.name].unshift({ "time": time, "x": JSON.parse(pl.pos.x.toFixed(1)), "y": JSON.parse(pl.pos.y.toFixed(1)), "z": JSON.parse(pl.pos.z.toFixed(1)), "dimid": pl.pos.dimid });
        if (tmp["backdata"][pl.name].length > tmp["config"]["每人最大存入数量"] - 1) {
            var num = tmp["backdata"][pl.name].length - tmp["config"]["每人最大存入数量"] + 1;
            for (var i = 1; i < num; i++) {
                tmp["backdata"][pl.name].pop();
            }
        }
        if (tmp["config"]["保存/读取死亡记录"] == true)
            save();
        var dim;
        if (tmp["backdata"][pl.name][0].dimid == 0)
            dim = "主世界";
        else if (tmp["backdata"][pl.name][0].dimid == 1)
            dim = "地狱";
        else if (tmp["backdata"][pl.name][0].dimid == 2)
            dim = "末地";
        if (tmp["config"]["BACK开关"] == true)
            ST(pl, '§b你暴毙了,你的暴毙点:' + dim + ' ' + tmp["backdata"][pl.name][0].x + ' ' + tmp["backdata"][pl.name][0].y + ' ' + tmp["backdata"][pl.name][0].z + ',时间:' + new Date(tmp["backdata"][pl.name][0].time).toLocaleString() + ' 使用/back可返回死亡地点');
        else
            ST(pl, '§b你暴毙了,你的暴毙点:' + dim + ' ' + tmp["backdata"][pl.name][0].x + ' ' + tmp["backdata"][pl.name][0].y + ' ' + tmp["backdata"][pl.name][0].z + ',时间:' + new Date(tmp["backdata"][pl.name][0].time).toLocaleString() + '');
    }
}

function backto(pl, cmd) {
    var dim;
    if (tmp["backdata"][pl.name][0].dimid == 0)
        dim = "主世界";
    else if (tmp["backdata"][pl.name][0].dimid == 1)
        dim = "地狱";
    else if (tmp["backdata"][pl.name][0].dimid == 2)
        dim = "末地";
    pl.sendModalForm('§l§dBACK', '§l§b你最近的暴毙信息:' + dim + ' ' + tmp["backdata"][pl.name][0].x + ' ' + tmp["backdata"][pl.name][0].y + ' ' + tmp["backdata"][pl.name][0].z + ',时间:' + new Date(tmp["backdata"][pl.name][0].time).toLocaleString() + '', '前往暴毙点', '退出界面', function (pl, selected) {
        if (selected == 1) {
            tp(pl, tmp["backdata"][pl.name][0].x, tmp["backdata"][pl.name][0].y, tmp["backdata"][pl.name][0].z, tmp["backdata"][pl.name][0].dimid);
            log('x' + tmp["backdata"][pl.name][0].x + 'y' + tmp["backdata"][pl.name][0].y + 'z' + tmp["backdata"][pl.name][0].z + 'dimid' + tmp["backdata"][pl.name][0].dimid)
            tmp["Invincible"].push(pl.name);
            setTimeout(function () {
                for (var i in tmp["Invincible"]) {
                    if (tmp["Invincible"][i] == pl.name) {
                        delete tmp["Invincible"][i];
                        break;
                    }
                }
            }, tmp["config"]["返回死亡点后无敌时间"] * 1000);
        } else if (selected == 0) {
            ST(pl, '§b已关闭表单');
        } else if (selected == null) {
            ST(pl, '§b已放弃表单');
        }
    })
}

function death(pl, cmd) {
    var newform = mc.newCustomForm();
    newform.setTitle("§l§dDEATHLIST");
    if (tmp["backdata"][pl.name] == null)
        tmp["backdata"][pl.name] = [];
    for (var i = 0; i < tmp["backdata"][pl.name].length; i++) {
        var time = new Date(tmp["backdata"][pl.name][i].time).toLocaleString();
        var dim;
        if (tmp["backdata"][pl.name][i].dimid == 0)
            dim = "主世界";
        else if (tmp["backdata"][pl.name][i].dimid == 1)
            dim = "地狱";
        else if (tmp["backdata"][pl.name][i].dimid == 2)
            dim = "末地";
        var pos = dim + ' ' + tmp["backdata"][pl.name][i]["x"] + ' ' + tmp["backdata"][pl.name][i]["y"] + ' ' + tmp["backdata"][pl.name][i]["z"];
        var info = '' + (i + 1) + '/' + tmp["config"]["每人最大存入数量"] + ': 地点:' + pos + ' 时间:' + time + '';
        newform.addLabel(info);
    }
    if (JSON.stringify(tmp["backdata"][pl.name]) != '[]')
        pl.sendForm(newform, function () { });
    else
        ST(pl, '§b你没有死亡记录');
}

function hurt(en, lay, da) {
    if (en.type == 'entity.player.name') {
        var pl = mc.getPlayer(en.name);
        for (var i in tmp["Invincible"]) {
            if (tmp["Invincible"][i] == pl.name)
                return false;
        }
    }
}

function read() {
    file.createDir('.\\plugins');
    file.createDir('.\\plugins\\Timiya');
    file.createDir('.\\plugins\\Timiya\\config');
    file.createDir('.\\plugins\\Timiya\\data');
    var co = file.readFrom('.\\plugins\\Timiya\\config\\back.json');
    if (co == null) {
        file.writeTo('.\\plugins\\Timiya\\config\\back.json', JSON.stringify(conf, null, 2));
        co = JSON.stringify(conf);
        log('[INFO][BACK] 已补全配置文件');
    }
    tmp["config"] = JSON.parse(co);
    log('[INFO][BACK] 配置文件已读取');
    if (tmp["config"]["保存/读取死亡记录"] == true) {
        var data = file.readFrom('.\\plugins\\Timiya\\data\\deathlist.json');
        if (data == null) {
            save();
            data = "{}"
            log('[INFO][BACK] 已补全数据文件');
        }
        tmp["backdata"] = JSON.parse(data);
        log('[INFO][BACK] 数据文件已读取');
    }
}

function load() {
    read();
    mc.listen("onMobDie", back);
    mc.listen("onMobHurt", hurt);
    if (tmp["config"].BACK开关 == true) {
        mc.regPlayerCmd('back', '回到上一次暴毙点', backto, 0);
        mc.regPlayerCmd('death', '查询死亡记录', death, 0);
    }
    log('[INFO] BACK LOADED! EDITION: 1.0')
}
load();