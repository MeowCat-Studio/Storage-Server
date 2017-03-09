oS.Init({
    PicArr: function() {
        a = "images/interface/";
        return [ShadowPNG, a + "plantshadow32.png", a + "FlagMeterEmpty.png", a + "FlagMeterFull.png", a + "ShovelBack.png", a + "戴夫.png", a + "实验室1.jpg", a + "FlagMeterParts1.png", a + "过关奖励.png", a + "返回主页.png", a + "ZombiesWon.png", a + "LawnCleaner.png", a + "FlagMeterParts1.png", a + "暂停.png", a + "菜单.png", a + "PrepareGrowPlants.png"]
    } (),
    LoadMusic: "菊次郎的夏天",
    backgroundImage: "images/interface/实验室1.jpg",
    LoadAccess: function(a) {
        //返回主页
        NewImg("imgSF", "images/interface/返回主页.png", "left:1px;top:1px", EDAll, {
            onclick: function() {
                SelectModal(0)
                SetBlock($('dSurface'),$('iSurfaceBackground'));
            }
        });
        //金铃花
        NewImg("imgSF", "images/interface/教学关鼠标检测.png", "left:236px;top:146px", EDAll, {
            onclick: function() {
                SelectModal('lab-j')
            }
        });
        //南瓜罩
        NewImg("imgSF", "images/interface/教学关鼠标检测.png", "left:662px;top:182px", EDAll, {
            onclick: function() {
                SelectModal('lab-n')
            }
        });
    }
});