mc.listen("onExplode",function(en, pos) {
    runcmd('say type:'+en.type);
    runcmd('say name:'+en.name);
    runcmd('say id:'+en.id);
    if (en.type == 'entity.creeper.name') {
        return false;
    }
});