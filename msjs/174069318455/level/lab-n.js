oS.Init({
    PName: [oPumpkinHead, oPeashooter],
    ZName: [oZombie],
    PicArr: function() {
        var a = oPumpkinHead.prototype,
        b = a.PicArr;
        return ["images/interface/background1.jpg", b[a.CardGif], b[a.NormalGif]]
    } (),
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 0,
    LevelName: "实验室-南瓜罩",
    StaticCard: 0,
    LoadMusic: "庭院选卡",
    StartGameMusic: "庭院战斗",
    LoadAccess: function(a) {
        NewImg("imgKK", "images/interface/路牌.png", "left:1001px;top:366px", EDAll);
        NewImg("imgKK", "images/interface/汽车一角.png", "left:1309.1px;top:303.8px", EDAll);
        NewImg("dDave", "images/interface/戴夫出现.gif", "left:0;top:81px", EDAll);
        NewEle("DivTeach", "div", 0, 0, EDAll); (function(d) {
            var b = arguments.callee,
            c = $("DivTeach");
            switch (d) {
            case 0:
                PlayAudio("crazydaveshort1");
                $("dDave").src = "images/interface/戴夫.png";
                oSym.addTask(1,
                function() {
                    $("dDave").src = "images/interface/戴夫.png";
                    c.onclick = function() {
                        oSym.addTask(10, b, [1])
                    }
                },
                []);
                innerText(c, "嗯……我又找到了南瓜粥……南瓜渣……南瓜饼……");
                break;
            case 1:
                PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                c.onclick = null;
                $("dDave").src = "images/interface/戴夫.png";
                oSym.addTask(1,
                function() {
                    $("dDave").src = "images/interface/戴夫.png";
                    c.onclick = function() {
                        oSym.addTask(10, b, [2])
                    }
                },
                []);
                innerText(c, "南瓜汤……南瓜汤圆……南瓜皮……南斯拉夫……");
                break;
            case 2:
                PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                c.onclick = null;
                $("dDave").src = "images/interface/戴夫.png";
                oSym.addTask(1,
                function() {
                    $("dDave").src = "images/interface/戴夫.png";
                    c.onclick = function() {
                        oSym.addTask(10, b, [3])
                    }
                },
                []);
                innerText(c, "哦……我刚刚说了什么……");
                break;
            case 3:
                PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                c.onclick = null;
                $("dDave").src = "images/interface/戴夫.png";
                oSym.addTask(1,
                function() {
                    $("dDave").src = "images/interface/戴夫.png";
                    c.onclick = function() {
                        oSym.addTask(10, b, [4])
                    }
                },
                []);
                innerText(c, "自从见到僵尸博士以后，我还从来没这么紧张过→_→");
                break;
            case 4:
                PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                c.onclick = null;
                $("dDave").src = "images/interface/戴夫.png";
                oSym.addTask(1,
                function() {
                    $("dDave").src = "images/interface/戴夫.png";
                    c.onclick = function() {
                        oSym.addTask(10, b, [5])
                    }
                },
                []);
                innerText(c, "也许，真的……");
                break;
            case 5:
                $("dDave").src = "images/interface/用于检测鼠标是否放在关卡按钮上.png";
                ClearChild($("DivTeach"));
                oSym.addTask(1,
                function() {
                    ClearChild($("dDave"));
                    a(0)
                },
                [])
            }
        })(0)
    },
    StartGame: function() {
        StopMusic();
        PlayMusic(oS.LoadMusic = oS.StartGameMusic);
        SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
        SetHidden($("dSunNum"));
        oS.InitLawnMower();
        PrepareGrowPlants(function() {
            document.onkeydown = hotkey;
            oP.Monitor({
                f: function() { (function() {
                        var a = ArCard.length;
                        var j = 10;
                        if (a < j) {
                            var c = oS.PName,
                            b = Math.floor(Math.random() * c.length),
                            e = c[b],
                            d = e.prototype,
                            f = "dCard" + Math.random();
                            ArCard[a] = {
                                DID: f,
                                PName: e,
                                PixelTop: 600
                            };
                            NewImg(f, d.PicArr[d.CardGif], "top:600px;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto)", $("dCardList"), {
                                onmouseover: function(g) {
                                    ViewPlantTitle(GetChoseCard(f), g)
                                },
                                onmouseout: function() {
                                    SetHidden($("dTitle"))
                                },
                                onclick: function(g) {
                                    ChosePlant(g, oS.ChoseCard, f)
                                }
                            })
                        }
                        oSym.addTask(600, arguments.callee, [])
                    })(); (function() {
                        var b = ArCard.length,
                        a, c;
                        while (b--) { (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px")
                        }
                        oSym.addTask(5, arguments.callee, [])
                    })()
                },
                ar: []
            });
            oP.AddZombiesFlag();
            SetVisible($("dFlagMeterContent"))
        })
    },
},
{
    AZ: [[oZombie, 6, 1]],
    FlagNum: 7,
    FlagToSumNum: {
        a1: [3, 6],
        a2: [1, 6, 10]
    },
    FlagToMonitor: {},
    FlagToEnd: function() {
 NewImg("imgSF", "images/interface/过关奖励.png", "left:260px;top:233px", EDAll, {
            onclick: function() {
                GetWin(this, 'lab')
            }
        });
    }
},
{
    GetChoseCard: function(b) {
        if (oS.Chose) {
            return
        }
        var a = ArCard.length;
        while (a--) {
            ArCard[a].DID == b && (oS.ChoseCard = a, a = 0)
        }
        return oS.ChoseCard
    },
    ChosePlant: function(a, b) {
        PlayAudio("seedlift");
        a = window.event || a;
        var f = ArCard[oS.ChoseCard],
        e = a.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
        d = a.clientY + EBody.scrollTop || EElement.scrollTop,
        c = f.PName.prototype;
        oS.Chose = 1;
        EditImg(NewImg("MovePlant", c.PicArr[c.StaticGif], "left:" + e - 0.5 * (c.beAttackedPointL + c.beAttackedPointR) + "px;top:" + d + 20 - c.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
            visibility: "hidden",
            filter: "alpha(opacity=40)",
            opacity: 0.4,
            zIndex: 30
        },
        EDAll);
        SetAlpha($(f.DID), 50, 0.5);
        SetHidden($("dTitle"));
        GroundOnmousemove = GroundOnmousemove1
    },
    CancelPlant: function() {
        ClearChild($("MovePlant"), $("MovePlantAlpha"));
        oS.Chose = 0;
        SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
        oS.ChoseCard = "";
        GroundOnmousemove = function() {}
    },
    GrowPlant: function(l, c, b, f, a) {
        var j = oS.ChoseCard,
        g = ArCard[j],
        i = g.PName,
        k = i.prototype,
        d = g.DID,
        e,
        h = oGd.$LF[f];
        k.CanGrow(l, f, a) &&
        function() {
            PlayAudio(h != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"); (new i).Birth(c, b, f, a, l);
            oSym.addTask(20, SetNone, [SetStyle($("imgGrowSoil"), {
                left: c - 30 + "px",
                top: b - 40 + "px",
                zIndex: 3 * f,
                visibility: "visible"
            })]);
            ClearChild($("MovePlant"), $("MovePlantAlpha"));
            $("dCardList").removeChild(e = $(d));
            e = null;
            ArCard.splice(j, 1);
            oS.ChoseCard = "";
            oS.Chose = 0;
            GroundOnmousemove = function() {}
        } ()
    },
    ViewPlantTitle: function(a) {
        var c = $("dTitle"),
        b = ArCard[a].PName.prototype;
        c.innerHTML = b.CName + "<br>" + b.Tooltip;
        SetStyle(c, {
            top: 60 * a + "px",
            left: "100px"
        })
    }
});