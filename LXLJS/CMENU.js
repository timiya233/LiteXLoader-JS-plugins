var na = 'Clock';
var tmp = {};
load()

function beforeOnUseItem(pl, it) {
	if (tmp[pl.name] == null) {
		tmp[pl.name] = 0;
		if (it.name == na)
			menutest(pl, 'main');
	}
	setTimeout(function () { delete tmp[pl.name] }, 300);
}

function menu(pl, cmd) {
	menutest(pl, 'main');
}

function menutest(pl, type) {
	var data = forms(type, pl);
	var form = [];
	var image = [];
	if (data != null) {
		for (var i = 0; i < data.length; i++) {
			form.push(data[i].name);
			if (data[i].image != null)
				image.push(data[i].image);
			else
				image.push("");
		}
	} else {
		log('[CMENU][ERROR] 错误！请检查插件内配置是否正确？'); mc.runcmd('say CMENU启动错误！请向腐竹报告！');
	}
	pl.sendSimpleForm('§l§bMENU', '菜单如下：', form, image, function (pl, selected) {
		if (data[selected].type == 'form') {
			menutest(pl, data[selected].open);
			return false;
		} else if (data[selected].type == 'opform') {
			if (pl.isOP()) {
				menutest(pl, data[selected].open);
				return false;
			} else {
				pl.tell('你没有权限使用这个模块', 0);
				return false;
			}
		} else if (data[selected].type == 'comm') {
			pl.runcmd(data[selected].open);
			return false;
		} else if (data[selected].type == 'opcomm') {
			if (pl.isOP()) {
				pl.runcmd(data[selected].open);
				return false;
			} else {
				pl.tell('你没有权限使用这个命令', 0);
				return false;
			}
		}
	})
}

function forms(name, pl) {
	pl.tell('开始读取文件' + name + '.json', 5);
	let e = file.readFrom('.\\plugins\\CMENU\\' + name + '.json');
	if (e == null) pl.tell('读取文件失败,请检查文件是否存在', 5);
	pl.tell('读取文件 50%', 5);
	let form = JSON.parse(e);
	pl.tell('读取文件 100%', 5);
	if (form == null) {
		return null;
	} else if (form != null) {
		pl.tell('读取文件成功', 5);
		return form;
	}
}

function start() {
	var json = file.readFrom('.\\plugins\\CMENU\\main.json');
	if (json == null) {
		file.createDir('.\\plugins\\CMENU')
		let xie = [{ "name": "nooptest", "image": "https://z3.ax1x.com/2021/07/18/W31CBd.jpg", "open": "/me test", "type": "comm" }, { "name": "optest", "image": "https://z3.ax1x.com/2021/07/18/W31CBd.jpg", "open": "/me hello world", "type": "opcomm" }, { "name": "nooptestform", "image": "https://z3.ax1x.com/2021/07/18/W31CBd.jpg", "open": "hhh", "type": "form" }, { "name": "optestform", "open": "ooo", "type": "opform" }];
		let Json = JSON.stringify(xie, null, "\t");
		file.writeTo('.\\plugins\\CMENU\\main.json', Json);
		let xi = [{ "name": "optest", "image": "https://z3.ax1x.com/2021/07/18/W31CBd.jpg", "open": "/me hello", "type": "opcomm" }];
		let Jso = JSON.stringify(xi, null, "\t");
		file.writeTo('.\\plugins\\CMENU\\hhh.json', Jso);
		let x = [{ "name": "test", "image": "https://z3.ax1x.com/2021/07/18/W31CBd.jpg", "open": "/me hello world", "type": "comm" }];
		let Js = JSON.stringify(xi, null, "\t");
		file.writeTo('.\\plugins\\CMENU\\ooo.json', Js);
		log('[CMENU] 第一次加载CMENU,文件已自动创建!')
	}
}

function load() {
	log('[CMENU] 开始注册监听器...');
	mc.listen('onUseItem', beforeOnUseItem);
	log('[CMENU] 监听器注册完成！');
	log('[CMENU] 开始注册指令...');
	mc.regPlayerCmd('menu', '打开菜单', menu, 0);
	mc.regPlayerCmd('cd', '打开菜单', menu, 0);
	log('[CMENU] 注册指令列表成功!');
	log('[CMENU] 开始读取配置文件...');
	start();
	log('[CMENU] 加载完成！版本：1.1');
	log('[CMENU] 插件作者 by 提米吖');
};