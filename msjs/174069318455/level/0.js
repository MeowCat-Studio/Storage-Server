oS.Init({
    PicArr: function() {
        a = "images/interface/";
        b = "js/Diary/";
        return [ShadowPNG, a + "Logo.jpg", a + "告示牌.png", a + "跳页面板.jpg", a + "日记书桌.jpg", b + "1.png", b + "2.png", b + "3.png", b + "4.png", a + "调速_继续游戏.png", a + "调速_恢复原速.png", a + "OptionsMenuback32.png", a + "调速面板.png", a  + "副本入口.png", a  + "快速跳页.png"]
    } (),
    AudioArr: ["winmusic", "plant2", "plant1", "bottom", "Close", "pause", "seedlift", "shovel", "points", "scream", "readysetplant", "菊次郎的夏天", "plantsgarden", "crazydavelong1", "crazydavelong2", "crazydavelong3", "UnlockLimit", "僵王1", "僵王2", "僵王3"],
    LevelName: "游戏初始界面",
    LevelEName: 0,
    ShowScroll: 1,
    LoadMusic: "主界面",
    StartGameMusic: "主界面",
    backgroundImage: "images/interface/Logo.png",
    LoadAccess: function(a) {
        EBody = document.body;
        EElement = document.documentElement;
        EDAll.scrollLeft = 0;
        EDAll.innerHTML += WordUTF8;
        oSym.Stop()
    }
});