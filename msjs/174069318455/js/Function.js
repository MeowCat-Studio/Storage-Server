var $User = function() {
    var b = navigator.platform,
    i = navigator.userAgent,
    f = (b == "Win32" || b == "Windows"),
    g = (b == "Mac68K" || b == "MacPPC" || b == "Macintosh"),
    d = (b == "X11" && !f && !g),
    h = f || g || d,
    a = "",
    c = !!(window.attachEvent && !window.opera),
    e = c && !window.XMLHttpRequest,
    j = location.protocol.toLowerCase() == "http:" ? 1 : 0;
    $Random = j ? "#": "?";
    innerText = c ?
    function(l, k) {
        l.innerText = k
    }: function(l, k) {
        l.textContent = k
    };
    e ? (document.execCommand("BackgroundImageCache", false, true), ShadowPNG = "") : ShadowPNG = "images/interface/plantshadow32.png";
    return {
        Browser: {
            IE: c,
            IE6: e,
            IE9: c && i.indexOf("MSIE 9.0") > 0,
            Opera: !!window.opera,
            WebKit: i.indexOf("AppleWebKit/") > -1,
            Gecko: i.indexOf("Gecko") > -1 && i.indexOf("KHTML") == -1
        },
        Server: {
        },
        HTML5: function() {
            return ( !! (document.createElement("canvas").getContext))
        } (),
        System: {
            Win: f,
            Mac: g,
            Unix: d
        },
        Client: {
            PC: h,
            Mobile: !h
        },
        HTTP: j,
        AuthorWebsite: a,
        isAuthorWebsite: false,
        Visitor: {
            UserName: "玩家",

            UserAuthority: 0,
            Progress: 1,
            SelectServerT: 0,
            NowStep: 1,
            TimeStep: 10,
            SaveLvl: 1,
            SaveLvlCallBack: null
        }
    }
} (),
oSym = {
    Init: function(b, a) {
        var t = this;  
        t.Now = 0;
        t.Timer = this.execTask = null;
        t.TQ = [{
            T: 0,
            f: b,
            ar: a || []
        }];
        t.NowStep = 1;
        t.TimeStep = 10;
        t.Start()
    },
    Clear: function() {
        this.TQ.length = 0
    },
    Start: function() {
        if (this.Timer == null) { (function() {
                var a = oSym;
                try {
                    a.Now += a.NowStep
                } catch(b) {
                    alert("超时退出游戏");
                    location.reload()
                }
                a.Timer = setTimeout(arguments.callee, a.TimeStep)
            })(); (function() {
                var d = oSym,
                a = d.TQ,
                c = a.length,
                b, e;
                while (c--) {
                    d.Now >= (b = a[c]).T && ((e = b.f).apply(e, b.ar), d.removeTask(c))
                }
                d.execTask = setTimeout(arguments.callee, d.TimeStep)
            })()
        }
    },
    Stop: function() {
        clearTimeout(oSym.Timer);
        clearTimeout(oSym.execTask);
        oSym.Timer = null;
        oSym.execTask = null
    },
    addTask: function(b, c, a) {
        var d = this.TQ;
        d[d.length] = {
            T: this.Now + b,
            f: c,
            ar: a
        };
        return this
    },
    removeTask: function(a) {
        this.TQ.splice(a, 1);
        return this
    }
},
detectZoom = function() {
    var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    if (ratio != 100) {
        alert("您的浏览器不是标准的缩放比例，会影响游戏体验。\n请使用 Ctrl + 0 恢复为标准的缩放比例浏览网页!")
    };
} (),
oS = {
    W: 880,
    H: 600,
    C: 9,
    LawnMowerX: 70,
    Lvl: 0,
    GlobalVariables: {},
    LvlVariables: {},
    SelfVariables: [],
    LvlClearFunc: null,
    Init: function(e, g, b, d) {
        var c, a = window;
        e.LoadMusic ? (PlayMusic(e.LoadMusic), NewAudio({
            source: "菊次郎的夏天",

            loop: true
        })) : PlayMusic(e.LoadMusic = "菊次郎的夏天");
        if (b != d) {
            for (c in b) {
                a[c] != d ? (this.GlobalVariables[c] = a[c], a[c] = b[c]) : this.LvlVariables[c] = a[c] = b[c]
            }
        }
        var t = this;  
        ArCard = [];
        ArPCard = [];
        ArSun = [];
        $Pn = [];
        $Z = [];
        $P = [];
        EDJH = $("dJH");
        EDAll = $("dAll");
        EDPZ = $("dPZ");
        EDAlloffsetLeft = EDAll.offsetLeft;
        EDNewAll = EDAll.cloneNode(true);
        EDNewFlagMeter = $("dFlagMeter").cloneNode(true);
        ESSunNum = $("sSunNum");
        t.AudioArr = [];
        t.MustAllReady = true;
        t.LoadAccess = null;
        t.InitLawnMower = null;
        t.StartGame = null;
        t.ChoseCard = this.MPID = "";
        t.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
        t.Monitor = null;
        t.UserDefinedFlagFunc = null;
        t.SunNum = d;
        t.BrainsNum = d;
        t.HaveFog = 0;
        for (c in e) {
            this.SelfVariables.push(c);
            this[c] = e[c]
        }; ! t.PicArr && (t.PicArr = []); ! t.PName && (t.PName = []); ! t.ZName && (t.ZName = []); ! t.backgroundImage && (t.backgroundImage = "images/interface/background1.jpg"); ! t.LF && (t.LF = [0, 1, 1, 1, 1, 1]); ! t.ZF && (t.ZF = t.LF); ! t.LargeWaveFlag && (t.LargeWaveFlag = {}); ! t.StartGameMusic && (t.StartGameMusic = "主界面");
        t.ArCard = this.CardKind == d ? e.PName: e.ZName;
        t.SunNum == d && (this.SunNum = 50);
        t.CanSelectCard == d && (this.CanSelectCard = 1);
        t.DKind == d && (this.DKind = 1);
        t.StaticCard == d && (this.StaticCard = 1);
        t.ShowScroll == d && (this.ShowScroll = true);
        t.ProduceSun == d && (this.ProduceSun = true);
        t.Coord == d && (this.Coord = 1);
        oCoord[this.Coord]();
        oP.Init(g);
        oT.Init(t.R);
        oZ.Init(t.R);
        oGd.Init();
        t.LoadTips();
        t.LoadProgress()
    },
    LoadTips: function() {
    },

    LoadProgress: function(r, l, a, t, b) {
        SetVisible($("dFlagMeter"));

        var p = oS,
        j = [],
        i = p.PicArr,
        k = p.PName,
        s = p.ZName,
        w = 0,
        u = GetX(11),
        g = oGd.$LF,
        c = oGd.$ZF,
        d = oS.R + 1,
        x = $("sFlagMeterTitleF"),
        y = $("dFlagMeterTitle"),
        e = p.LoadImage,
        h = p.CheckImg,
        f = p.InitPn,
        m,
        q;
        NewImg(0, "", "", $Pn.oBrains = NewEle(0, "div", "position:absolute"));
        switch (p.Coord) {

        case 2:
            NewImg(0, "images/interface/PoolCleaner.png", "", $Pn.oPoolCleaner = NewEle(0, "div", "position:absolute"));
        case 1:
            NewImg(0, "images/interface/LawnCleaner.png", "", $Pn.oLawnCleaner = NewEle(0, "div", "position:absolute"));
            break
        }
        while (r--) {
            a = (l = k[r].prototype).PicArr.slice(0);
            Array.prototype.push.apply(i, a);
            if ($User.HTML5) {
                t = l.AudioArr;
                b = t.length;
                while (b--) {
                    NewAudio({
                        source: t[b]
                    })
                }
            }
        }
        for (r in oS.LargeWaveFlag) {
            s[s.length] = oS.FlagZombie || oZombie;
            break
        }
        r = s.length;
        while (r--) {
            Array.prototype.push.apply(i, (l = (q = s[r]).prototype).PicArr.slice(0));
            if ($User.HTML5) {
                t = l.AudioArr;
                b = t.length;
                while (b--) {
                    NewAudio({
                        source: t[b]
                    })
                }
            }
            l.Init.call(q, u, l, c, d)
        }
        p.PicNum = w += i.length;
        r = i.length;
        y.setAttribute("title", "");
        y.style.cursor = "pointer";
        y.onclick = function() {
            oS.MustAllReady = false;
            oS.LoadReady(oS)
        };
        while (r--) {
            e(i[r], h)
        }
        r = j.length;
        oS.LoadAudio()
    },
    LoadAudio: $User.HTML5 ?
    function() {
        var b = oS.AudioArr,
        a = b.length;
        while (a--) {
            NewAudio({
                source: b[a]
            })
        }
    }: function() {},
    InitPn: function(a) {
        var b = $Pn[a[0]] = NewEle(0, "div", "position:absolute");
        NewImg(0, ShadowPNG, a[2], b);
        NewImg(0, a[1], "", b);
        oS.CheckImg()
    },
    LoadImage: $User.Browser.IE ?
    function(b, d, c) {
        var a = new Image();
        a.onreadystatechange = function() {
            a.readyState == "complete" && d(c, 1)
        };
        a.onerror = function() {
            a.onreadystatechange = null;
            a.title = b;
            d(c, 0)
        };
        a.src = b
    }: function(b, d, c) {
        var a = new Image();
        a.src = b;
        a.complete ? d(c, 1) : (a.onload = function() {
            a.complete && d(c, 1)
        },
        a.onerror = function() {
            a.title = b;
            d(c, 0)
        })
    },
    LoadScript: $User.Browser.IE ?
    function(f, c, e, a, d) {
        var b = NewEle(f, "script", 0, {
            type: "text/javascript"
        });
        b.onreadystatechange = function() { (b.readyState == "loaded" || b.readyState == "complete") && (b.onreadystatechange = null, e(d, 1))
        };
        b.onerror = function() {
            b.onreadystatechange = null;
            e(d, 0)
        };
        b.src = c;
        a.appendChild(b)
    }: function(f, c, e, a, d) {
        var b = NewEle(f, "script", 0, {
            type: "text/javascript"
        });
        b.onload = function() {
            e(d, 1)
        };
        b.onerror = function() {
            e(d, 0)
        };
        b.src = c;
        a.appendChild(b)
    },
    CheckImg: function(b, a) {
        var c = oS;
        if (c.AccessNum > c.PicNum || !c.MustAllReady) {
            return
        }
        b = 139 - c.AccessNum++*140 / c.PicNum - 11;



        if (c.AccessNum == c.PicNum) {
            oS.Lvl == 0 && PlayAudio("");

            if (c.MustAllReady) {
                c.LoadReady(c)
            }
        }
    },
    LoadReady: function(f) {
        var c = $("dFlagMeterTitle");
        if (c.onclick == null) {
            return
        }
        if (f.CenterContent) {
            var e = oS.Lvl;
            if (oS.MustAllReady && oS.DisplayAD) {
            }
            oS.DisplayAD = false;
        }
        ClearChild($("dTips"));
        oSym.NowStep = $User.Visitor.NowStep;
        oSym.TimeStep = $User.Visitor.TimeStep;
        c.onclick = null;
        c.title = null;
        c.style.cursor = "default";
        SetHidden($("dFlagMeterContent"), dFlagMeter);
        $("dFlagMeter").style.top = "545px";
        $("sFlagMeterTitleF").innerHTML = $("dFlagMeterTitleB").innerHTML = f.LevelName;
        $("imgFlagHead").style.left = "139px";
        $("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)";
        delete f.PicArr;
        delete f.Coord;
        delete f.LF;
        delete f.ZF;
        var a = {
            background: "url(" + f.backgroundImage + ") no-repeat",
            visibility: "visible"
        }; ! f.ShowScroll && (a.left = "-115px");
        SetStyle($("tGround"), a);
        $("tGround").innerHTML = oS.GifHTML;
        var d = function(h) {
            var i = oS,
            g = $User.Visitor;
            NewImg("imgGrowSoil", "", "visibility:hidden;z-index:50", EDAll);
            NewImg("imgGrowSpray", "", "visibility:hidden;z-index:50", EDAll);
            NewEle("dTitle", "div", 0, 0, $("dBody"));
            innerText(ESSunNum, i.SunNum);
            InitPCard();
            i.ShowScroll ? oSym.addTask(h == undefined ? 200 : h,
            function(j) {
                ClearChild(j);
                i.ScrollScreen()


            }) : (SetVisible($("dMenu")), AutoSelectCard(), LetsGO())
        };
        f.LoadAccess ? f.LoadAccess(d) : d()
    },
    ScrollScreen: function() { (EDAll.scrollLeft += 25) < 500 ? oSym.addTask(2, arguments.callee, []) : (DisplayZombie(), SetVisible($("dMenu")), oS.CanSelectCard ? SetVisible($("dTop"), $("dSelectCard"), $("dCardList")) : (AutoSelectCard(), oSym.addTask(200, oS.ScrollBack, [LetsGO])))
    },
    ScrollBack: function(a) {
        SetHidden($("dZombie"), $("dSelectCard"), $("dTitle"), $("dCardList"));
        $("tGround").style.left = "-115px";
        $("dZombie").innerHTML = ""; (function(c) {
            var b = EDAll.scrollLeft; (b -= 25) > 0 ? (EDAll.scrollLeft = b, oSym.addTask(2, arguments.callee, [c])) : (EDAll.scrollLeft = 0, c())
        })(a)
    }
},
oCoord = {
    1 : function() {
        oS.R = 5;
        ChosePlantX = function(a) {
            return Compare(GetC(a), 1, oS.C, GetX)
        };
        ChosePlantY = function(a) {
            return $SSml(a, [86, 181, 281, 386, 476], [[75, 0], [175, 1], [270, 2], [380, 3], [470, 4], [575, 5]])
        };
        GetC = function(a) {
            return $SSml(a, [ - 50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        };
        GetR = function(a) {
            return $SSml(a, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5])
        };
        GetX = function(a) {
            return $SEql(a, {
                "-2": -50,
                "-1": 100,
                0 : 140,
                1 : 187,
                2 : 267,
                3 : 347,
                4 : 427,
                5 : 507,
                6 : 587,
                7 : 667,
                8 : 747,
                9 : 827,
                10 : 865,
                11 : 950
            })
        };
        GetY = function(a) {
            return $SEql(a, {
                0 : 75,
                1 : 175,
                2 : 270,
                3 : 380,
                4 : 470,
                5 : 575
            })
        };
        GetY1Y2 = function(a) {
            return $SEql(a, {
                0 : [0, 85],
                1 : [86, 180],
                2 : [181, 280],
                3 : [281, 385],
                4 : [386, 475],
                5 : [476, 600]
            })
        };
        GetX1X2 = function(a) {
            return $SEql(a, {
                "-2": [ - 100, -49],
                "-1": [ - 50, 99],
                0 : [100, 139],
                1 : [140, 219],
                2 : [220, 294],
                3 : [295, 378],
                4 : [379, 459],
                5 : [460, 539],
                6 : [540, 624],
                7 : [625, 694],
                8 : [695, 774],
                9 : [775, 854],
                10 : [855, 934],
                11 : [950, 1030]
            })
        };
        oS.GifHTML = ""
    },
    2 : function() {
        oS.R = 6;
        ChosePlantX = function(a) {
            return Compare(GetC(a), 1, oS.C, GetX)
        };
        ChosePlantY = function(a) {
            return $SSml(a, [86, 171, 264, 368, 440, 532], [[75, 0], [161, 1], [254, 2], [358, 3], [430, 4], [524, 5], [593, 6]])
        };
        GetC = function(a) {
            return $SSml(a, [ - 50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        };
        GetR = function(a) {
            return $SSml(a, [86, 171, 264, 368, 440, 532], [0, 1, 2, 3, 4, 5, 6])
        };
        GetX = function(a) {
            return $SEql(a, {
                "-2": -50,
                "-1": 100,
                0 : 140,
                1 : 187,
                2 : 267,
                3 : 347,
                4 : 427,
                5 : 507,
                6 : 587,
                7 : 667,
                8 : 747,
                9 : 827,
                10 : 865,
                11 : 950
            })
        };
        GetY = function(a) {
            return $SEql(a, {
                0 : 75,
                1 : 165,
                2 : 253,
                3 : 355,
                4 : 430,
                5 : 522,
                6 : 587
            })
        };
        GetY1Y2 = function(a) {
            return $SEql(a, {
                0 : [0, 85],
                1 : [86, 170],
                2 : [171, 263],
                3 : [264, 367],
                4 : [368, 439],
                5 : [440, 531],
                6 : [532, 600]
            })
        };
        GetX1X2 = function(a) {
            return $SEql(a, {
                "-2": [ - 100, -49],
                "-1": [ - 50, 99],
                0 : [100, 139],
                1 : [140, 219],
                2 : [220, 294],
                3 : [295, 378],
                4 : [379, 459],
                5 : [460, 539],
                6 : [540, 624],
                7 : [625, 694],
                8 : [695, 774],
                9 : [775, 854],
                10 : [855, 934],
                11 : [950, 1030]
            })
        }; ! oS.InitLawnMower && (oS.InitLawnMower = function() {
            CustomSpecial(oLawnCleaner, 1, -1);
            CustomSpecial(oLawnCleaner, 2, -1);
            CustomSpecial(oLawnCleaner, 3, -1);
            CustomSpecial(oLawnCleaner, 4, -1);
            CustomSpecial(oLawnCleaner, 5, -1);
			CustomSpecial(oLawnCleaner, 6, -1);
            CustomSpecial(oLawnCleaner, 7, -1)
        });
        oS.GifHTML = '<img style="position:absolute;left:253px;top:278px" src="">'; ! oS.DKind && oGd.MakeFog()
    }
},
oP = {
    Init: function(a) {
        var r = this;
        r.NumZombies = r.FlagZombies = 0;
        if (a) {
            var l;
            for (l in a) {
                r[l] = a[l]
            }
            if (a.AZ) {
                var k, b = {},
                g, c, q, p, d, m = [],
                h,
                e,
                n;
                r.ArZ = [];
                h = ((k = r.AZ).sort(function(i, f) {
                    return i[2] - f[2]
                })).length;
                while (h--) {
                    c = (n = k[h])[0];
                    q = n[1];
                    p = n[2];
                    while (q--) {
                        m.push([c, p])
                    }
                    if (d = n[3]) {
                        e = d.length;
                        while (e--) {
                            b[g = d[e]] ? b[g].push(c) : b[g] = [c]
                        }
                    }
                }
                r.AZ = m;
                r.MustShowAtFlag = b
            }
        }
        a && a.FlagNum ? (r.FlagHeadStep = Math.floor(140 / (a.FlagNum - 1)), r.MonPrgs = function() {
            var u = oP,
            j, i = u.FlagZombies,
            s, t, f = $User.Visitor; ! --u.NumZombies && (i < u.FlagNum ? (u.ReadyFlag = ++i, oSym.addTask(500, u.FlagPrgs, [])) : (u.FlagToEnd(), $User.isAuthorWebsite && $User.Visitor.UserName != "玩家" && (ClearChild($("JSPVZAjax")), f.SaveLvl && NewEle("JSPVZAjax", "script", 0, {
            },
            document.body)), f.SaveLvlCallBack && f.SaveLvlCallBack({
                UserName: f.UserName,
                SunNum: oS.SunNum,
                Lvl: s,
                T: oSym.Now - oS.StartTime
            }), !isNaN(Math.floor(s)) && (t = $("dAdventure"), $User.Visitor.Progress = ++s, t.firstChild.innerHTML = Math.ceil(s / 10), t.childNodes[1].innerHTML = (s = s - Math.floor(s / 10) * 10) ? s: s + 1), NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:255", 0, EDAll), PauseGame($("dMenu0"), 1)))
        }) : r.MonPrgs = function() {}; (!a || !a.FlagToEnd) && (r.FlagToEnd = function() {
            NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px;z-index:255", EDAll, {
                onclick: function() {
                    PlayAudio("winmusic");
                    SelectModal(0);
                    HiddenOptions();
                    SetBlock($("dSurface"), $("iSurfaceBackground"));
                    ShowNameDiv()
                }
            })
        })
    },
    AddZombiesFlag: function(d) {
        var g = oP,
        c = oS.LargeWaveFlag,
        e, b = g.FlagHeadStep,
        a = g.FlagNum;
        SetVisible($("dFlagMeterContent"));
        for (e in c) {
            Math.floor(e) < a ? SetStyle(c[e], {
                visibility: "visible",
                left: (150 - (e - 1) * b) + "px"
            }) : SetVisible(c[e])
        }

        $User.HTML5 &&
        function() {
            oSym.addTask(3333,
            function() { [function() {
                    PlayAudio(["groan1", "groan2"][Math.floor(Math.random() * 2)])
                },
                function() {
                    PlayAudio(["groan3", "groan4"][Math.floor(Math.random() * 2)])
                },
                function() {
                    PlayAudio(["groan5", "groan6"][Math.floor(Math.random() * 2)])
                },
                function() {
                    PlayAudio("groan1");
                    oSym.addTask(150,
                    function() {
                        PlayAudio("groan5")
                    },
                    [])
                },
                function() {
                    PlayAudio("groan2");
                    oSym.addTask(150,
                    function() {
                        PlayAudio("groan6")
                    },
                    [])
                }][Math.floor(Math.random() * 3)]();
                oSym.addTask(2000, arguments.callee, [])
            },
            [])
        } ();
        g.ReadyFlag = 1;
        g.FlagPrgs(d)
    },
    SelectFlagZombie: function(j, d) {
        var e = oP,
        m = e.ArZ,
        k = e.AZ,
        s = k.length,
        q, r, i = [],
        g = 0,
        n = oS.LargeWaveFlag[d],
        c = false,
        h = !n ? 150 : (PlayAudio("siren"), n.style.top = "5px", --j, i[g++] = oS.FlagZombie || oZombie, 30),
        p,
        b,
        f = e.MustShowAtFlag,
        a;
        while (s--) {
            if ((r = (q = k[s])[1]) > d) {
                break
            } else {
                m.push(q[0]); --k.length;
                c = true
            }
        }
        c && m.sort(function(t, l) {
            return t.prototype.Lvl - l.prototype.Lvl
        });
        if (a = f[d]) {
            s = a.length;
            while (s--) {
                j -= (i[g++] = a[s]).prototype.Lvl
            }
        }
        b = m[s = (p = m.length) - 1].prototype.Lvl;
        while (j > 0) {
            if (s && b > j) {
                while (--s && m[s].prototype.Lvl > j) {}
                p = s + 1;
                b = m[s].prototype.Lvl
            }
            j -= (i[g++] = m[Math.floor(Math.random() * p)]).prototype.Lvl
        }
        e.NumZombies += g;
        e.SetTimeoutZombie(i, h)
    },
    SelectFlagZombie1: function(d) {
        var h = oP,
        c = [],
        a = 0,
        g = h.ArZ,
        f = oS.LargeWaveFlag[h.FlagZombies],
        e = h.SumToZombie,
        b = !f ? 150 : (f.style.top = "5px", --d, c[a++] = oS.FlagZombie || oZombie, 30);
        while (d > 0) {
            d -= (c[a++] = g[Math.floor(Math.random() * $SEql(d, e))]).prototype.Lvl
        }
        h.NumZombies += a;
        h.SetTimeoutZombie(c, b)
    },
    SetTimeoutTomZombie: function(c) {
        var f = [],
        d = [],
        e = 0,
        a = c.length,
        b,
        g;
        for (b in oGd.$Tombstones) {
            g = b.split("_");
            d[e] = (f[e] = new c[Math.floor(Math.random() * a)]).CustomBirth(g[0], g[1], 100); ++e
        }
        this.AppearUP(d, f, e)
    },
    SetTimeoutWaterZombie: function(j, b, e, h) {
        var f = oGd.$LF,
        l = [],
        c = f.length,
        m = [],
        k = [],
        g = h.length,
        a,
        d = b - j + 1;
        while (--c) {
            f[c] == 2 && l.push(c)
        }
        a = l.length;
        c = e;
        while (c--) {
            k[c] = (m[c] = new h[Math.floor(Math.random() * g)]).CustomBirth(l[Math.floor(Math.random() * a)], Math.floor(j + Math.random() * d))
        }
        this.AppearUP(k, m, e)
    },
    AppearUP: function(a, c, b) {
        oP.NumZombies += b;
        asyncInnerHTML(a.join(""),
        function(h, f) {
            EDPZ.appendChild(h);
            var e = f.length,
            g, d;
            while (e--) {
                g = f[e];
                g.Birth.call(g);
                SetBlock(g.Ele);
                oSym.addTask(10,
                function(l, k, i, j) {
                    k = Math.max(k - j, 0);
                    SetStyle(l, {
                        top: k + "px",
                        clip: "rect(0,auto," + (i += j) + "px,0)"
                    });
                    k && oSym.addTask(10, arguments.callee, [l, k, i, j])
                },
                [g.EleBody, d = g.height, 0, d * 0.1])
            }
        },
        c)
    },
    SetZombie: function(j, b, e, h) {
        var f = [],
        l = [],
        c = f.length,
        m = [],
        k = [],
        g = h.length,
        a,
        d = b - j + 1;
        while (--c) {
            f[c] == 2 && l.push(c)
        }
        a = l.length;
        c = e;
        while (c--) {
            k[c] = (m[c] = new h[Math.floor(Math.random() * g)]).CustomBirth(l[Math.floor(Math.random() * a)], Math.floor(j + Math.random() * d))
        }
        this.AppearUP1(k, m, e)
    },
    AppearUP1: function(a, c, b) {
        oP.NumZombies += b;
        asyncInnerHTML(a.join(""),
        function(h, f) {
            EDPZ.appendChild(h);
            var e = f.length,
            g, d;
            while (e--) {
                g = f[e];
                g.Birth.call(g);
                SetBlock(g.Ele);
                oSym.addTask(10,
                function(l, k, i, j) {
                    k = Math.max(k - j, 0);
                    SetStyle(l, {
                        top: k + "px",
                        clip: "rect(0,auto," + (i += j) + "px,0)"
                    });
                    k && oSym.addTask(10, arguments.callee, [l, k, i, j])
                },
                [g.EleBody, d = g.height, 0, d * 0.1])
            }
        },
        c)
    },
    SetTimeoutZombie: function(b, d) {
        var f = [],
        c = [],
        e = 0,
        g = 0,
        a = b.length;
        while (e < a) {
            c[e] = (f[e] = new b[e]).prepareBirth(g);
            g += d; ++e
        }
        asyncInnerHTML(c.join(""),
        function(k, j) {
            EDPZ.appendChild(k);
            var h = j.length;
            while (h--) {
                j[h].Birth()
            }
        },
        f)
    },
    FlagPrgs: function() {
        var f = oP,
        c = f.FlagZombies,
        e = f.FlagToSumNum,
        a = 139 - c * f.FlagHeadStep,
        d = $SSml(c, e.a1, e.a2),
        b;
        f.FlagNum > (c = ++f.FlagZombies) ? ($("imgFlagHead").style.left = a + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (a + 11) + "px)", (b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690,
        function(g) { ! g[1] && (g[0](), g[1] = 1)
        },
        [b]), oSym.addTask(1990,
        function(g) {
            var h = oP;
            h.ReadyFlag == g++&&(h.ReadyFlag = g, h.FlagPrgs())
        },
        [c])) : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)");
        f.SelectFlagZombie.call(f, d, c);
        f.UserDefinedFlagFunc && f.UserDefinedFlagFunc()
    },
    Monitor: function(a, b) {
        a && a.f.apply(a.f, a.ar);
        oP.UserDefinedFlagFunc = b ? b: null; (function() {
            oZ.traversalOf();
            oSym.addTask(10, arguments.callee, [])
        })()
    }
},
oGd = {
    Init: function() {
        var t = this; 
        t.$ = [];
        t.$Crater = [];
        t.$Tombstones = {};
        t.$Torch = [];
        t.$Plantern = [];
        t.$LF = oS.LF;
        t.$ZF = oS.ZF;
        t.$Ice = [];
        t.$JackinTheBox = 0;
        t.$Balloon = new Array(oS.R + 1);
        t.$Fog = []
    },
    add: function(c, a, b, d) { (b = (d = this.$)[a]) && b.Die();
        d[a] = c
    },
    del: function(a) {
        delete this.$[a.R + "_" + a.C + "_" + a.PKind]
    },
    MakeFog: function() {
        var d = "",
        g = tx = ri = cj = 0,
        c = oGd.$Fog,
        b, a = 2 * oS.HaveFog + 3,
        e = (function() {
            return function(f) {
                var h = $User.Browser.IE && !$User.Browser.IE9;
                d += '<img id="' + f + '" src="images/interface/fog' + Math.floor(Math.random() * 4) + "." + (h ? "gif": "png") + '" style="left:' + g + "px;top:" + tx + 'px">'
            }
        })();
        for (ri = 1, tx = 0; ri < 7; g = 0, ri++) {
            for (ci = 0; ci <= a; ci++) {
                e(c[b = ri + "_" + ci] = "Fog" + b);
                g += 35
            }
            tx += 90
        }
        NewEle("dFog", "div", "", {
            innerHTML: d
        },
        EDAll)
    },
    MoveFogLeft: function(a) { (function(c, d, b, e) {
            d -= 50;
            d > b ? (c.style.left = d + "px", oSym.addTask(5, arguments.callee, [c, d, b, e])) : (c.style.left = b + "px", e && e())
        })($("dFog"), 900, GetX(oS.C - oS.HaveFog) - 30, a)
    },
    MoveFogRight: function() {
        if (arguments.callee.caller.caller == null) {
            return
        } (function(a, b) { (b += 50) < 901 ? (a.style.left = b + "px", oSym.addTask(5, arguments.callee, [a, b])) : a.style.left = "900px"
        })($("dFog"), GetX(oS.C - oS.HaveFog) - 3)
    },
    GatherFog: function(d, r, x, t, z) {
        var c = d - x,
        b = d + x,
        q = r - t,
        p = r + t,
        e = [SetNone, SetBlock][z],
        w = oS.C,
        m = oS.R,
        h = w + 1,
        g = oS.HaveFog,
        a = g * 2,
        k = [],
        l,
        j,
        u,
        n = function(i) {
            return (i - w) * 2 + a
        },
        s = function(i) {
            return (i - w) * 2 + a - 2
        };
        if (c > 0) {
            l = s(q > 0 ? q + 1 : 1);
            j = n(p > h ? h: p - 1);
            do {
                l > -1 && k.push("Fog" + c + "_" + l)
            } while ( l ++< j )
        }
        if (b <= m) {
            l = s(q > 0 ? q + 1 : 1);
            j = n(p > h ? h: p - 1);
            do {
                l > -1 && k.push("Fog" + b + "_" + l)
            } while ( l ++< j )
        }++c; --b;
        l = s(q < 1 ? 1 : q);
        j = n(p > h ? h: p);
        u = l;
        do {
            do {
                l > -1 && k.push("Fog" + c + "_" + l)
            } while ( l ++<= j );
            l = u
        } while ( c ++< b );
        for (l = 0; l < k.length; e($(k[l])), l++) {}
        if (z) {
            var y = oGd.$Torch,
            f;
            for (u in y) {
                f = $P[y[u]];
                this.GatherFog(f.R, f.C, 1, 1, 0)
            }
        }
    }
},
oZ = {
    Init: function(b) {
        this.$ = [];
        this.$R = [];
        var a;
        for (a = b; a; this.$[a] = [], this.$R[a--] = []) {}
    },
    add: function(b, a) { (a = oZ.$[b.R]).push(b);
        a.sort(function(d, c) {
            return d.AttackedLX - c.AttackedLX
        });
        a.RefreshTime = oSym.Now
    },
    getZ0: function(b, d) {
        if (d < 1 || d > oS.R) {
            return
        }
        var c = 0,
        e = this.$[d],
        f,
        a = e.length;
        while (c < a && (f = e[c++]).AttackedLX <= b) {
            if (f.PZ && f.HP && f.AttackedRX >= b) {
                return f
            }
        }
    },
    getZ1: function(h, b) {
        if (b < 1 || b > oS.R) {
            return
        }
        var d = 0,
        j = this.$[b],
        f = this.$R[b],
        g,
        c,
        k,
        e; (k = j.RefreshTime) == f.RefreshTime ? g = f: (g = (this.$R[b] = j.slice(0)).sort(function(l, i) {
            return i.AttackedRX - l.AttackedRX
        })).RefreshTime = k;
        e = g.length;
        while (d < e && (c = g[d++]).AttackedRX >= h) {
            if (c.PZ && c.HP && c.AttackedLX <= h) {
                return c
            }
        }
    },
    getArZ: function(e, d, b) {
        var g = 0,
        l = this.$[b],
        f = [],
        k = 0,
        c,
        h = l.length,
        j;
        while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
            c.PZ && c.HP && (j > e || c.AttackedRX > e) && (f[k++] = c)
        }
        return f
    },
    getRangeLeftZ: function(e, d, b) {
        if (b < 1 || b > oS.R) {
            return
        }
        var g = 0,
        l = this.$[b],
        f = [],
        k = 0,
        c,
        h = l.length,
        j;
        while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
            if (c.PZ && c.HP && (j > e || c.AttackedRX > e)) {
                return c
            }
        }
        return
    },
    moveTo: function(g, f, c) {
        var b = this.$[f],
        a = this.$[c],
        e = b.length,
        d;
        while (e--) { (o = b[e]).id == g && (b.splice(e, 1), o.R = c, a.push(o), (a.sort(function(i, h) {
                return i.AttackedLX - h.AttackedLX
            })).RefreshTime = b.RefreshTime = oSym.Now, e = 0)
        }
    },
    traversalOf: function() {
        var a, b = this.$,
        j, l = 0,
        d = 0,
        k = 1000,
        i, h, f = [function(n) {
            d = 1;
            k = i
        },
        function(n) { (i = n.AttackedLX) > k && (l = d = 1);
            k = i
        }],
        e = b.length,
        m,
        c,
        g; (function(r) {
            var q = (j = b[r]).length,
            n = arguments.callee,
            p = oT.$[r],
            s = oT.$L[r];
            while (q--) {
                a = j[q];
                a.HP && a.PZ && a.ZX < 901 && oT["chkD" + a.WalkDirection](a, r, p, s); ! a.HP ? (j.splice(q, 1), f[0](a)) : f[a.ChkActs(a, r, j, q)](a)
            }
            l ? (l = d = 0, j.sort(function(u, t) {
                return u.AttackedLX - t.AttackedLX
            }), j.RefreshTime = oSym.Now) : d && (d = 0, j.RefreshTime = oSym.Now); --r && oSym.addTask(0, n, [r])
        })(b.length - 1)
    }
},
oT = {
    Init: function(b) {
        this.$ = [];
        this.$L = [];
        for (var a = b; a;) {
            this.$[a] = [];
            this.$L[a--] = []
        }
    },
    add: function(f, c, g) {
        if (f <= 0 || f > oS.R) {
            return
        }
        var e = this.$[f],
        d = c.length,
        b;
        while (d--) {
            b = c[d];
            e.push([b[0], b[1], b[2], g])
        }
        e.sort(function(i, h) {
            return h[1] - i[1]
        });
        e.RefreshTime = new Date
    },
    chkD0: function(g, e, d, h) {
        var f = g.AttackedLX,
        c = 0,
        b, a;
        while (c < d.length && (b = d[c])[1] >= f) { (a = $P[b[3]]).canTrigger && b[0] <= f && a.TriggerCheck(g, b[2], c); ++c
        }
    },
    chkD1: function(b, e, c, g) {
        var j = b.AttackedLX,
        h = b.AttackedRX,
        f = 0,
        m, l, d, a, k; (l = c.RefreshTime) == g.RefreshTime ? m = g: (m = (this.$L[e] = c.slice(0)).sort(function(n, i) {
            return n[0] - i[0]
        })).RefreshTime = l;
        while (f < m.length && (d = m[f])[0] <= h) { (a = $P[d[3]]).canTrigger && d[1] >= h && a.TriggerCheck(b, d[2], f); ++f
        }
    },
    delP: function(e) {
        var b = e.oTrigger,
        f = e.id,
        d, a, c;
        for (d in b) {
            for (c = (a = this.$[d]).length; c--; a[c][3] == f && a.splice(c, 1)) {}
            a.RefreshTime = new Date
        }
    },
    indexOf: function(j, d) {
        var f = new RegExp(d + ",", "g"),
        h = (j.toString() + ",").replace(f, "┢,").replace(/[^,┢]/g, ""),
        i = 0,
        g = 0,
        b = [];
        for (; (g = h.indexOf("┢", g)) > 0; b.push((g++-i++-2) / 3)) {}
        return b
    }
},
asyncInnerHTML = function(d, c, a) {
    var b = $n("div"),
    e = document.createDocumentFragment();
    b.innerHTML = d; (function(g) {
        var f = arguments.callee;
        g--?(e.appendChild(b.firstChild), setTimeout(function() {
            f(g)
        },
        0)) : c(e, a)
    })(b.childNodes.length)
},
WhichMouseButton = function(a) {
    a = window.event || a;
    var b = $User.Browser;
    return ! b.Gecko ? $SEql(a.button, {
        1 : 1,
        0 : b.IE ? 2 : 1,
        2 : 2,
        "default": 1
    }) : $SEql(a.which, {
        1 : 1,
        3 : 2,
        "default": 1
    })
},
GroundOnmousedown = function(i) {
    i = window.event || i;
    var a = i.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
    k = i.clientY + EBody.scrollTop || EElement.scrollTop,
    g = ChosePlantX(a),
    h = ChosePlantY(k),
    d = g[0],
    c = h[0],
    f = h[1],
    b = g[1],
    j = GetAP(a, k, f, b);
    switch (oS.Chose) {
    case 1:
        WhichMouseButton(i) < 2 ? GrowPlant(j[0], d, c, f, b) : (CancelPlant());
        break;
    case - 1 : WhichMouseButton(i) < 2 ? (PlayAudio("plant2"), ShovelPlant(j)) : (CancelShovel())
    }
},
GetAP = function(a, h, d, c) {
    var f, i = oGd.$,
    e, g = [],
    b;
    for (f = 0, len = 4; f < len; g.push(e = i[d + "_" + c + "_" + f++]), e && !(a < e.pixelLeft || a > 
e.pixelRight || h < e.pixelTop || h > e.pixelBottom) && (b = e)) {}
    return [g, b]
},
GroundOnkeydown = function(b) {
    var a;
    if ((a = (b || event).keyCode) == 27) {
        switch (oS.Chose) {
        case 1:
            CancelPlant();
            break;
        case - 1 : CancelShovel()
        }
        return (false)
    } else { ! oS.Chose && KeyBoardGrowPlant(a)
    }
},
KeyBoardGrowPlant = function(b, a) {
    a = a || 0;
    if (b > 47 && b < 58) {
        switch (a) {
        case 0:
            ChosePlant({
                clientX:
                450,
                clientY: 300
            },
            String.fromCharCode(b))
        }
    }
},
GroundOnmousemove = function() {},
GroundOnmousemove1 = function(j) {
    j = window.event || j;
    var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
    b = j.clientY + EBody.scrollTop || EElement.scrollTop,
    k = oS.ChoseCard,
    h = ChosePlantX(d),
    i = ChosePlantY(b),
    f = h[0],
    c = i[0],
    g = i[1],
    a = h[1],
    m = GetAP(d, b, g, a);
    var l = ArCard[k].PName.prototype;
    SetStyle($("MovePlant"), {
        left: d - 0.5 * (l.beAttackedPointL + l.beAttackedPointR) + "px",
        top: b + 20 - l.height + "px"
    });
    l.CanGrow(m[0], g, a) ? SetStyle($("MovePlantAlpha"), {
        visibility: "visible",
        left: f + l.GetDX() + "px",
        top: c - l.height + l.GetDY(g, a, m[0]) + "px"
    }) : SetHidden($("MovePlantAlpha"))
},
GroundOnmousemove2 = function(k) {
    k = window.event || k;
    var d = k.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
    b = k.clientY + EBody.scrollTop || EElement.scrollTop,
    m = oS.ChoseCard,
    h = ChosePlantX(d),
    i = ChosePlantY(b),
    f = h[0],
    c = i[0],
    g = i[1],
    a = h[1],
    n = GetAP(d, b, g, a);
    var j = n[1],
    l = j ? j.id: "",
    p = oS.MPID;
    p != l && (p && SetAlpha($(p).childNodes[1], 100, 1), (oS.MPID = l) && SetAlpha($(l).childNodes[1], 60, 0.6));
    SetStyle($("tShovel"), {
        left: d - 15 + "px",
        top: b - 16 + "px"
    })
},
DisplayZombie = function() {
    var d = oP.AZ.slice(0),
    b = d.length,
    c,
    g,
    h = $("dZombie"),
    f = [],
    e = [],
    a;
    while (b--) {
        d[b][0].prototype.CanDiaplay == 0 && d.splice(b, 1)
    }
    c = b = d.length;
    while (c--) {
        f.push(Math.floor(150 + Math.random() * 444))
    }
    f.sort(function(j, i) {
        return j - i
    });
    while (b) {
        g = d[a = Math.floor(Math.random() * b)][0].prototype;
        g.CanDisplay ? (d.splice(a, 1), e[b--] = g.getHTML("", Math.floor(50 + Math.random() * 201) - g.width * 0.5, f[b] - g.height, 1, "block", "auto", g.GetDTop, g.PicArr[g.StandGif])) : --b
    }
    asyncInnerHTML(e.join(""),
    function(i) {
        h.appendChild(i)
    })
},
AutoSelectCard = function() {
    var c = oS.ArCard,
    b = -1,
    a = c.length;
    while (++b < a) {
        SelectCard(c[b].prototype.EName)
    }
},
InitPCard = function() {
    var d = "",
    f, e = oS.ArCard,
    a = e.length,
    b = 0,
    c;
    while (b < a) {
        f = e[b];
        c = f.prototype;
        if (!c.CanSelect) {++b;
            continue
        }
        ArPCard[EName = c.EName] = {
            Select: 0,
            PName: f
        };
        d += '<div class="span1" id="Card' + EName + '" onmouseout="SetHidden($(\'dTitle\'))" onmousemove="ViewCardTitle(' + EName + ',event)" onclick="SelectCard(\'' + EName + '\')"><img src="' + c.PicArr[0] + '"><span class="span2">'  + "</span></div>";
        b++%6 == 5 && (d += "<br>")
    }
    $("dPCard").innerHTML = d
},
InitHandBookPCard = function() {
    PlayAudio("gravebutton");
    var d = "",
    g, f, e = [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKlep, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oCactus, oPlantern, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oSeaShroom, oOxygen, ostar, oTTS, oGun, oSeaAnemone, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock, oTenManNut, oSnowRepeater, oLing, oLotusRoot, oMagneticmuShroom, oLaserBean, oBigChomper, oFlamesMushroom],
    a = e.length,
    b = 0,
    c;
    while (b < a) {
        g = e[b];
        c = g.prototype;
        f = c.EName;
        d += '<div class="span1" onclick="ViewProducePlant(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
        b++%6 == 5 && (d += "<br>")
    }
    $("dHandBookPCard").innerHTML = d;
    ViewProducePlant(e[0]);
    $("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
    SetVisible($("dHandBookPZ"));
    SetNone($("dHandBookZ"));
    SetBlock($("dHandBookP"))
},
InitHandBookZCard = function() {
    PlayAudio("gravebutton");
    var d = "",
    g, f, e = [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFlagZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oHeiFootballZombie, oDancingZombie,oBackupDancer,oDuckyTubeZombie1, oSnorkelZombie, oZomboni, oDolphinRiderZombie, oBalloonZombie, oJackinTheBoxZombie, oImp,oCZombie, oCConeheadZombie,oCBucketheadZombie,oEunZombie, othugZombie, oZZ, oEmperor, oCXZombie, oXBZombie, oJX, oJY, oLGBOSS, oWarshipsZombie, oSubZombie, oWJY,oMustacheZombie,oTrashZombie,oLionDanceZombie],
    a = e.length,
    b = 0,
    c;
    while (b < a) {
        g = e[b];
        c = g.prototype;
        f = c.EName;
        d += '<div class="span1" onclick="ViewProduceZombie(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
        b++
    }
    $("dHandBookZCard").innerHTML = d;
    ViewProduceZombie(e[0]);
    $("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
    SetVisible($("dHandBookPZ"));
    SetNone($("dHandBookP"));
    SetBlock($("dHandBookZ"))
},
ViewProducePlant = function(b) {
    PlayAudio("plant1");
    var a = b.prototype;
    $("pHandBookPlant").style.backgroundImage = "url(" + a.PicArr[a.StaticGif] + ")";
    $("dProducePlant").innerHTML = a.Produce;
    innerText($("dHandBookPlantName"), a.CName);
    innerText($("spSunNum"), a.SunNum);
    innerText($("spCoolTime"), a.coolTime + "秒");
    $("pPlantBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0"
},
ViewProduceZombie = function(b) {
    PlayAudio("plant1");
    var a = b.prototype;
    $("pHandBookZombie").style.background = "url(" + a.PicArr[a.StaticGif] + ") no-repeat scroll " + a.BookHandPosition;
    $("dProduceZombie").innerHTML = a.Produce;
    innerText($("dHandBookZombieName"), a.CName);
    $("pZombieBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0"
},
SelectCard = function(c) {

    var h = $("Card" + c).childNodes,
    f = h[0],
    b = ArPCard[c],
    i = b.PName.prototype,
    g,
    a,
    j,
    e = $("btnOK");
    if (!b.Select) {
        if (! (ArPCard.SelNum |= 0)) {
            e.disabled = "";
            e.style.color = "#FC6"
        } else {
            if (ArPCard.SelNum > 9) {
                return
            }
        }++ArPCard.SelNum;
        b.Select = 1;
        oS.StaticCard && (g = NewEle("dCard" + c, "div", "", {
            onclick: function() {
                SelectCard(c)
            }
        },
        $("dCardList")), NewImg(0, f.src, "width:100px;height:120px", g), innerText(NewEle("sSunNum" + c, "span", 0, 0, g), i.SunNum), f.style.top = "-42px")
    } else {
        b.Select = 0; ! --ArPCard.SelNum && (e.disabled = "disabled", e.style.color = "#888"); (g = $("dCard" + c)).onclick = null;
        ClearChild(g.firstChild, g.childNodes[1], g.lastChild, g);
        f.style.top = 0
    }
},
ResetSelectCard = function() {
    var b, a = $("btnOK");
    for (b in ArPCard) {
        ArPCard[b].Select && SelectCard(b)
    }
    a.disabled = "disalbed";
    a.style.color = "#888";
    PlayAudio("Close")
},
LetsGO = function() {
    var e = $("dCardList"),
    g = 0,
    k = e.childNodes.length,
    f,
    h,
    l,
    c,
    j,
    a,
    b = document.body;
    SetStyle($("dTop"), {
        left: "105px",
        top: 0
    });
    e.style.left = 0;
    SetVisible(e);
    while (g < k) { (function(d) {
            f = (j = e.childNodes[d]).id.substr(5);
            l = (h = ArPCard[f].PName).prototype;
            j.onclick = function(i) {
                ChosePlant(i, d)
            };
            j.onmouseover = function() {
                SetVisible($("dTitle"));
                ViewPlantTitle(oS.MCID = d)
            };
            j.onmouseout = function() {
                SetHidden($("dTitle"))
            };
            j.firstChild.style.top = "-60px"; (a = j.lastChild).id = "sSunNum" + d;
            innerText(a, l.SunNum);
            ArCard.push({
                DID: j.id,
                CDReady: 0,
                SunReady: 0,
                PName: h
            })
        })(g++)
    }
    b.onkeydown = function(d) {
        GroundOnkeydown(d)
    };
    b.onmousedown = function(d) {
        GroundOnmousedown(d)
    };
    b.onmousemove = function(d) {
        GroundOnmousemove(d)
    };
    SetVisible(e); ! oS.BrainsNum && CustomSpecial(oBrains, oS.R - 1, -2); (oS.StartGame ||
    function() {
        StopMusic();
        PlayMusic(oS.LoadMusic = oS.StartGameMusic);
        NewMusic(oS.LoadMusic = oS.StartGameMusic);
        SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
        oS.InitLawnMower();
        PrepareGrowPlants(function() {
            document.onkeydown = hotkey;
            oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
            BeginCool();
            oS.DKind && AutoProduceSun(50);
            oSym.addTask(1500,
            function() {
                oP.AddZombiesFlag();
                SetVisible($("dFlagMeterContent"))
            },
            [])
        })
    })();
    oS.StartTime = oSym.Now
},
ViewPlantTitle = function(b) {
    var f = $("dTitle"),
    e = ArCard[b],
    c = e.PName.prototype,
    a = c.CName; ! oS.CardKind && (a += "<br>冷却时间:" + c.coolTime + "秒<br>" + c.Tooltip, !e.CDReady && (a += '<br><span style="color:#F00">正在生长中</span>')); ! e.SunReady && (a += '<br><span style="color:#F00">没有足够的火苗</span>');
    f.innerHTML = a;
    SetStyle(f, {
        top: 60 * b + "px",
        left: (EDAlloffsetLeft + 100) + "px"
    })
},
BeginCool = function() {
    var b = ArCard.length,
    c, d, a, e;
    while (b--) {
        a = (c = (d = ArCard[b]).PName.prototype).coolTime;
        e = c.SunNum;
        switch (a) {
        case 0:
        case 7.5:
            d.CDReady = 1;
            e <= oS.SunNum && (d.SunReady = 1, $(d.DID).childNodes[0].style.top = "0");
            break;
        case 30:
            DoCoolTimer(b, 20);
            break;
        default:
            DoCoolTimer(b, 35)
        }
    }
},
ImmediatelyCool = function() {
    var b = ArCard.length,
    c, d, a, e;
    while (b--) {
        a = (c = (d = ArCard[b]).PName.prototype).coolTime;
        e = c.SunNum;
        d.CDReady = 1;
        d.SunReady = 1;
        $(d.DID).childNodes[0].style.top = 0
    }
},
MonitorCard = function(d) {
    var b = ArCard.length,
    c, a = Number(ESSunNum.innerHTML);
    a != oS.SunNum && (oS.SunNum = Math.min(a, oS.SunNum));
    if (oS.Chose < 1) {
        while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? (d.SunReady && (d.SunReady = 0), $(d.DID).childNodes[0].style.top = "-60px") : (!d.SunReady && (d.SunReady = 1), d.CDReady && ($(d.DID).childNodes[0].style.top = 0))
        }
    } else {
        while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? d.SunReady && (d.SunReady = 0) : !d.SunReady && (d.SunReady = 1)
        }
    }
    ViewPlantTitle(oS.MCID)
},
DoCoolTimer = function(c, b) {
    var a = $(ArCard[c].DID);
    NewEle("dCD1" + c, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", a);
    NewEle("dCD2" + c, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", a); (function(d, e) {
        d > 0 ? (innerText($("dCD1" + e), d), innerText($("dCD2" + e), d), oSym.addTask(50, arguments.callee, [(d - 0.5).toFixed(1), e])) : (ClearChild($("dCD1" + e), $("dCD2" + e)), ArCard[e].CDReady = 1, MonitorCard())
    })(b, c)
},
ChosePlant = function(h, d) {
    PlayAudio("seedlift");
    var g = ArCard[oS.ChoseCard = d];
    if (! (g.CDReady && g.SunReady)) {
        return
    }
    h = window.event || h;
    var b = h.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
    a = h.clientY + EBody.scrollTop || EElement.scrollTop,
    j = g.PName.prototype,
    e = ArCard.length,
    f, c = j.PicArr;
    oS.Chose = 1; ! oS.CardKind ? EditImg(NewImg("MovePlant", c[j.StaticGif], "left:" + b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR) + "px;top:" + a + 20 - j.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
        visibility: "hidden",
        filter: "alpha(opacity=40)",
        opacity: 0.4,
        zIndex: 30
    },
    EDAll) : (NewImg("MovePlant", j.PicArr[j.StandGif], "left:" + (b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR)) + "px;top:" + (a + 20 - j.height) + "px;z-index:254", EDAll), NewImg("MovePlantAlpha", j.PicArr[j.StandGif], "visibility:hidden;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll));
    while (e--) {
        $(ArCard[e].DID).childNodes[0].style.top = "-60px"
    }
    SetHidden($("dTitle"));
    GroundOnmousemove = GroundOnmousemove1
},
CancelPlant = function() {
    ClearChild($("MovePlant"), $("MovePlantAlpha"));
    oS.Chose = 0;
    MonitorCard();
    GroundOnmousemove = function() {}
},
ShovelPlant = function(a) {
    PlayAudio("plant2");
    var b = a[0],
    c = a[1];
    c && c.canShovel && (c.PKind || !(b[1] || b[2])) && (c.Die(), oS.MPID = "");
    CancelShovel()
},
ChoseShovel = function(a) {
    PlayAudio("shovel");
    WhichMouseButton(a) < 2 && (SetHidden($("imgShovel")), NewImg("tShovel", "images/interface/Shovel.png", "left:" + (a.clientX - 10) + "px;top:" + (a.clientY + document.body.scrollTop - 17) + "px;z-index:2500000000", EDAll), oS.Chose = -1, GroundOnmousemove = GroundOnmousemove2, StopBubble(a))
},
CancelShovel = function(a) {
    var b = oS.MPID;
    ClearChild($("tShovel"));
    oS.Chose = 0;
    SetVisible($("imgShovel"));
    b && SetAlpha($(b).childNodes[1], 100, 1);
    GroundOnmousemove = function() {}
},
StopBubble = function(a) {
    window.event ? event.cancelBubble = true: a.stopPropagation()
},
GrowPlant = function(l, d, c, e, b) {
    var j = oS.ChoseCard,
    f = ArCard[j],
    h = f.PName,
    k = h.prototype,
    i = k.coolTime,
    a,
    g = oGd.$LF[e];
    k.CanGrow(l, e, b) && (PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"), !oS.CardKind ? (new h).Birth(d, c, e, b, l) : asyncInnerHTML((a = new h).CustomBirth(e, b, 0, "auto"),
    function(n, m) {
        EDPZ.appendChild(n);
        m.Birth()
    },
    a), innerText(ESSunNum, oS.SunNum -= k.SunNum), i && (f.CDReady = 0, DoCoolTimer(j, k.coolTime)), oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
        left: d - 30 + "px",
        top: c - 30 + "px",
        zIndex: 3 * e + 1,
        visibility: "visible"
    })]));
    CancelPlant()
},
AutoProduceSun = function(a) {
    AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
    oSym.addTask(Math.floor(9 + Math.random() * 3) * 200, AutoProduceSun, [a])
},
AppearSun = function(h, f, e, a) {
    var b, d, g = "Sun" + Math.random(),
    c = "cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:" + h + "px;";
    switch (e) {
    case 25:
        c += "width:78px;height:78px";
        b = 39;
        break;
    case 15:
        c += "width:46px;height:46px";
        b = 23;
        break;
    default:
        c += "width:100px;height:100px";
        b = 55
    }
    a ? (d = 0, oSym.addTask(10, MoveDropSun, [g, f])) : (d = f - b - 20, c += ";top:" + d + "px", oSym.addTask(1,
    function(q, p, n, j, l, k, m, i) {
        if (ArSun[q] && ArSun[q].C) {
            SetStyle($(q), {
                left: (p = p + j * k) + "px",
                top: (n = n + Number(l[0])) + "px"
            });
            l.shift(); --m;
            m > 0 && ((l.length == 0) && (l = [8, 16, 24, 32]), oSym.addTask(i, arguments.callee, [q, p, n, j, l, k, m, ++i]))
        }
    },
    [g, h, d, Math.floor(Math.random() * 4), [ - 32, -24, -16, -8], [ - 1, 1][Math.floor(Math.random() * 2)], 8, 2]), oSym.addTask(800, DisappearSun, [g], 3));
    ArSun[g] = {
        id: g,
        N: e,
        C: 1,
        left: h,
        top: d
    };
    NewImg(g, "images/interface/Sun.gif", c, EDAll, {
        onclick: function() {
            ClickSun(this.id)
        }
    });
    oS.AutoSun && oSym.addTask(100, ClickSun, [g])
},
MoveDropSun = function(c, b) {
    var a = ArSun[c];
    a && a.C && (a.top < b - 53 ? ($(c).style.top = (a.top += 3) + "px", oSym.addTask(5, MoveDropSun, [c, b])) : oSym.addTask(800, DisappearSun, [c]))
},
DisappearSun = function(b) {
    var a = ArSun[b];
    a && a.C && (delete ArSun[b], ClearChild($(b)))
},
ClickSun = function(b) {
    PlayAudio("points");
    var a = ArSun[b];
    a && a.C && (a.C = 0, oSym.addTask(0, MoveClickSun, [b]))
},
MoveClickSun = function(b) {
    var a = 15,
    c = ArSun[b],
    e = 85,
    i = -20,
    d = c.left,
    h = c.top,
    g = Math.round((d - e) / a),
    f = Math.round((h - i) / a); (function(k, l, n, s, m, r, j, q, p) { (m -= q) > n ? (SetStyle($(k), {
            left: m + "px",
            top: (r -= p) + "px"
        }), oSym.addTask(j, arguments.callee, [k, l, n, s, m, r, j += 0.3, q, p])) : (SetStyle($(k), {
            left: n + "px",
            top: s + "px"
        }), Number(ESSunNum.innerHTML) != oS.SunNum && (oS.SunNum = Math.min(Number(ESSunNum.innerHTML), oS.SunNum)), innerText(ESSunNum, oS.SunNum = Math.min(oS.SunNum + l.N, 9990)), MonitorCard(), delete ArSun[k], oSym.addTask(20, ClearChild, [$(k)]))
    })(b, c, e, i, d, h, 1, g, f)
},
AutoClickSun = function() {
    var a, b;
    for (b in ArSun) {
        ArSun[b].C && ClickSun(b)
    }
},
ShowLargeWave = function(a) {
    PlayAudio("hugewave");
    NewImg("LargeWave", "images/interface/LargeWave.gif", "left:71px;top:249px;width:400px;height:200px;z-index:50", EDAll);
    oSym.addTask(4,
    function(b, c, d) {
        SetStyle($("LargeWave"), {
            width: (b -= 57.2) + "px",
            height: (c -= 6.8) + "px",
            left: 500 - b * 0.5 + "px",
            top: 300 - c * 0.5 + "px"
        });
        b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : (oSym.addTask(460,
        function() {
            ClearChild($("LargeWave"))
        },
        []), d && d())
    },


    [858, 102, a])
},
ShowFinalWave = function() {
    var a = function(b) {
        PlayAudio("finalwave");
        NewImg("FinalWave", "images/interface/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
        oSym.addTask(4,
        function(c, e, d) {
            SetStyle($("FinalWave"), {
                width: (c -= 50.4) + "px",
                height: (e -= 14.2) + "px",
                left: 500 - c * 0.5 + "px",
                top: 300 - e * 0.5 + "px"
            });
            c > 252 ? oSym.addTask(4, arguments.callee, [c, e, d]) : oSym.addTask(d,
            function() {
                ClearChild($("FinalWave"))
            },
            [])
        },
        [756, 213, b])
    }; (oP.FlagNum in oS.LargeWaveFlag) ? ShowLargeWave(function() {
        oSym.addTask(560, a, [150])
    }) : a(500)
},
ShowBOSS = function(a) {
        PlayAudio("finalwave");
    NewImg("ShowBOSS", "images/interface/BOSSWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
    oSym.addTask(4,
    function(b, c, d) {
        SetStyle($("LargeWave"), {
            width: (b -= 57.2) + "px",
            height: (c -= 6.8) + "px",
            left: 500 - b * 0.5 + "px",
            top: 300 - c * 0.5 + "px"
        });
        b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : (oSym.addTask(460,
        function() {
            ClearChild($("ShowBOSS"))
        },
        []), d && d())
    },
    [858, 102, a])
},
GameOver = function(a) {

    StopMusic(); ! a ? (StopAudio("Boss"), PlayAudio("scream"), NewImg("iGameOver", "images/interface/ZombiesWon.png", "width:900px;height:600px;z-index:280", EDAll, {
        onclick: function() {
            SelectModal(oS.Lvl);
            CSpeed(1,10,1)
        }
    })) : (PlayAudio("losemusic", false), $("dSmallContainer").onclick = function() {
        SetNone($("dSurface"), $("dSmallContainer"), $("dMsgFailed"));
        SelectModal(oS.Lvl);
        CSpeed(1,10,1);
        $("dSmallContainer").onclick = null
    },
    SetBlock($("dSurface"), $("dSmallContainer"), $("dMsgFailed")));
    oSym.Stop()
},

GameOver1 = function() {
    PlayAudio("scream");
    StopMusic();
    ShowNameDiv();
    NewImg("iGameOver", "images/interface/GameOver1.png", "width:900px;height:600px;z-index:255", EDAll, {
        onclick: function() {
            SelectModal(oS.Lvl);
            CSpeed(1,10,1)
        }
    });
    oSym.Stop()
},
HelloBOSS = function() {
    PlayAudio("僵王来袭");
    oSym.addTask(60,
    function(){
        StopMusic();
        PlayAudio("Boss", true);
    })
},
SeeZombie = function(a) {
    var R,C,tzombie,AHTML=[],AO=[];
    if(a){}else{
        var a = oFootballZombie;
    };
    for(R=1;R<=oS.R;R++){
        for(C=9;C<=oS.C;C++){
            AO.push(tzombie=new a);
            AHTML.push(tzombie.CustomBirth(R,C,0,0,0));
        }
    }
    oP.AppearUP(AHTML,AO,AO.length);
},
PrepareGrowPlants = function(a) {
    var b = function() {
        PlayAudio("readysetplant");
        oSym.addTask(60,
        function(d, c) {
            var e = d.style;
            e.backgroundPosition = "0 -108px";
            oSym.addTask(40,
            function(g, h, f) {
                h.backgroundPosition = "0 -216px";
                oSym.addTask(100,
                function(j, i) {
                    ClearChild(j);
                    i()
                },
                [g, f])
            },
            [d, e, c])
        },
        [NewEle(0, "div", "position:absolute;overflow:hidden;background:url(images/interface/PrepareGrowPlants.png) no-repeat;width:255px;height:108px;z-index:50;left:" + (oS.W * 0.5 - 77) + "px;top:" + (oS.H * 0.5 - 54) + "px", 0, EDAll), a]);
    };
    oS.HaveFog ? oGd.MoveFogLeft(b) : b();
},
CustomPlants = function(b, a, c) { (new ArCard[b].PName).Birth(GetX(c), GetY(a), a, c, [])
},
CustomSpecial = function(c, b, d, a) { (new c).Birth(GetX(d), GetY(b), b, d, [], a)
},
CheckAutoSun = function(a) {
    var b = a.checked ? 1 : 0;
    b != oS.AutoSun && (addCookie("JSPVZAutoSun", oS.AutoSun = b), b && AutoClickSun())
},
GetNewCard = function(a, b, c) {
    StopMusic();
    PlayAudio("winmusic");
    oSym.Clear(); (SetStyle(a, {
        left: "350px",
        top: "131px",
        width: "200px",
        height: "240px",
        clip: "rect(0,auto,120px,0)",
        cursor: "default"
    })).onclick = null;
    oSym.Init(function(d, e) {++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(4, arguments.callee, [d, e])) : function() {
            StopAudio("winmusic");
            PlayAudio("plantsgarden", true);
            SetHidden(EDAll, $("dTop"));
            var f = b.prototype;
            $("iNewPlantCard").src = f.PicArr[f.StaticGif];
            $("iNewPlantCard").style.marginTop = 180 - f.height + "px";
            innerText($("dNewPlantName"), f.CName);
            $("dNewPlantTooltip").innerHTML = f.Tooltip;
            $("btnNextLevel").onclick = function() {
                StopAudio("plantsgarden");
                PlayAudio("pause");
                SelectModal(c);
                CSpeed(1,10,1)
            };
            SetStyle($("dNewPlant"), {
                visibility: "visible",
                zIndex: 255
            })
        } ()
    },
    [0, $("DivA")])
},
GetWin = function(a, c) {
    StopMusic();
    ShowNameDiv();
    PlayAudio("winmusic");
    oSym.Clear(); (SetStyle(a, {
        cursor: "default"
    })).onclick = null;
    oSym.Init(function(d, e) {++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(4, arguments.callee, [d, e])) : function() {
            SelectModal(c);
            CSpeed(1,10,1)
        } ()
    },
    [0, $("DivA")])




























},
getCookie = function(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return unescape(a[2])
    }
    return 0
},
addCookie = function(b, d, e) {
    var c = b + "=" + escape(d);
    if (e) {
        var a = new Date();
        a.setTime(a.getTime + e * 3600 * 1000);
        c += ";expire=" + a.toGMTString()
    }
    document.cookie = c
},



WordUTF8 = '<div id="dLogo" style="position:absolute;width:900px;height:600px;z-index:1"><div id="LogoWord" style="position:absolute;color:#FF0;top:300px;width:100%;height:100px"><span style="position:absolute;width:278px;height:82px;left:314px;top:135px;cursor:pointer" onclick="PlayAudio(\'pause\');SetBlock($(\'dSurface\'),$(\'iSurfaceBackground\'));ShowNameDiv()"></span><div style="position:absolute;font-size:14px;left:660px;text-align:center;width:140px;top:185px;line-height:1.5;font-weight:bold"><span style="cursor:pointer"><span id="" style=""></span></span></div></div><div style="position:absolute;width:74px;height:41px;left:807px;top:502px;cursor:pointer;z-index:300" onclick="PlayAudio(\'pause\');SetVisible($(\'dProcess\'))"></div></div>',
ShowNameDiv = function() {
    oSym.Start(); (function(c) {
        var b = c[0],
        d = 3;
        c.shift();
        while (d--) {

        }
        c.length && oSym.addTask(b[3], arguments.callee, [c])
    })([[ - 260, 96, 136, 10], [ - 94, 96, 136, 10], [ - 6, 127, 176, 10], [ - 8, 134, 188, 17], [ - 8, 130, 179, 17], [ - 8, 136, 189, 17], [ - 8, 134, 187, 10]])
},
ShowLoginDiv = function() {
    $User.isAuthorWebsite ? (PlayAudio("tap"), SetBlock($("dLogin"))) : GotoAuthorWebsite("")
},
GameLogin = function(h) {
    if (!CheckLogin()) {
        return (alert(""))
    }
    var a, g, f, b = $User.Visitor,
    e = $User.Server,
    d = e.List,
    c;
    if (!h && $("txtName").value == b.UserName) {
        return (alert(""))
    }
    SetVisible($("dLoadUserName"));
    SetHidden($("dLoginButton"), $("dRegButton"));
    ClearChild($("JSPVZAjax"));
    NewEle("JSPVZAjax", "script", 0, {
        src: d[e.DataInx][1] + "asp/User" + (h ? "Reg": "Login") + ".asp?l=" + escape(oS.LevelName) + "&Username=" + $("txtName").value + "&UserPass=" + $("txtPass").value,
        type: "text/javascript"
    },
    document.body)
},
GameLogout = function() {
    var a = $User.Visitor,
    c = $("dAdventure"),
    d = $User.Server,
    b = d.List;
    ClearChild($("JSPVZAjax")),
    NewEle("JSPVZAjax", "script", 0, {
        src: b[d.DataInx][1] + "asp/UserLogout.asp",
        type: "text/javascript"
    },
    document.body),
    SetNone($("dLogin"));
    SetHidden($("dLoadUserName"));
    SetVisible($("dLoginButton"), $("dRegButton"));
    a.UserName = "玩家";
    a.UserAuthority = 0;
    a.Progress = 1;
    $("dName").innerHTML = "&lt;玩家&gt;";
    c.className = "adventure0";
    c.innerHTML = "";
    $("txtName").value = $("txtPass").value = "";
    $("IF2").src = $User.Server.DataURL + ""
},
CheckLogin = function() {
    var c = $("txtName").value,
    e = $("txtPass").value,
    a = /^\w{3,10}$/,
    b = /^[\u4e00-\u9fa5\w]{3,10}$/,
    d = /^\w{3,20}$/;
    return (a.exec(c) || b.exec(c)) && d.exec(e) ? true: false
},
SelectModal = function(g) {
    HiddenLevel();


    StopMusic();
    PausedAudioArr = [];
    g == undefined && (g = $User.Visitor.Progress);
    oS.LvlClearFunc && oS.LvlClearFunc();
    var b = oS.GlobalVariables,
    c = oS.LvlVariables,
    e = oS.SelfVariables,
    a = window,
    d;
    for (d in b) {
        a[d] = b[d]
    }
    for (d in c) {
        a[d] = null
    }
    for (d = e.length; d--; delete oS[e[d]]) {}
    for (d in $Pn) {
        $Pn[d] = null
    }
    oS.GlobalVariables = {};
    oS.LvlVariables = {};
    oS.SelfVariables.length = 0;
    SetHidden($("dCardList"), $("tGround"), $("dSelectCard"), $("dTop"), $("dMenu"), $("dNewPlant"), $("dProcess"));
    SetNone($("dSurface"), $("iSurfaceBackground"));
    ClearChild($("dFlagMeterTitleB").firstChild);
    EDAll = $("dBody").replaceChild(EDNewAll, EDAll);
    $("dBody").replaceChild(EDNewFlagMeter, $("dFlagMeter"));
    LoadLvl(g)
},




InitGame = function() {
    var e = NewEle("dServer", "div", "position:absolute;line-height:28px;left:706px;top:245px;width:700px;height:100px;font-size:16px;color:#040;font-family:黑体;font-weight:bold;z-index:2;display:none", 0, $("dAll")),
    c = $User.Server,
    b = c.List,
    a = $("dProcess"); ! $("dText1") && a.insertBefore(NewEle("dText1", "div", 0, {

    },
    0), a.firstChild);
       LoadLvl()
},
LoadLvl = function(e, c) {
    oSym.Timer && oSym.Stop();
    var b = oSym.Now == c,
    d = $User,
    a = d.Visitor;
    oS.CenterContent && ((e == 0 && b || e != 0) && (oS.DisplayAD = true, SetBlock($("dAdFlash"), $("dAD2"))));
    e = e || 0;
    $("dServer") && e != 0 && SetNone($("dServer"));
    oSym.Init(function(g, f) { (f = $("JSPVZ")) && ClearChild(f);
        NewEle("JSPVZ", "script", 0, {
            src: "level/" + (oS.Lvl = g) + ".js",
            type: "text/javascript"
        },
        document.getElementsByTagName("head").item(0))
    },
    [e && b ? 0 : e])

},
AppearTombstones = function(n, e, m) {
    var r = oGd.$Tombstones,
    k = [],
    h = oS.R + 1,
    b,
    d = 0,
    q,
    a,
    g,
    f,
    s = oGd.$,
    l,
    p;
    while (--h) {
        g = e;
        while (g >= n) { ! r[h + "_" + g] && (k[d++] = [h, g]); --g
        }
    }
    while (m--) {
        q = k[g = Math.floor(Math.random() * k.length)];
        r[p = (h = q[0]) + "_" + (b = q[1])] = 1;
        for (f = 0, len = 4; f < len; f++) { (l = s[p + "_" + f]) && l.Die()
        }
        k.splice(g, 1);
        a = NewEle("dTombstones" + h + "_" + b, "div", "position:absolute;width:86px;height:91px;left:" + (GetX(b) - 43) + "px;top:" + (GetY(h) - 91) + "px", 0, EDAll);
        h = Math.floor(Math.random() * 4);
        b = Math.floor(Math.random() * 2);
        var c; (a.appendChild(c = (NewEle("", "div", "background-position:-" + 86 * h + "px -" + 91 * b + "px", {
            className: "Tom1"
        },
        a)).cloneNode(false))).className = "Tom2"
    }
},
ResetGame = function(b) {
    AllAudioPauseCanceled();
    var a = oSym;
    a.Start();

    $("dMenu1").onclick = ClickMenu;
    SetNone($("dSurface"))

},
PauseGame = function(c, a) {
    var b = oSym;
    AllAudioPaused();
    b.Stop();

    $("dMenu1").onclick = null; ! a && SetBlock($("dSurface"));
},
ClickMenu = function() {
    oSym.Timer && (AllAudioPaused(), PlayAudio("pause"), oSym.Stop(), SetBlock($("dSurface")), innerText($("dMenu0"), ""), ShowOptions())
},
AcrossWorldUi = function() {
    PlayAudio("pause");
    SetVisible($("AcrossWorldUi"))
}
OptionsMenuDown = function(b, a) {
    b.className = "OptionsMenuButtonDown";
    a.style.lineHeight = "102px"
},
OptionsMenuUP = function(b, a) {
    b.className = "OptionsMenuButton";
    a.style.lineHeight = "100px"
},
ShowSpeed = function() {
    var b = oSym;
    b.Stop();
    AllAudioPaused();
    PlayAudio("pause");
    SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
    SetBlock($("dSpeedContainer"))
},
HiddenSpeed = function() {
    PlayAudio("Close");
    SetNone($("dSpeedContainer"));
    oS.Lvl && (ResetGame($("dMenu0")));
    AllAudioPauseCanceled()
},
CSpeed = function(a, c, b) {
    PlayAudio("bottom");
    $User.Visitor.NowStep = oSym.NowStep = a;
    $User.Visitor.TimeStep = oSym.TimeStep = c;






},
HiddenLevel = function() {

    SetNone($("dOptionsMenuback"));
    oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")))
},

















HiddenOptions = function() {
    var b = oSym;
    b.Stop();

    PlayAudio("Close");
    SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
    oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")))
},
ViewDiary = function() {
    SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
    oS.Lvl ? (AllAudioPaused(), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), "回到游戏"), $("dMenu1").onclick = null) : (AllAudioPaused());
    PlayAudio("pause");
    PlayAudio("菊次郎的夏天");

    SetVisible($("Diary"))
},
CloseDiary = function() {
    PlayAudio("Close");
    StopAudio("菊次郎的夏天");






    oS.Lvl ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
    SetHidden($("Diary"));
    SelectModal(0);
    SetBlock($('dSurface'),$('iSurfaceBackground'));


},
CloseAcrossWorld = function() {
    PlayAudio("Close");
    SetHidden($("AcrossWorldUi"));

},
CloseNewPlant = function() {
    PlayAudio("bottom");
    StopAudio("plantsgarden");
    SetHidden($("dNewPlant"));
    SelectModal('森林选关1');

},
$ = function(a) {
    return document.getElementById(a)
},
$n = function(a) {
    return document.createElement(a)
},
ClearChild = function() {
    var a = arguments.length,
    c;
    while (a--) {
        try {
            c = arguments[a];
            c.parentNode.removeChild(c);
            c = null
        } catch(b) {}
    }
},
SetBlock = function() {
    var a = arguments.length;
    while (a--) {
        arguments[a].style.display = "block"
    }
},
SetNone = function() {
    var a = arguments.length;
    while (a--) {
        arguments[a].style.display = "none"
    }
},
SetHidden = function() {
    var a = arguments.length;
    while (a--) {
        arguments[a].style.visibility = "hidden"
    }
},
SetVisible = function() {
    var a = arguments.length;
    while (a--) {
        arguments[a].style.visibility = "visible"
    }
},
SetAlpha = $User.Browser.IE6 ?
function(c, b, a) {
    c.style.filter = "alpha(opacity=" + b + ")"
}: function(c, b, a) {
    c.style.opacity = a
},
SetStyle = function(d, b) {
    var c = d.style,
    a;
    for (a in b) {
        c[a] = b[a]
    }
    return d
},
NewImg = function(f, e, b, c, d) {
    var a = $n("img");
    a.src = e;
    b && (a.style.cssText = b);
    if (d) {
        for (v in d) {
            a[v] = d[v]
        }
    }
    f && (a.id = f);
    c && c.appendChild(a);
    return a
},
EditImg = function(e, f, c, b, a) {
    f && (e.id = f);
    c && (e.src = c);
    b && SetStyle(e, b);
    a && a.appendChild(e);
    return e
},
NewEle = function(h, b, d, a, e, f, g, c) {
    g = $n(b);
    h && (g.id = h);
    d && (g.style.cssText = d);
    if (a) {
        for (c in a) {
            g[c] = a[c]
        }
    }
    if (f) {
        for (c in f) {
            g.setAttribute(c, f[c])
        }
    }
    e && e.appendChild(g);
    return g
},
EditEle = function(g, f, a, e, b, c) {
    if (f) {
        for (c in f) {
            g.setAttribute(c, f[c])
        }
    }
    a && SetStyle(g, a);
    if (b) {
        for (c in b) {
            g[c] = b[c]
        }
    }
    e && e.appendChild(g);
    return g
},
NewO = function(b, a) {
    return (a = function() {}).prototype = b,
    a
},
SetPrototype = function(d, c, a) {
    a = d.prototype;
    for (var b in c) {
        a[b] = c[b]
    }
},
InheritO = function(d, i, c, g, b, h, f, e, a) {
    var g = function() {};
    g.prototype = new d;
    i && SetPrototype(g, i);
    if (c) {
        a = g.prototype;
        for (f in c) {
            b = a[f].slice(0);
            h = c[f];
            for (e in h) {
                b[e] = h[e]
            }
            g.prototype[f] = b
        }
    }
    return g
},
Compare = function(e, b, a, c, d) {
    return d = e < b ? b: e > a ? a: e,
    c ? [c(d), d] : [d]
},
$Switch = function(h, d, c, a, g, b, e) {
    b = 0;
    g = d.length;
    e = c;
    while (b < g) {
        if (e(h, d[b])) {
            break
        }++b
    }
    return a[b]
},
$SEql = function(c, b, a) {
    return (c in b) ? b[c] : b["default"]
};
$SSml = function(d, c, a) {
    var b = 0;
    LX = c.length;
    while (b < LX) {
        if (d < c[b]) {
            break
        }++b
    }
    return a[b]
},
$SGrt = function(d, c, a) {
    var b = 0;
    LX = c.length;
    while (b < LX) {
        if (d > c[b]) {
            break
        }++b
    }
    return a[b]
},
ImgSpriter = function(h, c, e, f, g) {
    var b = e[f],
    d = b[2],
    a = $(h);
    a && (a.style.backgroundPosition = b[0], oSym.addTask(b[1],
    function(j) {
        j > -1 ? ImgSpriter(h, c, e, j, g) : g(h, c)
    },
    [d]))
},





















NewMusic = $User.HTML5 ?
function(a) {
    NewAudio({
        autoplay: true,
        loop: true,
        source: a
    })
}: function(a) { 
},
PauseMusic = $User.HTML5 ?
function() {
    var a = oAudio[oS.LoadMusic];
    a.currentTime = 0;
    a.pause()
}: function() {
    $("oEmbed").innerHTML = ""
},


























































oAudio = {},
PausedAudioArr = [],
NewAudio = $User.HTML5 ?
function(b) {
    var a = b.source;
    if (oAudio[a]) {
        return
    }
    var f = document.createElement("audio"),
    c = b.autoplay,
    g = b.loop,
    m,
    h = {
        mp3: "audio/mpeg"
    },
    k = b.preload,
    l = b.callback,
    j = ["mp3"],
    e = j.length,
    d;
    f.autoplay = c ? true: false;
    g && f.addEventListener("ended",
    function() {
        f.play()
    },
    false);
    while (e--) { (m = document.createElement("source")).type = h[d = j[e]];
        m.src = "audio/" + a + ".mp3";
        f.appendChild(m)
    }
    f.preload = k == undefined ? "auto": ["auto", "meta", "none"][k];
    f.muted = oS.Silence;
    l && f.addEventListener("canplaythrough", l, false);
    return (oAudio[a] = f)
}: function() {},
PlayMusic = $User.HTML5 ?
function(b) {
    var a = oAudio[b];
    if (a) {
        try {
            a.currentTime = 0
        } catch(c) {}
        a.play()
    } else {
        NewMusic(b);
        oAudio[b].play()
    }
}: function(a) {
    NewMusic(a)
},
PlayAudio = $User.HTML5 ?
function(c, a) {
    var b = oAudio[c];
    b ? (b.loop = !!a, b.play()) : (NewAudio({
        source: c,
        loop: !!a
    })).play()
}: function() {},
PauseAudio = $User.HTML5 ?
function(a) {
    oAudio[a].pause()
}: function() {},
StopMusic = $User.HTML5 ?
function() {
    var a = oAudio[oS.LoadMusic];
    try {
        a.currentTime = 0
    } catch(b) {}
    a.pause()
}: function() {},
StopAudio = $User.HTML5 ?
function(b) {
    var a = oAudio[b];
    try {
        a.currentTime = 0
    } catch(c) {}
    a.pause()
}: function() {},
AllAudioPaused = $User.HTML5 ?
function() {
    var a, b;
    for (a in oAudio) {
        b = oAudio[a]; ! (b.paused || b.ended) && (PausedAudioArr.push(a), b.pause())
    }
}: function() {},
AllAudioPauseCanceled = $User.HTML5 ?
function() {
    var a = PausedAudioArr.length;
    while (a--) {
        oAudio[PausedAudioArr[a]].play()
    }
    PausedAudioArr.length = 0
}: function() {},
AllAudioMuted = function() {
    var a;
    for (a in oAudio) {
        oAudio[a].muted = true
    }
},
AllAudioMuteCanceled = function() {
    var a;
    for (a in oAudio) {
        oAudio[a].muted = false
    }
},
CheckSilence = $User.HTML5 ?
function(a) {
    var b = a.checked ? 1 : 0;
    b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? AllAudioMuted() : AllAudioMuteCanceled())
}: function(a) {
    var b = a.checked ? 1 : 0;
    b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? PauseMusic() : NewMusic(oS.StartGameMusic))
},
ShowOptions = function() {
    PlayAudio("pause");
    SetBlock($("dOptionsMenuback"), $("dOptionsMenu"))
},
hotkey = function (){
     var a=window.event.keyCode;
     if(a==27){ //ESC键清除预加载图
       SetNone($("preloader"), $("status"))
     };
     if(a==115){ //F4键铲子
       ChoseShovel(event)
     };
     if(a==117){ //F6暂停游戏
       ClickMenu()
     };
     if(a==32){ //空格十倍速
       CSpeed(5,5,20)
     };
     if(a==13){ //调出测试关卡
       SelectModal('测试');
     };
}
