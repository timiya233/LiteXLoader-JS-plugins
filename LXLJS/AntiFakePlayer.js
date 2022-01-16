function PreJoin(pl) {
    let xuid = pl.xuid;
    try {
        let JX = parseInt(xuid);
        if (JX == NaN) {
            pl.kick("FakePlayer!");
        } else if (JX <= 0) {
            pl.kick("FakePlayer!");
        }
    } catch (e) {
        pl.kick("FakePlayer!");
    }
}



function load() {
    mc.listen("onPreJoin", PreJoin);
    log("反假人已在后台静默运行");
}