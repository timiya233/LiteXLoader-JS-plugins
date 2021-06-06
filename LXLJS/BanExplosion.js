mc.listen("onExplode",function(en, pos) {
    if (en.type == 'entity.creeper.name') {
        return false;
    } else {
        return true;
    }
});