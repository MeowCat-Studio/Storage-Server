oS.Init({
    PName: [oPeashooter, oSunFlower],
    ZName: [oZombie, oConeheadZombie],
    PicArr: ["images/interface/Background1.png"],
    backgroundImage: "images/interface/Background1.png",
    CanSelectCard: 1,
	Coord: 2,
    SunNum: 10000,
	LF: [0,1,1,1,1,1,1],
    LevelName: "CVM Test Level",
    LvlEName: 6,
    LoadMusic: "",
    StartGameMusic: "",
    LoadAccess: function(a) {
        NewEle("DivTeach", "div", 0, 0, EDAll); (function(d) {
            var b = arguments.callee,
            c = $("DivTeach");
            switch (d) {
            case 0:
                ClearChild($("DivTeach"));
                oSym.addTask(50,
                function() {
                    ClearChild($("dDave"));
                    a(0)
                },
                [])
            }
        })(0)
    },
},
{
    AZ: [[oZombie, 4, 1], [oConeheadZombie, 4, 5]],
    FlagNum: 10,
    FlagToSumNum: {
        a1: [5],
        a2: [1, 4]
    },
    FlagToMonitor: {
    },
    FlagToEnd: function() {
 NewImg("imgSF", "images/interface/过关奖励.png", "left:260px;top:233px", EDAll, {
            onclick: function() {
                window.open('http://www.meowcat.tk/');PlayAudio('pause');
            }
        });
    }
});