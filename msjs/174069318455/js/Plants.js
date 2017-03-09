var CPlants = NewO({
    name: "Plants",
    HP: 300,
    PKind: 1,
    beAttackedPointL: 20,
    CardGif: 0,
    StaticGif: 1,
    NormalGif: 2,
    canEat: 1,
    zIndex: 0,
    AudioArr: [],
    coolTime: 7.5,
    canShovel: true,
    CanSelect: 1,
    canTrigger: 1,
    Stature: 0,
    Sleep: 0,
    Tooltip: "",
    SunNum: 0,
    PicArr: ["", "", "images/interface/用于检测鼠标是否放在关卡按钮上.png"],
    CanGrow: function(c, b, e) {
        var a = b + "_" + e,
        d = oS.ArP;
        return d ? oGd.$LF[b] == 1 ? (e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]
    },
    getHurt: function(e, c, b) {
        var d = this,
        a = d.id; ! (c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die()
    },
    GetDY: function(b, c, a) {
        return a[0] ? -21 : -15
    },
    GetDX: function() {
        return - Math.floor(this.width * 0.5)
    },
    GetDBottom: function() {
        return this.height
    },
    Birth: function(d, c, h, a, m, n) {
        var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = e.id = "P_" + Math.random(),
        j = e.zIndex += 3 * h,
        f = NewEle(0, "div", "position:absolute");
        NewImg(0, ShadowPNG, e.getShadow(e), f);
        NewImg(0, e.PicArr[e.NormalGif], "", f);
        e.pixelLeft = k;
        e.pixelRight = k + e.width;
        e.pixelTop = g;
        e.pixelBottom = g + e.GetDBottom();
        e.opacity = 1;
        e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
        $P[b] = e;
        $P.length += 1;
        e.BirthStyle(e, b, f, {
            left: k + "px",
            top: g + "px",
            zIndex: j
        },
        n);
        oGd.add(e, h + "_" + a + "_" + e.PKind);
        e.PrivateBirth(e, n)
    },
    getShadow: function(a) {
        return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px"
    },
    BirthStyle: function(c, d, b, a) {
        EditEle(b, {
            id: d
        },
        a, EDPZ)
    },
    PrivateBirth: function(a) {},
    NormalAttack: function() {},
    getTriggerRange: function(a, b, c) {
        return [[b, oS.W, 0]]
    },
    getTriggerR: function(a) {
        return [a, a]
    },
    InitTrigger: function(c, b, f, a, h, g) {
        var j = {},
        i = c.getTriggerR(f),
        e = i[0],
        d = i[1];
        do {
            oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)
        } while ( e ++!= d );
        c.oTrigger = j
    },
    TriggerCheck: function(b, a) {
        this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a))
    },
    CheckLoop: function(b, c) {
        var a = this.id;
        this.NormalAttack(b);
        oSym.addTask(140,
        function(e, f, h) {
            var g; (g = $P[e]) && g.AttackCheck1(f, h)
        },
        [a, b, c])
    },
    AttackCheck1: function(g, f) {
        var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;
        if (a && a.PZ && (h = c[a.R])) {
            k = a.ZX;
            e = h.length;
            while (e--) {
                j = h[e];
                if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
                    b.CheckLoop(g, j[2]);
                    return
                }
            }
        }
        b.canTrigger = 1
    },
    AttackCheck2: function(a) {
        return a.Altitude > 0
    },
    PrivateDie: function(a) {},
    BoomDie: function() {
        var a = this,
        b = a.id;
        a.oTrigger && oT.delP(a);
        a.HP = 0;
        delete $P[b];
        delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
        $P.length -= 1;
        ClearChild($(b));
        a.PrivateDie(a)
    },
    Die: function(a) {
        var b = this,
        c = b.id;
        b.oTrigger && oT.delP(b);
        b.HP = 0;
        delete $P[c];
        delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
        $P.length -= 1; ! a && ClearChild($(c));
        b.PrivateDie(b)
    }
}),
oLawnCleaner = InheritO(CPlants, {
    EName: "oLawnCleaner",
    CName: "草地剪草机",
    width: 71,
    height: 57,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    PicArr: ["images/interface/LawnCleaner.png"],
    AudioArr: ["lawnmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getShadow: function(a) {
        return "left:" + (a.width * 0.5 - 38) + "px;top:" + (a.height - 22) + "px"
    },
    getTriggerRange: function(a, b, c) {
        return [[b, c, 0]]
    },
    TriggerCheck: function(b, a) {
        b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this))
    },
    BoomDie: function() {},
    NormalAttack: function(a) {
        PlayAudio(a.AudioArr[0]); (function(b, c, k, j, e, g) {
            var d = oZ.getArZ(k, j, e),
            f = d.length,
            h;
            while (f--) { (h = d[f]).getCrushed(b) && h.CrushDie()
            }
            k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", 
            oSym.addTask(1, 
            arguments.callee, [b, c, k, j, e, g]
            ),[this]
         )
        })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))
    }
}),
oBrains = InheritO(CPlants, {
    EName: "oBrains",
    CName: "脑子",
    width: 32,
    height: 31,
    beAttackedPointL: 0,
    beAttackedPointR: 32,
    PicArr: ["images/interface/SodRollCap.png"],
    NormalGif: 0,
    HP: 1,
    InitTrigger: function() {},
    PrivateBirth: function(a) {
        a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum),
        function(d) {
            var c, b;
            AppearSun(Math.floor((GetX(d.C) - 40) + Math.random() * 41), GetY(d.R), 50, 0); (b = --oS.BrainsNum) ? (c = b * d.DieStep, $("imgFlagHead").style.left = (c - 11) + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd())
        }) : function(b) {
            GameOver()
        }
    },
    GetDX: function() {
        return - 40
    }
}),
//庭院植物从以下开始
oPeashooter = InheritO(CPlants, {
    EName: "oPeashooter",
    CName: "小笼包",
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    SunNum: 100,
    AttackGif: 5,
    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
    PicArr: (function() {
        var a = "images/Plants/Peashooter/";
        var b = "images/Plants/";
        return ["images/Card/Peashooter.png", a + "0.gif", a + "Peashooter.gif", b + "PB00.png", b + "PeaBulletHit.gif", a + "PeashooterAttack.gif"]
    })(),
    Tooltip: "很普通的包子",
    PrivateBirth: function(a) {
        a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 13) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
    },
    PrivateDie: function(a) {
        a.BulletEle = null
    },
    NormalAttack: function() {
        var a = this,
        b = "PB" + Math.random();
        w = a.id;
        EditEle(a.BulletEle.cloneNode(false), {
            id: b
        },
        0, EDPZ);
        $(w).childNodes[1].src = a.PicArr[a.AttackGif];
        oSym.addTask(40,
        function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = a.PicArr[a.NormalGif])
        },
        [w]);
        oSym.addTask(15,
        function(d) {
            var c = $(d);
            c && SetVisible(c)
        },
        [b]);
        oSym.addTask(1,
        function(f, j, h, c, n, i, m, k, o, g) {
            var l, e = GetC(n),
            d = oZ["getZ" + c](n, i);
            m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".png");
            d && d.Altitude == 1 ? (d[{
                "-1": "getSnowPea",
                0 : "getPea",
                1 : "getFirePea"
            } [m]](d, h, c), (SetStyle(j, {
                left: o + 28 + "px"
            })).src=['images/Plants/PeaBulletHit.gif','images/Plants/PeaBulletHit2.gif'][m],oSym.addTask(10, ClearChild, [j])) : (n += (l = !c ? 5 : -5)) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
        },
        [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])
    }
}),
oPeashooter1 = InheritO(oPeashooter, {
    EName: "oPeashooter1",
    coolTime: 0
}),
oSunFlower = InheritO(CPlants, {
    EName: "oSunFlower",
    CName: "小火炉",
    width: 73,
    height: 74,
    beAttackedPointR: 53,
    SunNum: 50,
    PicArr: (function() {
        var a = "images/Plants/SunFlower/";
        return ["images/Card/SunFlower.png", a + "0.gif", a + "SunFlower.gif", a + "SunFlower1.gif"]
    })(),
    AudioArr: ["生产"],
    Tooltip: "向日葵，为你生产更多阳光的基础作物。尽可能多地种植吧！",
    BirthStyle: function(c, e, b, a) {
        var d = b.childNodes[1];
        d.src = "images/Plants/SunFlower/SunFlower.gif";
        d.style.clip = "rect(0,auto,74px,0)";
        d.style.height = "148px";
        EditEle(b, {
            id: e
        },
        a, EDPZ)
    },
    ChangePosition: function(c, a) {
        var b = c.childNodes[1];
        a ? SetStyle(b, {
            clip: "rect(74px,auto,auto,auto)",
            top: "-74px"
        }) : SetStyle(b, {
            clip: "rect(auto,auto,74px,auto)",
            top: 0
        })
    },
    PrivateBirth: function(a) {
        oS.ProduceSun ? oSym.addTask(500,
        function(d, c, b) {
            $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100,
            function(h, g, f, e) {
                $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0), oSym.addTask(100,
                function(i) {
                    $P[i] && a.ChangePosition($(i), 0)
                },
                [h]), oSym.addTask(3400, e, [h, g, f]))
            },
            [d, c, b, arguments.callee]))
        },
        [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function(f, c, b) {
            var e = this;
            switch (c) {
            case 0:
                var d = (e.HP -= b); ! (d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50,
                function(h, g) {
                    AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                },
                [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50,
                function(h, g) {
                    AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                },
                [e.C, e.R]));
                break;
            case 3:
                (e.HP -= b) < 1 && e.Die();
                break;
            default:
                e.Die(1)
            }
        }
    },
    InitTrigger: function() {}
}),
oSunFlower1 = InheritO(oSunFlower, {
    EName: "oSunFlower1",
    coolTime: 0
}),
oPotatoMine = InheritO(CPlants, {
    EName: "oPotatoMine",
    CName: "老鼠夹子",
    width: 143,
    height: 200,
    beAttackedPointL: 40,
    beAttackedPointR: 100,
    SunNum: 25,
    Stature: -1,
    HP: 8000,
    CanGrow: function(c, b, e) {
        var a = b + "_" + e,
        d = oS.ArP;
        return d ? oGd.$LF[b] == 1 ? (e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]
    },
    PicArr: (function() {
        var a = "images/Plants/PotatoMine/";
        return ["images/Card/PotatoMine.png", a + "0.gif", a + "PotatoMine.gif", a + "PotatoMineNotReady.png", a + "Boom.png"]
    })(),
    Tooltip: "敌人接触后爆炸<br>需要时间安放",
    Status: 0,
    AudioArr: ["cherrybomb"],
    canTrigger: 0,
    BirthStyle: function(d, e, c, b, a) {
        c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMineNotReady.png": (~
        function() {
            d.Status = 1;
            d.canTrigger = 1;
            d.getHurt = d.getHurt2
        } (), "images/Plants/PotatoMine/PotatoMine.gif");
        EditEle(c, {
            id: e
        },
        b, EDPZ)
    },
    getHurt2: function(d, b, a) {
        var c = this;
        b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R)
    },
    PrivateBirth: function(b, a) { ! a && oSym.addTask(1500,
        function(d) {
            var c = $P[d];
            c && ($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2)
        },
        [b.id])
    },
    getTriggerRange: function(a, b, c) {
        return [[b, c, 0]]
    },
    TriggerCheck: function(e, c) {
        var a = this.R,
        b = this.C;
        e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R)
    },
    NormalAttack: function(j, h, e) {
        var g = this,
        b = g.id,
        q = b + "_Boom";
        d = $(b),
        c = oZ.getArZ(j, h, e),
        f = c.length,
        a;
        while (f--) { (a = c[f]).Altitude < 2 && a.getExplosion()
        }
        g.Die(1);
        PlayAudio("cherrybomb");
        oSym.addTask(15, ClearChild, [d]);
        NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 2) + ";width:213px;height:210px;left:" + (g.pixelLeft-50) + "px;top:" + (g.pixelTop-10) + "px;background:url(images/Plants/PotatoMine/Boom.png) no-repeat", 0, EDPZ);
                oSym.addTask(20,
                function(i) {
                    ClearChild(i)
                },
                []);
                ImgSpriter(q, c, [["0 0", 10, 1], ["-213px 0", 10, 2], ["-426px 0", 10, 3], ["-639px 0", 10, 4], ["-852px 0", 10, 5], ["-1065px 0", 10, 6], ["-1278px 0", 10, 7], ["-1491px 0", 10, 8], ["-1704px 0", 10, 9], ["-1917px 0", 10, 10], ["-2130px 0", 10, 11], ["-2343px 0", 10, 12], ["-2556px 0", 10, 13], ["-2769px 0", 10, 14], ["-2982px 0", 10, -1]], 0,
                function(i, p) {
                    ClearChild($(i));
        })
        oSym.addTask(200,
        function(i) {
            ClearChild(i.lastChild);
            oSym.addTask(100, ClearChild, [i])
        },
        [d])
    }
}),
oPotatoMine1 = InheritO(oPotatoMine, {
    EName: "oPotatoMine1",
    coolTime: 0
}),
oPotatoMine2 = InheritO(oPotatoMine, {
    EName: "oPotatoMine2",
    CName: "冷却减少-土豆雷",
    coolTime: 5,
    Tooltip: "敌人接触后爆炸且需要时间安放<br>优化：冷却减少。"
}),
oWallNut = InheritO(CPlants, {
    EName: "oWallNut",
    CName: "吐司面包",
    width: 65,
    height: 73,
    beAttackedPointR: 45,
    SunNum: 50,
    HP: 4000,
    coolTime: 15,
    PicArr: (function() {
        var a = "images/Plants/WallNut/";
        return ["images/Card/WallNut.png", a + "0.gif", a + "WallNut.gif", a + "Wallnut_cracked1.gif", a + "Wallnut_cracked2.gif"]
    })(),
    Tooltip: "坚果墙拥有足以保护其它植物的坚硬外壳。",
    CanGrow: function(c, b, f) {
        var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
        return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d: d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    InitTrigger: function() {},
    HurtStatus: 0,
    getHurt: function(e, b, a) {
        var c = this,
        d = $(c.id).childNodes[1]; ! (b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/Wallnut_cracked1.gif") : c.Die(1)
    }
}),
oWallNut1 = InheritO(oWallNut, {
    EName: "oWallNut1",
    coolTime: 0
}),
//森林植物从以下开始
oStoneFlower = InheritO(CPlants, {
    EName: "oStoneFlower",
    CName: "朝鲜蓟",
    width: 155,
    height: 130,
    beAttackedPointL: 63,
    beAttackedPointR: 75,
    SunNum: 100,
    HP: 5500,
    canEat: 1,
    coolTime: 30,
    AudioArr: ["朝鲜蓟攻击"],
    PicArr: (function() {
        var a = "images/Plants/StoneFlower/";
        return ["images/Card/StoneFlower.png", a + "0.gif", a + "Spikeweed.gif"]
    })(),
    Attack: 40,
    ArZ: {},
    Tooltip: "僵尸啃食时对其造成伤害",
    CanGrow: function(c, b, f) {
        var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
        return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d: d && d.EName == "oStoneFlower" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    NormalAttack: function(b, a) {
        PlayAudio("朝鲜蓟攻击");
        var c = $Z[b];
        c.getHit2(c, this.Attack, 0)
    },
    getTriggerRange: function(a, b, c) {
        return [[this.pixelLeft - 80, this.pixelRight + 80, 0]]
    },
    TriggerCheck: function(i, h) {
        var c = i.id,
        g = this.ArZ,
        a, b, e, f;
        i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100,
        function(d, j) {
            var k = $P[d];
            k && delete k.ArZ[j]
        },
        [this.id, c]))
    },
    AttackCheck2: function(a) {
        return a.Altitude == 1 && a.beAttacked
    }
}),
oStoneFlower1 = InheritO(oStoneFlower, {
    EName: "oStoneFlower1",
    coolTime: 0
}),
oRadish = InheritO(CPlants, {
    EName: "oRadish",
    CName: "飞旋萝卜",
    width: 155,
    height: 130,
    beAttackedPointL: 63,
    beAttackedPointR: 75,
    SunNum: 200,
    coolTime: 30,
    AudioArr: ["飞旋萝卜攻击"],
    PicArr: (function() {
        var a = "images/Plants/Radish/";
        return ["images/Card/Radish.png", a + "0.gif", a + "FumeShroom.gif", a + "FumeShroomAttack.gif", a + "FumeShroomBullet.png"]
    })(),
    Tooltip: "穿透四格有效打击僵尸",
    PrivateBirth: function(b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/Radish/FumeShroomBullet.png);z-index:" + (b.zIndex + 1), 0, EDPZ)
    },
    PrivateDie: function(a) {
        ClearChild($(a.id + "_Bullet"))
    },
    getTriggerRange: function(a, b, c) {
        return [[b, Math.min(c + 330, oS.W), 0]]
    },
    NormalAttack: function() {
        PlayAudio("飞旋萝卜攻击");
        var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";
        while (e--) { (g = d[e]).Altitude < 2 && g.getPea(g, 80)
        }
        b.childNodes[1].src = "images/Plants/Radish/FumeShroomAttack.gif";
        SetVisible($(a));
        ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0,
        function(i, j) {
            var h = $(j);
            $P[j] && (h.childNodes[1].src = "images/Plants/Radish/FumeShroom.gif", SetHidden($(i)))
        })
    }
}),
oRadish1 = InheritO(oRadish, {
    EName: "oRadish1",
    coolTime: 0
}),
oSnowPea = InheritO(oPeashooter, {
    EName: "oSnowPea",
    CName: "寒冰射手",
    SunNum: 175,
    BKind: -1,
    width: 71,
    height: 81,
    PicArr: (function() {
        var a = "images/Plants/SnowPea/";
        var b = "images/Plants/";
        return ["images/Card/SnowPea.png", a + "0.gif", a + "SnowPea.gif", b + "PB10.png", b + "PeaBulletHit1.gif", a + "PeashooterAttack.gif"]
    })(),
    AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
    Tooltip: "寒冰射手可造成伤害, 同时又有减速效果",
    PrivateBirth: function(a) {
        a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 19) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
    },
    NormalAttack: function() {
        var a = this,
        b = "PB" + Math.random();
        w = a.id;
        EditEle(a.BulletEle.cloneNode(false), {
            id: b
        },
        0, EDPZ);
        $(w).childNodes[1].src = "images/Plants/SnowPea/PeashooterAttack.gif";
        oSym.addTask(40,
        function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = "images/Plants/SnowPea/SnowPea.gif")
        },
        [w]);
        oSym.addTask(15,
        function(d) {
            var c = $(d);
            c && SetVisible(c)
        },
        [b]);
        oSym.addTask(1,
        function(f, j, h, c, n, i, m, k, o, g) {
            var l, e = GetC(n),
            d = oZ["getZ" + c](n, i);
            m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/PB" + m + c + ".gif");
            d && d.Altitude == 1 ? (d[{
                "-1": "getSnowPea",
                0 : "getPea",
                1 : "getFirePea"
            } [m]](d, h, c), (SetStyle(j, {
                left: o + 28 + "px"
            })).src = "images/Plants/PeaBulletHit1.gif", oSym.addTask(10, ClearChild, [j])) : (n += (l = !c ? 5 : -5)) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
        },
        [b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch])
    }
}),
oSnowPea1 = InheritO(oSnowPea, {
    EName: "oSnowPea1",
    coolTime: 0
}),
oRepeater = InheritO(oPeashooter, {
    EName: "oRepeater",
    CName: "双重射手",
    width: 73,
    height: 71,
    beAttackedPointR: 53,
    SunNum: 175,
    PicArr: (function() {
        var a = "images/Plants/Repeater/";
        var b = "images/Plants/";
        return ["images/Card/Repeater.png", a + "0.gif", a + "Repeater.gif", b + "PB00.png", b + "PeaBulletHit.gif", a + "RepeaterAttack.gif"]
    })(),
    Tooltip: "双重射手能对僵尸造成成倍伤害！",
    NormalAttack1: oPeashooter.prototype.NormalAttack,
    NormalAttack: function(a) {
        this.NormalAttack1();
        oSym.addTask(15,
        function(c) {
            var b = $P[c];
            b && b.NormalAttack1()
        },
        [this.id])
    }
}),
oRepeater1 = InheritO(oRepeater, {
    EName: "oRepeater1",
    coolTime: 0
}),
oCherryBomb = InheritO(CPlants, {
    EName: "oCherryBomb",
    CName: "樱桃炸弹",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    SunNum: 100,
    coolTime: 20,
    PicArr: (function() {
        var a = "images/Plants/CherryBomb/";
        return ["images/Card/CherryBomb.png", a + "0.gif", a + "CherryBomb.gif", a + "Boom.png"]
    })(),
    AudioArr: ["cherrybomb"],
    Tooltip: "炸掉一定区域内的所有僵尸",
    InitTrigger: function() {},
    getHurt: function() {},
    BoomDie: function() {},
    PrivateBirth: function(a) {
        oSym.addTask(80,
        function(b) {
            var c = $P[b];
            q = b + "_Boom";
            if (c) {
                PlayAudio("cherrybomb");
                var f = $(b),
                j = c.R,
                g = j > 2 ? j - 1 : 1,
                e = j < oS.R ? j + 1 : oS.R,
                l = c.pixelLeft - 80,
                k = c.pixelLeft + 160,
                d,
                h;
                do {
                    h = (d = oZ.getArZ(l, k, g)).length;
                    while (h--) {
                        d[h].getExplosion()
                    }
                } while ( g ++< e );
                c.Die(1);
                oSym.addTask(15, ClearChild, [f]);
                NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 2) + ";width:216px;height:164px;left:" + (c.pixelLeft) + "px;top:" + (c.pixelTop) + "px;background:url(images/Plants/CherryBomb/Boom.png) no-repeat", 0, EDPZ);
                oSym.addTask(20,
                function(i) {
                    ClearChild(i)
                },
                []);
                ImgSpriter(q, c, [["0 0", 10, 1], ["-216px 0", 10, 2], ["-432px 0", 10, 3], ["-864px 0", 10, 4], ["-1080px 0", 10, 5], ["-1296px 0", 10, 6], ["-1512px 0", 10, 7], ["-1728px 0", 10, 8], ["-1944px 0", 10, 9], ["-2160px 0", 10, 10], ["-2376px 0", 10, 11], ["-2592px 0", 10, 12], ["-2808px 0", 10, 13], ["-3024px 0", 10, 14], ["-3240px 0", 10, 15], ["-3456px 0", 10, 16], ["-3672px 0", 10, 17], ["-3888px 0", 10, 18], ["-4104px 0", 10, 19], ["-4320px 0", 10, 20], ["-4536px 0", 10, 21], ["-4752px 0", 10, 22], ["-4968px 0", 10, 23], ["-5184px 0", 10, 24], ["-5184px 0", 10, -1]], 0,
                function(i, p) {
                    ClearChild($(i));
                })
            }
        },
        [a.id])
    }
}),
oCherryBomb1 = InheritO(oCherryBomb, {
    EName: "oCherryBomb1",
    coolTime: 0
}),
oCherryBomb2 = InheritO(oCherryBomb, {
    EName: "oCherryBomb2",
    CName: "减少冷却-樱桃炸弹",
    coolTime: 10,
    Tooltip: "炸掉一定区域内的所有僵尸<br>优化：冷却减少。"
}),
oTallNut = InheritO(oWallNut, {
    EName: "oTallNut",
    CName: "高坚果",
    width: 83,
    height: 119,
    beAttackedPointR: 63,
    SunNum: 150,
    HP: 8000,
    coolTime: 25,
    PicArr: (function() {
        var a = "images/Plants/TallNut/";
        return ["images/Card/TallNut.png", a + "0.gif", a + "TallNut.gif", a + "TallnutCracked1.gif", a + "TallnutCracked2.gif"]
    })(),
    Tooltip: "不会被跳过的坚实壁垒",
    CanGrow: function(c, b, f) {
        var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
        return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d: d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    Stature: 1,
    getHurt: function(e, b, a) {
        var c = this,
        d = $(c.id).childNodes[1]; ! (b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif") : c.Die(1)
    }
}),
//沼泽植物从以下开始
oSunShroom = InheritO(oSunFlower, {
    EName: "oSunShroom",
    CName: "阳光菇",
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    SunNum: 50,
    Stature: -1,
    HP: 1,
    PicArr: (function() {
        var a = "images/Plants/SunShroom/";
        return ["images/Card/SunShroom.png", a + "0.gif", a + "SunShroom.gif", a + "SunShroom_S.gif"]
    })(),
    Tooltip: "阳光菇也能提供阳光，但非常脆弱。",
    GetDX: CPlants.prototype.GetDX,
    GetDY: CPlants.prototype.GetDY,
    ChangePosition: function(c, a) {
        a ? SetStyle(c.childNodes[1].src = "images/Plants/SunShroom/SunShroom_S.gif") : SetStyle(c.childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif")
    },
    BirthStyle: function(c, d, b, a) {
        EditEle(b, {
            id: d
        },
        a, EDPZ)
    },
    PrivateBirth: function(a) {
        oS.ProduceSun ? oSym.addTask(500,
        function(d, c, b) {
            $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100,
            function(h, g, f, e) {
                $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0), oSym.addTask(90,
                function(i) {
                    $P[i] && a.ChangePosition($(i), 0)
                },
                [h]), oSym.addTask(3400, e, [h, g, f]))
            },
            [d, c, b, arguments.callee]))
        },
        [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function(f, c, b) {
            var e = this;
            switch (c) {
            case 0:
                var d = (e.HP -= b); ! (d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50,
                function(h, g) {
                    AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 75, 0)
                },
                [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50,
                function(h, g) {
                    AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 75, 0)
                },
                [e.C, e.R]));
                break;
            case 3:
                (e.HP -= b) < 1 && e.Die();
                break;
            default:
                e.Die(1)
            }
        }
    }
}),
oPuffShroom = InheritO(CPlants, {
    EName: "oPuffShroom",
    CName: "小喷菇",
    width: 59,
    height: 61,
    beAttackedPointL: 15,
    beAttackedPointR: 44,
    Stature: -1,
    PicArr: (function() {
        var a = "images/Plants/PuffShroom/";
        var b = "images/Plants/";
        return ["images/Card/PuffShroom.png", a + "0.gif", a + "PuffShroom.gif", a + "PuffShroomAttack.gif", b + "ShroomBullet.png", b + "ShroomBulletHit.gif"]
    })(),
    AudioArr: ["puff"],
    Tooltip: "向敌人发射短程孢子的免费植物",
    GetDX: CPlants.prototype.GetDX,
    getTriggerRange: function(a, b, c) {
        return [[b, Math.min(c + 250, oS.W), 0]]
    },
    PrivateBirth: function(a) {
        a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.png", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 35) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
    },
    PrivateDie: function(a) {
        a.BulletEle = null
    },
    NormalAttack: function() {
        var b = this,
        c = "PSB" + Math.random(),
        a = b.AttackedLX;
        w = b.id;
        EditEle(b.BulletEle.cloneNode(false), {
            id: c
        },
        0, EDPZ);
        PlayAudio("puff");
        $(w).childNodes[1].src = "images/Plants/PuffShroom/PuffShroomAttack.gif";
        oSym.addTask(40,
        function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = "images/Plants/PuffShroom/PuffShroom.gif")
        },
        [w]);
        oSym.addTask(15,
        function(e) {
            var d = $(e);
            d && SetVisible(d)
        },
        [c]);
        oSym.addTask(1,
        function(j, d, e, f, g) {
            var i = GetC(e),
            h = oZ.getZ0(e, f);
            h && h.Altitude == 1 ? (h.getPea(h, 20, 0), (SetStyle(d, {
                left: g + 38 + "px"
            })).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d)
        },
        [c, $(c), a, b.R, a - 46])
    }
}),
oScaredyShroom = InheritO(CPlants, {
    EName: "oScaredyShroom",
    CName: "胆小菇",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    SunNum: 75,
    Cry: 0,
    ArZ: [],
    Attacking: 0,
    AudioArr: ["puff"],
    PicArr: (function() {
        var a = "images/Plants/ScaredyShroom/";
        b = "images/Plants/";
        return ["images/Card/ScaredyShroom.png", a + "0.gif", a + "ScaredyShroom.gif", a + "ScaredyShroomAttack.gif", a + "ScaredyShroomCry.gif", b + "ShroomBullet.png", b + "ShroomBulletHit.gif"]
    })(),
    Tooltip: "远程射手, 但敌人靠近时会蜷缩不动",
    GetDX: CPlants.prototype.GetDX,
    getTriggerRange: CPlants.prototype.getTriggerRange,
    getTriggerR: function(c) {
        var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
        return [b, a]
    },
    TriggerCheck: function(e, c) {
        var b = this,
        a = b.id;
        e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : (e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack())
    },
    PrivateBirth: function(c) {
        var b = c.AttackedLX,
        a = b - 40;
        c.BulletClass = NewO({
            X: b,
            R: c.R,
            pixelLeft: a,
            F: oGd.MB2
        });
        c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.png", "left:" + a + "px;top:" + (c.pixelTop + 110) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
        c.MX = b + 9
    },
    PrivateDie: function(a) {
        a.BulletEle = null
    },
    NormalAttack: function() {
        var c = this,
        a = c.id,
        d = "SSB" + Math.random(),
        b = c.AttackedLX;
        EditEle(c.BulletEle.cloneNode(false), {
            id: d
        },
        0, EDPZ);
        PlayAudio("puff");
        $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomAttack.gif";
        oSym.addTask(1,
        function(k, e, f, g, h) {
            var j = GetC(f),
            i = oZ.getZ0(f, g);
            i && i.Altitude == 1 ? (i.getPea(i, 30, 0), (SetStyle(e, {
                left: h + 38 + "px"
            })).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [e])) : (f += 5) < oS.W ? (e.style.left = (h += 5) + "px", oSym.addTask(1, arguments.callee, [k, e, f, g, h])) : ClearChild(e)
        },
        [d, $(d), b, c.R, b - 46]);
        c.Attacking = 1;
        oSym.addTask(40,
        function(g) {
            var f = $(g);
            f && (f.childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif")
        },
        [a]);
        oSym.addTask(10,
        function(g, e) {
            var f = $(g);
            f && SetVisible(f);
            oSym.addTask(130,
            function(h) {
                var i = $P[h];
                i && (i.Attacking = 0)
            },
            [e])
        },
        [d, a])
    },
    CryCheck: function(a) {
        oSym.addTask(140,
        function(b) {
            var d = $P[b],
            c,
            f,
            e;
            if (d) {
                c = (f = d.ArZ).length;
                while (c--) { (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1)
                }
                f.length ? d.CryCheck(b) : (d.Cry = 0, $(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif")
            }
        },
        [a])
    }
}),
oFumeShroom = InheritO(oRadish, {
    EName: "oFumeShroom",
    CName: "大喷菇",
    SunNum: 75,
    coolTime: 7.5,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: (function() {
        var a = "images/Plants/FumeShroom/";
        return ["images/Card/FumeShroom.png", a + "0.gif", a + "FumeShroom.gif", a + "FumeShroomAttack.gif", a + "FumeShroomBullet.png"]
    })(),
    AudioArr: ["fume"],
    Tooltip: "喷射可以穿过僵尸遮挡物的气液",
    PrivateBirth: function(b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:406px;height:48px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 90) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.png);z-index:" + (b.zIndex + 1), 0, EDPZ)
    },
    NormalAttack: function() {
        PlayAudio("fume");
        var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";
        while (e--) { (g = d[e]).Altitude < 2 && g.getHit1(g, 20)
        }
        b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
        SetVisible($(a));
        ImgSpriter(a, c, [["0 0", 9, 1], ["0 -96px", 9, 2], ["0 -240px", 9, 3], ["0 -336px", 9, 4], ["0 -432px", 9, 5], ["0 -528px", 9, 6], ["0 -624px", 9, 7], ["0 -720px", 9, 8], ["0 -816px", 9, 9], ["0 -864px", 9, -1], ["0 -912px", 9, -2], ["0 -960px", 9, -3]], 0,
        function(i, j) {
            var h = $(j);
            $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif",                         SetHidden($(i)))
        })
    }
}),
oSporeShroom = InheritO(CPlants, {
    EName: "oSporeShroom",
    CName: "孢子菇",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    SunNum: 100,
    AudioArr: ["puff"],
    coolTime: 11.5,
    PicArr: (function() {
        var a = "images/Plants/SporeShroom/";
        b = "images/Plants/";
        return ["images/Card/SporeShroom.png", a + "0.gif", a + "SporeShroom.gif", a + "SporeShroomAttack.gif", a + "ScaredyShroomCry.gif", b + "ShroomBullet.png", b + "ShroomBulletHit.gif"]
    })(),
    Tooltip: "孢子菇可以在身边召唤8位小喷菇",
    PrivateBirth: function(a) {
        var R = a.R,
        C = a.C,
        R1, C1, MaxR = oS.R,
        MaxC = oS.C,
        LF = oGd.$LF,
        LFR, _$ = oGd.$,
        rc;
        for (R1 = R - 1; R1 <= R + 1; R1++) {
            if (R1 > 0 && R1 <= MaxR) {
                LFR = LF[R];
                for (C1 = C - 1; C1 <= C + 1; C1++) {
                    if (C1 > 0 && C1 <= MaxC && (LFR == 1 || LFR == 3)) {
                        rc = R1 + '_' + C1 + '_'; ! (_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oPuffShroom, R1, C1);
                    }
                }
            }
        }
        a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.png", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 95) + "px;visibility:hidden;z-index:" + (a.zIndex + 3))
    },
    PrivateDie: function(a) {
        a.BulletEle = null
    },
    NormalAttack: function() {
        var a = this,
        b = "PB" + Math.random();
        w = a.id;
        EditEle(a.BulletEle.cloneNode(false), {
            id: b
        },
        0, EDPZ);
        PlayAudio("puff")
        $(w).childNodes[1].src = "images/Plants/SporeShroom/SporeShroomAttack.gif";
        oSym.addTask(40,
        function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = "images/Plants/SporeShroom/SporeShroom.gif")
        },
        [w]);
        oSym.addTask(15,
        function(d) {
            var c = $(d);
            c && SetVisible(c)
        },
        [b]);
        oSym.addTask(1,
        function(f, j, h, c, n, i, m, k, o, g) {
            var l, e = GetC(n),
            d = oZ["getZ" + c](n, i);
            d && d.Altitude == 1 ? (d.getPea(d, h, c), (SetStyle(j, {
                left: o + 28 + "px"
            })).src="images/Plants/ShroomBulletHit.gif",oSym.addTask(10, ClearChild, [j])) : (n += (l = !c ? 5 : -5)) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
        },
        [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])
    }
}),
oBambooUncle = InheritO(CPlants, {
    EName: "oBambooUncle",
    CName: "爆竹叔",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    SunNum: 200,
    CoolTime: 5,
    PicArr: (function() {
        var a = "images/Plants/BambooUncle/";
        b = "images/Plants/CherryBomb/";
        return ["images/Card/BambooUncle.png", a + "0.gif", a + "BambooUncle.gif", b + "Boom.png"]
    })(),
    AudioArr: ["cherrybomb"],
    Tooltip: "僵尸接近后爆竹叔会启动自爆程序！",
    getTriggerRange: function(a, b, c) {
        return [[b, c, 0]]
    },
    TriggerCheck: function(b, a) {
        b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this))
    },
    NormalAttack: function(a) {
        oSym.addTask(105,
        function(b) {
            var c = $P[b];
            q = b + "_Boom";
            if (c) {
                PlayAudio("cherrybomb");
                var f = $(b),
                j = c.R,
                g = j > 2 ? j - 1 : 1,
                e = j < oS.R ? j + 1 : oS.R,
                l = c.pixelLeft - 80,
                k = c.pixelLeft + 160,
                d,
                h;
                do {
                    h = (d = oZ.getArZ(l, k, g)).length;
                    while (h--) {
                        d[h].getExplosion()
                    }
                } while ( g ++< e );
                c.Die(1);
                oSym.addTask(15, ClearChild, [f]);
                NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 2) + ";width:216px;height:164px;left:" + (c.pixelLeft) + "px;top:" + (c.pixelTop) + "px;background:url(images/Plants/CherryBomb/Boom.png) no-repeat", 0, EDPZ);
                oSym.addTask(20,
                function(i) {
                    ClearChild(i)
                },
                []);
                ImgSpriter(q, c, [["0 0", 10, 1], ["-216px 0", 10, 2], ["-432px 0", 10, 3], ["-864px 0", 10, 4], ["-1080px 0", 10, 5], ["-1296px 0", 10, 6], ["-1512px 0", 10, 7], ["-1728px 0", 10, 8], ["-1944px 0", 10, 9], ["-2160px 0", 10, 10], ["-2376px 0", 10, 11], ["-2592px 0", 10, 12], ["-2808px 0", 10, 13], ["-3024px 0", 10, 14], ["-3240px 0", 10, 15], ["-3456px 0", 10, 16], ["-3672px 0", 10, 17], ["-3888px 0", 10, 18], ["-4104px 0", 10, 19], ["-4320px 0", 10, 20], ["-4536px 0", 10, 21], ["-4752px 0", 10, 22], ["-4968px 0", 10, 23], ["-5184px 0", 10, 24], ["-5184px 0", 10, -1]], 0,
                function(i, p) {
                    ClearChild($(i));
                })
            }
        },
        [a.id])
    }
}),
oBambooUncle1 = InheritO(oBambooUncle, {
    EName: "oBambooUncle1",
    CName: "冷却减少-爆竹叔",
    CoolTime: 3,
    Tooltip: "僵尸接近后爆竹叔会启动自爆程序！<br>优化：冷却减少。"
}),
oDoomShroom = InheritO(oCherryBomb, {
    EName: "oDoomShroom",
    CName: "毁灭菇",
    width: 102,
    height: 91,
    beAttackedPointR: 80,
    coolTime: 35,
    SunNum: 150,
    AudioArr: ["doomshroom"],
    PicArr: (function() {
        var a = "images/Plants/DoomShroom/";
        return ["images/Card/DoomShroom.png", a + "0.gif", a + "DoomShroom.gif", a + "Boom.png"]
    })(),
    Tooltip: "可以对僵尸造成大规模打击, 但冷却时间却很长",
    PrivateBirth: function(a) {
        oSym.addTask(80,
        function(b) {
            var c = $P[b];
            q = b + "_Boom";
            if (c) {
                PlayAudio("doomshroom");
                var f = $(b),
                j = c.R,
                g = j > 3 ? j - 2 : 1,
                e = Math.min(oS.R, j + 2),
                l = c.pixelLeft - 240,
                k = c.pixelRight + 240,
                p = oGd.$,
                r = c.R + "_" + GetC(c.AttackedLX),
                d,
                o,
                h;
                do {
                    h = (d = oZ.getArZ(l, k, g)).length;
                    while (h--) {
                        d[h].getExplosion()
                    }
                } while ( g ++< e );
                c.Die(); (o = p[r + "_" + 0]) && o.Die(); (o = p[r + "_" + 2]) && o.Die();
                oSym.addTask(15, ClearChild, [f]);
                NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 2) + ";width:283px;height:324px;left:" + (c.pixelLeft - 80) + "px;top:" + (c.pixelTop - 220) + "px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat", 0, EDPZ);
                oSym.addTask(20,
                function(i) {
                    ClearChild(i)
                },
                [NewEle(q, "div", "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5", 0, EDPZ)]);
                ImgSpriter(q, c, [["0 0", 10, 1], ["-283px 0", 10, 2], ["-566px 0", 10, 3], ["-849px 0", 10, 4], ["-1132px 0", 10, 5], ["-1415px 0", 10, 6], ["-1698px 0", 10, 7], ["-1981px 0", 10, 8], ["-2264px 0", 10, 9], ["-2547px 0", 10, -1]], 0,
                function(i, p) {
                    ClearChild($(i));
                })
            }
        },
        [a.id])
    }
}),
oDoomShroom1 = InheritO(oDoomShroom, {
    EName: "oDoomShroom1",
    CName: "冷却减少-毁灭菇",
    coolTime: 12,
    Tooltip: "可以对僵尸造成大规模打击, 但冷却时间却很长<br>优化：冷却减少。"
}),
oNutBowling = InheritO(CPlants, {
    EName: "oNutBowling",
    CName: "坚果保龄球",
    width: 65,
    height: 73,
    beAttackedPointR: 45,
    canEat: 0,
    zIndex: 1,
    PicArr: (function() {
        var a = "images/Plants/WallNut/";
        return ["images/Card/WallNutRoll.png", a + "0.gif", a + "WallNutRoll.gif"]
    })(),
    AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
    CanAttack: 1,
    InitTrigger: function() {},
    getHurt: function() {},
    BoomDie: function() {},
    NormalAttack: null,
    PrivateBirth: function(c) {
        var d = $(c.id);
        PlayAudio("bowling"); (function(z, y, q, r, p, x, e, g, b) {
            var a = z.R,
            l = z.C,
            A, u, s, v = 0,
            w, i, t = false;
            if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
                u = A.id;
                PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
                switch (A.Ornaments) {
                case 0:
                    A.NormalDie();
                    break;
                case 1:
                    A.getHit0(A, Math.min(A.OrnHP, 900), 0);
                    break;
                default:
                    z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0)
                }
                z.CanAttack = 0;
                switch (a) {
                case oS.R:
                    e = -1;
                    break;
                case 1:
                    e = 1;
                    break;
                default:
                    switch (e) {
                    case 1:
                        e = -1;
                        break;
                    case - 1 : e = 1;
                        break;
                    default:
                        e = Math.random() > 0.5 ? 1 : -1
                    }
                }
                oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b])
            } else {
                switch (e) {
                case 1:
                    z.pixelBottom + 2 > b && (e = -1);
                    break;
                case - 1 : z.pixelBottom - 2 < g && (e = 1);
                    break
                }
                q > y ? (z.Die(1), ClearChild(d)) : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {
                    left: (z.pixelLeft = p += 2) + "px",
                    top: (z.pixelTop += e * 2) + "px"
                }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({
                    R: a,
                    C: l,
                    PKind: 1
                }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]))
            }
        })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600)
    },
    Die: function(a) {
        var b = this,
        c = b.id;
        b.oTrigger && oT.delP(b);
        b.HP = 0;
        delete $P[c];
        delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
        a && ClearChild($(c));
        b.PrivateDie(b)
    }
}),
oBoomNutBowling = InheritO(oNutBowling, {
    EName: "oBoomNutBowling",
    CName: "爆炸坚果",
    PicArr: (function() {
        var a = "images/Plants/WallNut/";
        return ["images/Card/BoomNutBowling.png", a + "1.gif", a + "BoomNutBowling.gif", "images/Plants/CherryBomb/Boom.png"]
    })(),
    AudioArr: ["cherrybomb", "bowling"],
    PrivateBirth: function(a) {
        PlayAudio("bowling"); (function(s, q, b, c, m) {
            var v = s.R,
            p = s.C,
            t, l;
            q = b + "_Boom";
            if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
                var j = v > 2 ? v - 1 : 1,
                g = v < oS.R ? v + 1 : oS.R,
                u = s.pixelLeft - 80,
                r = s.pixelLeft + 160,
                e,
                k;
                PlayAudio("cherrybomb");
                do {
                    k = (e = oZ.getArZ(u, r, j)).length;
                    while (k--) {
                        e[k].getExplosion()
                    }
                } while ( j ++< g );
                s.Die(1);
                ClearChild(m);
                NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 2) + ";width:216px;height:164px;left:" + (s.pixelLeft) + "px;top:" + (s.pixelTop - 100) + "px;background:url(images/Plants/CherryBomb/Boom.png) no-repeat", 0, EDPZ);
                oSym.addTask(20,
                function(i) {
                    ClearChild(i)
                },
                []);
                ImgSpriter(q, c, [["0 0", 10, 1], ["-216px 0", 10, 2], ["-432px 0", 10, 3], ["-864px 0", 10, 4], ["-1080px 0", 10, 5], ["-1296px 0", 10, 6], ["-1512px 0", 10, 7], ["-1728px 0", 10, 8], ["-1944px 0", 10, 9], ["-2160px 0", 10, 10], ["-2376px 0", 10, 11], ["-2592px 0", 10, 12], ["-2808px 0", 10, 13], ["-3024px 0", 10, 14], ["-3240px 0", 10, 15], ["-3456px 0", 10, 16], ["-3672px 0", 10, 17], ["-3888px 0", 10, 18], ["-4104px 0", 10, 19], ["-4320px 0", 10, 20], ["-4536px 0", 10, 21], ["-4752px 0", 10, 22], ["-4968px 0", 10, 23], ["-5184px 0", 10, 24], ["-5184px 0", 10, -1]], 0,
                function(i, p) {
                    ClearChild($(i));
                })
            } else {
                b > q ? s.Die() : (l = GetC(s.pixelRight += 2), s.AttackedLX = b += 2, s.AttackedRX = c += 2, SetStyle(m, {
                    left: (s.pixelLeft += 2) + "px"
                }), l != p && (s.C = l, oGd.del({
                    R: v,
                    C: p,
                    PKind: 1
                }), oGd.add(s, v + "_" + l + "_1")), oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]))
            }
        })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id))
    }
}),
//实验室
oAbutilonHybriden = InheritO(CPlants, {
    EName: "oAbutilonHybriden",
    CName: "实验室-金铃花",
    SunNum: 25,
    canEat: 0,
    coolTime: 20,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: (function() {
        var a = "images/Plants/AbutilonHybriden/";
        return ["images/Card/AbutilonHybriden.png", a + "0.gif", a + "AbutilonHybriden.gif"]
    })(),
    AudioArr: ["金铃花"],
    Tooltip: "金铃花可以在原地制造出一个持续30秒的萤火虫格子",
    BoomDie: function() {},
    InitTrigger: function() {},
    PrivateBirth: function(a) {
        oSym.addTask(270,
        function(b) {
            var e = $P[b],
            d,
            f;
             e && (d = e.R, f = e.C, e.Die(), PlayAudio("金铃花"), CustomSpecial(oFirefly,d,f))
        },
        [a.id])
    }
}),
oFirefly = InheritO(oStoneFlower, {
    EName: "oFirefly",
    PicArr: ["", "", "images/Plants/AbutilonHybriden/Firefly.gif", "images/Plants/AbutilonHybriden/shadow.png"],
    canEat: 0,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    getShadow: function(a) {
        return "display:none"
    },
    HP: 300,
    PrivateBirth: function(a) {
        oSym.addTask(10000,
        function(b) {
            var e = $P[b],
            d,
            f;
             e && (d = e.R, f = e.C, e.Die(), ClearChild($(a.id + "_2")))
        },
        [a.id])
    },
    BirthStyle: function(c, d, b, a) {
        b.childNodes[1].src = "images/Plants/AbutilonHybriden/Firefly.gif";
        EditEle(b, {
            id: d
        },
        a, EDPZ);
        NewImg(d + "_2", "images/Plants/AbutilonHybriden/shadow.png", "left:" + c.pixelLeft + "px;top:" + (c.pixelTop + 20) + "px;z-index:" + (c.zIndex - 2), EDPZ)
    },
    NormalAttack: function(b, a) {
        var c = $Z[b];
        PlayAudio("朝鲜蓟攻击");
        c.getFirefly(c, this.Attack, 0)
    },
    PrivateDie: function(a) {
        ClearChild($(a.id + "_2"))
    }
}),
oPumpkinHead = InheritO(CPlants, {
    EName: "oPumpkinHead",
    CName: "实验室-南瓜罩",
    width: 97,
    height: 67,
    beAttackedPointL: 15,
    beAttackedPointR: 82,
    SunNum: 125,
    PKind: 2,
    HP: 4000,
    coolTime: 25,
    zIndex: 1,
    PicArr: (function() {
        var a = "images/Plants/PumpkinHead/";
        return ["images/Card/PumpkinHead.png", a + "0.gif", a + "Pumpkin_back.gif", a + "pumpkin_damage1.gif", a + "Pumpkin_damage2.gif", a + "PumpkinHead1.gif"]
    })(),
    Tooltip: "南瓜罩 ，可以用他的外壳保护其他植物。",
    CanGrow: function(c, b, d) {
        var a = b + "_" + d;
        return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0]
    },
    GetDY: function(b, c, a) {
        return a[0] ? -12 : -5
    },
    HurtStatus: 0,
    getHurt: function(e, c, b) {
        var d = this,
        f = d.id,
        a = $(f);
        switch (true) {
        case c && c < 3 : d.Die(1);
            break;
        case (d.HP -= b) < 1 : d.Die();
            break;
        case d.HP < 1334 : d.HurtStatus < 2 && (d.HurtStatus = 2, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage2.gif");
            break;
        case d.HP < 2667 : d.HurtStatus < 1 && (d.HurtStatus = 1, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage1.gif")
        }
    },
    InitTrigger: function() {},
    BirthStyle: function(c, d, b, a) {
        b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
        EditEle(b, {
            id: d
        },
        a, EDPZ);
        NewImg(d + "_2", "images/Plants/PumpkinHead/Pumpkin_back.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ)
    },
    PrivateDie: function(a) {
        ClearChild($(a.id + "_2"))
    }
}),
//其他
oCarKeys = InheritO(CPlants, {
    EName: "oCarKeys",
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    CName: "疯狂戴夫的车钥匙",
    PicArr: ["images/Props/CarKeys/0.gif", "images/Props/CarKeys/0.gif"],
    Tooltip: "随戴夫开始一场奇妙的旅行吧！"
}),
oCone = InheritO(oCarKeys, {
    EName: "oCone",
    width: 155,
    height: 282,
    beAttackedPointL: 63,
    beAttackedPointR: 75,
    GetDTop: 104,
    CName: "戴夫实验室的锥形瓶",
    PicArr: ["images/Props/Cone/0.gif", "images/Props/Cone/0.gif"],
    Tooltip: "实验室玩法现已解锁！"
}),
oApple = InheritO(CPlants, {
    EName: "oApple",
    CName: "挨炮",
    width: 155,
    height: 130,
    beAttackedPointL: 63,
    beAttackedPointR: 75,
    PicArr: ["images/Card/Plants/Apple.png", "images/Plants/Apple/0.gif", "images/Plants/Apple/Apple.gif"],
    InitTrigger: function() {}
}),
oLight = InheritO(CPlants, {
    EName: "oLight",
    CName: "特殊道具-日光灯",
    SunNum: 0,
    canEat: 0,
    coolTime: 40,
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    PicArr: (function() {
        var a = "images/Props/Light/";
        return ["images/Card/Light.png", a + "0.gif", a + "Light.gif"]
    })(),
    Tooltip: "日光灯可以为你一次性提供300阳光!",
    BoomDie: function() {},
    GetDY: function(b, c, a) {
        return - 30
    },
    CanGrow: function(d, e, f) {return true},
    InitTrigger: function() {},
    PrivateBirth: function(a) {
        oSym.addTask(40,
        function(b) {
            var e = $P[b],
            c,
            d,
            f;
            e && (d = e.R, f = e.C, e.Die(), oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 300, 0))
        },
        [a.id])
    }
}),
oLightCS = InheritO(oLight, {coolTime: 7.5}),
oObstacle = InheritO(oApple, {
    EName: "oObstacle",
    canShovel: false,
    canEat: 0,
    Stature: -1,
    HP: 1,
    getShadow: function(a) {return "display:none"},
    PicArr: ["", "", "images/interface/用于检测鼠标是否放在关卡按钮上.png"]
}),
oObstacle2 = InheritO(oObstacle, {
    EName: "oObstacle2",
    canEat: 1,
    PKind: 2,
    height: 1
}), 
oDaoDan = InheritO(oLight, {
    EName: "oDaoDan",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: (function() {
        var a = "images/Props/DaoDan/";
        return ["", "", a + "DaoDan.gif"]
    })(),
    CanGrow: function(d, e, f) {return true},
    getShadow: function(a) {return "display:none"},
    PrivateBirth: function(a) {
        oSym.addTask(40,
        function(b) {
            var e = $P[b],
            c,
            d,
            f;
            e && (d = e.R, f = e.C, e.Die())
        },
        [a.id])
    }
})