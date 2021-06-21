// 文件名：LxlBlackBe.net.js
// 文件功能：LXL平台下BlackBe云黑与本地黑名单工具
// 作者：yqs112358
// 首发平台：MineBBS

var _VER = '1.0.0'

logger.setConsole(true,1);
logger.setFile("./log/BlackBe.log",2);
logger.setTitle("BlackBe")

file.createDir("./plugins/LxlBlackBe/")
var conf = data.openConfig("./plugins/LxlBlackBe/config.json","json","{}");


mc.listen("onJoin", function(pl)
{
    logger.info('玩家' + pl.name + '正在进入服务器...');


    //检查本地黑名单
    if(conf.get("BlackList",[]).indexOf(pl.name) != -1)
    {
        pl.kick();
        logger.warn('发现玩家' + pl.name + '在服务器本地黑名单上，已断开连接！');
        return;
    }
    else
        logger.info('对玩家' + pl.name + '的本地黑名单检测通过。');


    //检查云端黑名单
    network.httpGet('http://api.blackbe.xyz/api/check?v2=true&id=' + pl.name, function(status,result)
    {
        if(status != 200)
            logger.error('云黑检查失败！请检查你的网络连接。返回码：' + status);
        else 
        {
            let res = JSON.parse(result);
            if(!res.success)
                logger.error('云黑检查失败！请检查你的网络连接。');
            else if(res.error != 2003)
            {
                pl.kick();
                logger.warn('发现玩家' + pl.name + '在BlackBe云端黑名单上，已断开连接！');
            }
            else
                logger.info('对玩家' + pl.name + '的云端黑名单检测通过。');
        }
    });

});

mc.regConsoleCmd("ban", "封禁一个玩家", function(args)
{
    if(args.length <= 1)
        log('[Error] 参数错误！命令用法：ban <玩家名>');
    else
    {
        let name = args[1];
        let pl = mc.getPlayer(name);
        if(pl)
            pl.kick();

        let blackList = conf.get("BlackList",[]);
        if(blackList.indexOf(name) != -1)
            log('[BlackBe] 玩家' + name + '已存在于本地黑名单中');
        else
        {
            blackList.push(name);
            conf.set("BlackList", blackList);
            log('[BlackBe] 玩家' + name + '已加入本地黑名单');
        }
    }
});

mc.regConsoleCmd("unban", "解封一个玩家", function(args)
{
    if(args.length <= 1)
        log('[Error] 参数错误！命令用法：unban <玩家名>');
    else
    {
        let name = args[1];
        let blackList = conf.get("BlackList",[]);

        let index = blackList.indexOf(name);
        if(index == -1)
            log('[BlackBe] 玩家' + name + '不在本地黑名单中！');
        else
        {
            blackList.splice(index,1);
            conf.set("BlackList", blackList);
            log('[BlackBe] 已从本地黑名单中移除玩家' + name);
        }
    }
});

mc.regConsoleCmd("banlist", "查询本地黑名单列表", function(args)
{
    let blackList = conf.get("BlackList",[]);

    if(blackList.length == 0)
        log('[BlackBe] 本地黑名单列表为空。');
    else
    {
        log('[BlackBe] 本地黑名单列表如下：');
        blackList.forEach(function(element)
        {
            log(element);
        });
    }
});

log('[BlackBe] LxlBlackBe云黑插件已装载  当前版本：' + _VER);
log('[BlackBe] 作者：yqs112358   首发平台：MineBBS');
log('[BlackBe] 欲联系作者可前往MineBBS论坛');

log('[BlackBe] ========== 本地黑名单命令 ===========');
log('[BlackBe]    ban <玩家名>     封禁指定玩家');
log('[BlackBe]    unban <玩家名>   解封指定玩家');
log('[BlackBe]    banlist   列出本地黑名单中的玩家');
log('[BlackBe] ====================================');