var CZombies = function(b, a) {
    return (a = function() {}).prototype = {
        name: "Zombies",
        HP: 270,
        Lvl: 1,
        NormalGif: 2,
        CardGif: 0,
        StaticGif: 1,                       
        CanSelect: 1,
        CanDisplay: 1,
        AttackGif: 3,
        LostHeadGif: 4,
        LostHeadAttackGif: 5,
        HeadGif: 6,
        DieGif: 7,
        BoomDieGif: 8,
        width: 166,
        height: 144,
        beAttackedPointL: 82,
        beAttackedPointR: 156,
        BreakPoint: 90,
        Ornaments: 0,
        OrnHP: 0,
        OSpeed: 1.6,
        Speed: 1.6,
        CSS_fliph: "",
        CSS_alpha: "",
        AKind: 0,
        beAttacked: 1,
        isAttacking: 0,
        Attack: 100,
        WalkDirection: 0,
        LivingArea: 1,
        Altitude: 1,
        FreeSetbodyTime: 0,
        FreeFreezeTime: 0,
        FreeSlowTime: 0,
        AudioArr: ["losemusic", "splat1", "splat2", "splat3", "ignite", "ignite2", "frozen", "chomp", "chompsoft"],
        CanPass: function(d, c) {
            return c && c != 2
        },
        CanGrow: function(d, c, e) {
            return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1]
        },
        ChkActs: function(h, f, j, e) {
            var d, c, g; ! (h.FreeFreezeTime || h.FreeSetbodyTime) ? (h.beAttacked && !h.isAttacking && h.JudgeAttack(), !h.isAttacking ? ((c = h.AttackedRX -= (d = h.Speed)) < -50 ? (j.splice(e, 1), h.DisappearDie(), g = 0) : (c < 100 && !h.PointZombie && (h.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false), SetNone($("dCardList"), $("dTop"))), h.ChangeR({
                R: f,
                ar: [oS.R - 1],
                CustomTop: 400 - h.height + h.GetDY()
            })), h.ZX = h.AttackedLX -= d, h.Ele.style.left = Math.floor(h.X -= d) + "px", g = 1)) : g = 1) : g = 1;
            return g
        },
        ChkActs1: function(g, e, h, d) {
            var c, f; ! (g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), !g.isAttacking ? (g.AttackedLX += (c = g.Speed)) > oS.W ? (h.splice(d, 1), g.DisappearDie(), f = 0) : (g.ZX = g.AttackedRX += c, g.Ele.style.left = Math.ceil(g.X += c) + "px", f = 1) : f = 1) : f = 1;
            return f
        },
        GetDX: function() {
            return - 110
        },
        GetDY: function() {
            return - 10
        },
        GetDTop: 0,
        ChangeR: function(e) {
            var h = e.R,
            g = e.ar || [],
            j = e.CustomTop,
            d = this,
            q = h - 1,
            l,
            k = d.id,
            m = -1,
            f = d.Ele,
            n = d.EleBody,
            i = oGd.$LF,
            c; ! g.length && (d.CanPass(q, i[q]) && (g[++m] = q), d.CanPass(q += 2, i[q]) && (g[++m] = q));
            g.length ? (l = !d.WalkDirection ? -5 : 5, d.ZX += l, d.AttackedLX += l, d.AttackedRX += l, d.X += l, q = g[Math.floor(Math.random() * g.length)], SetStyle(f, {
                left: d.X + "px",
                top: (d.pixelTop = j == undefined ? GetY(q) - d.height + d.GetDY() : j) + "px",
                zIndex: d.zIndex = 3 * q + 1
            }), d.isAttacking && (n.src = d.PicArr[d.NormalGif]), oZ.moveTo(k, h, q)) : n.src = d.PicArr[d.NormalGif];
            d.isAttacking = 0
        },
        getShadow: function(c) {
            return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px"
        },
        Init: function(g, i, e, d) {
            var c = 0,
            h = this,
            f = [];
            i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;
            while (--d) {
                i.CanPass(d, e[d]) && (f[c++] = d)
            }
            i.ArR = f;
            i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>']
        },
        getHTML: function(d, g, i, h, f, k, j, c) {
            var e = this.ArHTML;
            return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8]
        },
        prepareBirth: function(f) {
            var h = this,
            e = h.ArR,
            d = e[Math.floor(Math.random() * e.length)],
            g = GetY(d) + h.GetDY(),
            c = g - h.height,
            j = 3 * d + 1,
            i = h.id = "Z_" + Math.random();
            h.R = d;
            h.pixelTop = c;
            h.zIndex = j; (h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
            return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif])
        },
        CustomBirth: function(i, c, d, m) {
            var g = this,
            f = GetY(i) + g.GetDY(),
            h = f - g.height,
            k = 3 * i + 1,
            e = g.id = "Z_" + Math.random(),
            l = g.beAttackedPointL,
            j = g.beAttackedPointR;
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * 0.5) - l) + j;
            g.R = i;
            g.pixelTop = h;
            g.zIndex = k; (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
            return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif])
        },
        BirthCallBack: function(f) {
            var e = f.delayT,
            d = f.id,
            c = f.Ele = $(d);
            f.EleShadow = c.firstChild;
            f.EleBody = c.childNodes[1];
            e ? oSym.addTask(e,
            function(h, g) {
                var i = $Z[h];
                i && (i.FreeSetbodyTime = 0, SetBlock(g))
            },
            [d, c]) : SetBlock(c)
        },
        Birth: function() {
            var c = this;
            $Z[c.id] = c;
            oZ.add(c);
            c.BirthCallBack(c)
        },
        getCrushed: function(c) {
            return true
        },
        getRaven: function() {
            return this.DisappearDie(),
            1
        },
        getExplosion: function() {
            this.ExplosionDie()
        },
        getThump: function() {
            this.DisappearDie()
        },
        PlayNormalballAudio: function() {
            PlayAudio("splat" + Math.floor(1 + Math.random() * 3))
        },
        PlayFireballAudio: function() {
            PlayAudio(["ignite", "ignite2"][Math.floor(Math.random() * 2)])
        },
        PlaySlowballAudio: function() {
            PlayAudio("frozen")
        },
        getFireball: function(h, e, g) {
            h.FreeSlowTime = 0;
            h.Attack = 100;
            h.FreeFreezeTime || h.FreeSetbodyTime ? (h.PlayNormalballAudio(), h.Speed = h.OSpeed) : h.PlayFireballAudio();
            var f = h.AttackedLX,
            j = h.AttackedRX,
            c = !g ? oZ.getArZ(f, f + 40, h.R) : oZ.getArZ(j - 40, j, h.R),
            d = c.length;
            while (d--) {
                c[d].getSputtering()
            }
        },
        getSputtering: function(c) {
            this.getHit2(this, c || 13, 0)
        },
        getSlow: function(h, f, g) {
            var d = oSym.Now + g,
            e = h.FreeSlowTime,
            c = 0;
            switch (true) {
            case ! e: !(h.FreeFreezeTime || h.FreeSetbodyTime) && (h.Speed = 0.5 * h.OSpeed);
                h.Attack = 50;
                h.PlaySlowballAudio();
                h.FreeSlowTime = d;
                c = 1;
                break;
            case e < d: h.FreeSlowTime = d;
                h.PlayNormalballAudio();
                c = 1
            }
            c && oSym.addTask(g,
            function(j, i) {
                var k = $Z[j];
                k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, k.Speed && (k.Speed = k.OSpeed))
            },
            [f, d])
        },
        getFreeze: function(d, c) {
            d.beAttacked && d.getHit0(d, 20, 0);
            d.Speed = 0;
            oSym.addTask(400,
            function(g, f, e) {
                ClearChild(e);
                var h = $Z[g];
                h && h.FreeFreezeTime == f && (h.FreeFreezeTime = 0, h.Attack = 50, !h.FreeSetbodyTime && (h.Speed = 0.5 * h.OSpeed, h.isAttacking && h.JudgeAttack()), oSym.addTask(1500,
                function(j, i) {
                    var k = $Z[j];
                    k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, !k.FreeSetbodyTime && (k.Speed = k.OSpeed))
                },
                [g, h.FreeSlowTime = oSym.Now + 1500]))
            },
            [c, d.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", d.getShadow(d), d.Ele)])
        },
        NormalDie: function() {
            var c = this;
            c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
            oSym.addTask(250, ClearChild, [c.Ele]);
            c.HP = 0;
            delete $Z[c.id];
            c.PZ && oP.MonPrgs()
        },
        ExplosionDie: function() {
            var c = this;
            c.EleBody.src = c.PicArr[c.BoomDieGif] + Math.random();
            oSym.addTask(300, ClearChild, [c.Ele]);
            c.HP = 0;
            delete $Z[c.id];
            c.PZ && oP.MonPrgs()
        },
        DisappearDie: function() {
            ClearChild(this.Ele);
            this.HP = 0;
            delete $Z[this.id];
            this.PZ && oP.MonPrgs()
        },
        CrushDie: function() {
            var c = this;
            c.GoingDieHead(c.id, c.PicArr, c);
            ClearChild(c.Ele);
            c.HP = 0;
            delete $Z[c.id];
            c.PZ && oP.MonPrgs()
        },
        GoingDieHead: function(e, c, d) {
            oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif] + Math.random(), "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ)])
        },
        GoingDie: function(d) {
            var c = this,
            e = c.id;
            c.EleBody.src = d;
            c.GoingDieHead(e, c.PicArr, c);
            c.beAttacked = 0;
            c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
            c.AutoReduceHP(e)
        },
        AutoReduceHP: function(c) {
            oSym.addTask(100,
            function(e) {
                var d = $Z[e];
                d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e))
            },
            [c])
        },
        JudgeAttack: function() {
            var g = this,
            d = g.ZX,
            e = g.R + "_",
            f = GetC(d),
            h = oGd.$,
            c; (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif])
        },
        JudgeLR: function(f, d, e, c, g) {
            return e > 10 || e < 1 ? false: function() {
                d += --e + "_";
                var h = 3,
                i;
                while (h--) {
                    if ((i = g[d + h]) && i.canEat) {
                        return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                    }
                }
            } ()
        },
        JudgeSR: function(f, d, e, c, g) {
            return e > 9 ? false: function() {
                d += e + "_";
                var h = 3,
                i;
                while (h--) {
                    if ((i = g[d + h]) && i.canEat) {
                        return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                    }
                }
            } ()
        },
        JudgeAttackH1: function() {
            var e = this,
            d = oZ.getZ0(e.ZX, e.R),
            c = e.id;
            d && d.beAttacked && d.AttackedLX < 900 && d.Altitude == 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c))
        },
        JudgeAttackH: function() {
            var e = this,
            d = oZ.getZ0(e.ZX, e.R),
            f = e.id,
            c;
            d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? (!e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1)) : e.isAttacking && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif])
        },
        AttackZombie: function(d, c) {
            oSym.addTask(10,
            function(f, e) {
                var h = $Z[f],
                g;
                h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH())
            },
            [d, c])
        },
        AttackZombie2: function(e, d, c) {
            e.isAttacking = 1;
            e.EleBody.src = e.PicArr[e.AttackGif];
            oSym.addTask(10,
            function(g, f) {
                var i = $Z[g],
                h;
                i && i.beAttacked && !i.FreeFreezeTime && !i.FreeSetbodyTime && ((h = $Z[f]) ? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f])) : (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]))
            },
            [d, c])
        },
        NormalAttack: function(d, c) {
            PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
            oSym.addTask(50,
            function(e) {
                $Z[e] && PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)])
            },
            [d]);
            oSym.addTask(100,
            function(f, e) {
                var h = $Z[f],
                g;
                h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack())
            },
            [d, c])
        },
        PZ: 1,
        ExchangeLR: function(f, d) {
            var e = f.width,
            h = f.beAttackedPointL,
            c = f.beAttackedPointR,
            g = f.Ele;
            g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
            f.beAttackedPointR = e - h;
            f.EleShadow.style.cssText = f.getShadow(f);
            f.ExchangeLR2(f, f.EleBody, d)
        },
        ExchangeLR2: $User.Browser.IE ?
        function(e, c, d) {
            c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph": "")
        }: function(e, c, d) {
            c.className = d ? "fliph": ""
        },
        bedevil: function(c) {
            c.ExchangeLR(c, 1);
            c.JudgeAttack = c.JudgeAttackH;
            c.PZ = 0;
            c.WalkDirection = 1;
            c.ZX = c.AttackedRX;
            c.ChkActs = c.ChkActs1;
            oP.MonPrgs()
        },
        SetAlpha: function() {}
    },
    a
} (),
OrnNoneZombies = function() {
    var a = function(c, b) {
        if ((c.HP -= b) < c.BreakPoint) {
            c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);
            c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {};
            return
        }
        c.SetAlpha(c, c.EleBody, 50, 0.5);
        oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])
    };
    return InheritO(CZombies, {
        getHit: a,
        getHit0: a,
        getHit1: a,
        getHit2: a,
        getHit3: a,
        getPea: function(e, b, c) {
            e.PlayNormalballAudio();
            e.getHit0(e, b, c)
        },
        getFirePea: function(g, c, j) {
            g.PlayFireballAudio(); (g.FreeSlowTime || g.FreeFreezeTime) && (g.Speed = g.OSpeed, g.FreeSlowTime = 0, g.FreeFreezeTime = 0);
            g.Attack = 100;
            var f = g.AttackedLX,
            h = g.AttackedRX,
            b = oZ.getArZ(f, f + 40, g.R),
            e = b.length;
            while (e--) {
                b[e].getFirePeaSputtering()
            }
            g.getHit0(g, c, j)
        },
        getFirePeaSputtering: function() {
            this.getHit0(this, 13)
        },
        getSnowPea: function(f, c, g) {
            var e = f.FreeSlowTime,
            b = oSym.Now + 1000;
            e == 0 ? (f.PlaySlowballAudio(), f.Speed = 0.5 * f.OSpeed, f.Attack = 50) : f.PlayNormalballAudio();
            e < b && (f.FreeSlowTime = b, oSym.addTask(1000,
            function(h, d) {
                var i = $Z[h];
                i && i.FreeSlowTime == d && (i.FreeSlowTime = 0, i.Attack = 100, i.Speed && (i.Speed = i.OSpeed))
            },
            [f.id, b]));
            f.getHit0(f, c, g)
        },
        getFirefly: function(f, c, g) {
            var e = f.FreeSlowTime,
            b = oSym.Now + 1000;
            e == 0 ? (f.PlaySlowballAudio(), f.Speed = 0.5 * f.OSpeed, f.Attack = 50) : f.PlayNormalballAudio();
            e < b && (f.FreeSlowTime = b, oSym.addTask(1000,
            function(h, d) {
                var i = $Z[h];
                i && i.FreeSlowTime == d && (i.FreeSlowTime = 0, i.Attack = 100, i.Speed && (i.Speed = i.OSpeed))
            },
            [f.id, b]));
            f.getHit2(f, c, g)
        }
    })
} (),
OrnIIZombies = InheritO(OrnNoneZombies, {
    Ornaments: 2,
    BreakPoint: 91,
    NormalGif: 2,
    AttackGif: 3,
    LostHeadGif: 4,
    LostHeadAttackGif: 5,
    OrnLostNormalGif: 6,
    OrnLostAttackGif: 7,
    OrnLostHeadNormalGif: 8,
    OrnLostHeadAttackGif: 9,
    HeadGif: 10,
    DieGif: 11,
    BoomDieGif: 12
}),
OrnIZombies = function() {
    var a = function(f, b) {
        var d = f.OrnHP,
        c = f.HP,
        e = OrnNoneZombies.prototype; (d = f.OrnHP -= b) < 1 && (f.HP += d, f.Ornaments = 0, f.EleBody.src = f.PicArr[[f.NormalGif = f.OrnLostNormalGif, f.AttackGif = f.OrnLostAttackGif][f.isAttacking]], f.PlayNormalballAudio = e.PlayNormalballAudio, f.PlayFireballAudio = e.PlayFireballAudio, f.PlaySlowballAudio = e.PlaySlowballAudio, f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = e.getHit);
        f.SetAlpha(f, f.EleBody, 50, 0.5);
        oSym.addTask(10,
        function(h, g) { (g = $Z[h]) && g.SetAlpha(g, g.EleBody, 100, 1)
        },
        [f.id])
    };
    return InheritO(OrnNoneZombies, {
        Ornaments: 1,
        OrnLostNormalGif: 9,
        OrnLostAttackGif: 10,
        getHit: a,
        getHit0: a,
        getHit1: a,
        getHit2: a,
        getHit3: a
    })
} (),
//庭院僵尸从以下开始
oZombie = InheritO(OrnNoneZombies, {
    EName: "oZombie",
    CName: "普通僵尸",
    StandGif: 9,
    PicArr: (function() {
        var a = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/Zombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
    })()
}),
oConeheadZombie = InheritO(OrnIZombies, {
    EName: "oConeheadZombie",
    CName: "路障僵尸",
    OrnHP: 370,
    Lvl: 2,
    StandGif: 11,
    PicArr: (function() {
        var b = "images/Zombies/ConeheadZombie/",
        a = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/ConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"]
    })(),
    AudioArr: ["plastichit"],
    PlayNormalballAudio: function() {
        PlayAudio("plastichit")
    }
}),
oBucketheadZombie = InheritO(oConeheadZombie, {
    EName: "oBucketheadZombie",
    CName: "铁桶僵尸",
    OrnHP: 1100,
    Lvl: 3,
    AudioArr: ["shieldhit", "shieldhit2"],
    PlayNormalballAudio: function() {
        PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)])
    },
    PicArr: (function() {
        var b = "images/Zombies/BucketheadZombie/",
        a = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/ConeheadZombie.png", b + "0.gif", b + "BucketheadZombie.gif", b + "BucketheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"]
    })(),
}),
//森林僵尸从以下开始
oNewspaperZombie = InheritO(OrnIIZombies, {
    EName: "oNewspaperZombie",
    CName: "读报僵尸",
    OrnHP: 300,
    Lvl: 2,
    LostPaperGif: 13,
    StandGif: 14,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    OSpeed: 0.8,
    Speed: 0.8,
    PicArr: (function() {
        var a = "images/Zombies/NewspaperZombie/";
        return ["images/Card/Zombies/NewspaperZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"]
    })(),
    AudioArr: ["newspaper_rarrgh2"],
    getShadow: function(a) {
        return "left:75px;top:" + (a.height - 25) + "px"
    },
    GoingDie: function(b) {
        var a = this,
        c = a.id;
        a.EleBody.src = b;
        oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
        a.beAttacked = 0;
        a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
        a.AutoReduceHP(c)
    },
    getHurtOrnLost: function(j, a, g, m, c, l, k, i) {
        var e = this;
        if (!e.beAttacked) {
            k && e.DisappearDie();
            return
        }
        var b = e.id,
        h = e.HP,
        d = e.PicArr,
        f = e.isAttacking;
        switch (true) {
        case(h -= g) < 1 : e.HP = 0;
            e.NormalDie();
            return;
        case h < 91 : e.HP = h;
            e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
            return
        }
        e.HP = h;
        switch (m) {
        case - 1 : e.getSlow(e, b, 1000);
            break;
        case 1:
            e.getFireball(e, b, a);
            break;
        default:
            !i && j == -1 && e.PlayNormalballAudio()
        }
        SetAlpha(e.EleBody, 50, 0.5);
        oSym.addTask(10,
        function(q) {
            var n = $Z[q];
            n && SetAlpha(n.EleBody, 100, 1)
        },
        [b])
    },
    getSnowPea: function(c, a, b) {
        PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
        c.getHit0(c, a, b)
    },
    getFirePea: function(f, b, e) {
        f.PlayFireballAudio(); (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
        f.Attack = 100;
        var d = f.AttackedLX,
        g = f.AttackedRX,
        a = oZ.getArZ(d, d + 40, f.R),
        c = a.length,
        h;
        while (c--) { (h = a[c]) != this && h.getFirePeaSputtering()
        } (f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function() {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, 0.5), oSym.addTask(10,
        function(j, i) { (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1)
        },
        [f.id]))
    },
    getHit0: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    getHit1: function(b, a) { (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10,
        function(d, c) { (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        },
        [b.id]))
    },
    getHit2: function(b, a) { (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10,
        function(d, c) { (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        },
        [b.id]))
    },
    getHit3: function(b, a) { (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function() {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10,
        function(d, c) { (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1)
        },
        [b.id]))
    },
    CheckOrnHP: function(g, h, d, c, f, b, a) {
        var e = OrnNoneZombies.prototype; (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function() {
            return 1
        },
        g.ChkActs1 = function() {
            return 1
        },
        g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150,
        function(m, l) {
            var k = $Z[m];
            if (!k) {
                return
            }
            var j = CZombies.prototype,
            i = k.OSpeed;
            k.ChkActs = j.ChkActs;
            k.ChkActs1 = j.ChkActs1;
            k.Speed && (k.Speed = !k.FreeSlowTime ? i: 0.5 * i);
            if (!k.beAttacked) {
                return
            }
            PlayAudio("newspaper_rarrgh2");
            k.EleBody.src = l;
            k.JudgeAttack()
        },
        [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]))
    }
}),
oBalloonZombie = InheritO(OrnNoneZombies, {
    EName: "oBalloonZombie",
    CName: "气球僵尸",
    width: 348,
    height: 210,
    OSpeed: 1.5,
    Speed: 2.5,
    StandGif: 13,
    NormalGif: 13,
    Lvl: 2,
    beAttackedPointL: 215,
    beAttackedPointR: 260,
    AudioArr: ["balloon_pop"],
    PicArr: (function() {
        var a = "images/Zombies/BalloonZombie/";
        return ["images/Card/Zombies/PoleVaultingZombie.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"]
    })(),
    getShadow: function(a) {
        return "left:" + (a.beAttackedPointL - 10) + "px;top:" + (a.height - 15) + "px"
    },
    GoingDieHead: function(c, a, b) {
        oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)])
    },
    JudgeAttack: function() {
        var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;
        for (f = c - 2, len = c;  f <= len; f++) {
            if (f > 9) {
                continue
            }
            for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
        }
    },
    getCrushed: function(a) {
        this.NormalAttack(this.id, a.id, a.AttackedLX);
        this.getCrushed = function() {
            return false
        };
        a.Stature > 0 && oSym.addTask(50,
        function(c) {
            var b = $Z[c];
            b && b.CrushDie()
        },
        [this.id]);
        return false
    },
    getRaven: function(a) {
        return ! this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX),
        0
    },
    NormalAttack: function(d, b, g) {
        var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
        e.src = "images/Zombies/BalloonZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
        SetHidden(c);
        f.isAttacking = 1;
        f.Altitude = 2;
        f.getFreeze = function() {
            f.getSnowPea(f, 20)
        };
        oSym.addTask(50,
        function(h) {
            $Z[h] && PlayAudio("balloon_pop")
        },
        [d]);
        oSym.addTask(100,
        function(m, j, i, l, n) {
            var h = $Z[m],
            k,
            q,
            r;
            h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
                left: h.X + "px"
            }), n.src = "images/Zombies/BalloonZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
                left: h.X + "px"
            }), n.src = "images/Zombies/BalloonZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(80,
            function(s, v) {
                var u = $Z[s],
                t;
                u && (v.src = "images/Zombies/BalloonZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven)
            },
            [m, n])))
        },
        [d, b, a, c, e])
    }
}),
oStrollZombie = InheritO(oZombie, {
    EName: "oStrollZombie",
    CName: "漫步僵尸",
    OSpeed: 4.8,
    Speed: 4.8,
    HP: 130,
    AttackGif: 2,
    LostHeadGif: 2,
    LostHeadAttackGif: 2,
    LostHeadGif: 2,
    HeadGif: 3,
    DieGif: 4,
    BoomDieGif: 5,
    StandGif: 6,
    getShadow: function(a) {
        return "left:55px;top:" + (a.height - 25) + "px"
    },
    AudioArr: ["漫步登场1", "漫步登场2", "漫步登场3"],
    BirthCallBack: function(a) {
            PlayAudio("漫步登场" + Math.floor(1 + Math.random() * 3));
            OrnNoneZombies.prototype.BirthCallBack(a)
     },
    NormalAttack: function(d, c) {
            oSym.addTask(100,
            function(f, e) {
                var h = $Z[f],
                g;
                h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.Die(), h.JudgeAttack())
            },
            [d, c])
    },
    PicArr: (function() {
        var a = "images/Zombies/StrollZombie/";
        return ["images/Card/Zombies/StrollZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/BoomDie.gif" + $Random, a + "1.gif"]
    })()
}),
oFootballZombie = InheritO(oConeheadZombie, {
    EName: "oFootballZombie",
    CName: "橄榄球僵尸",
    OrnHP: 1400,
    Lvl: 3,
    SunNum: 175,
    StandGif: 11,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    OSpeed: 3.2,
    Speed: 3.2,
    PlayNormalballAudio: function() {
        PlayAudio("plastichit")
    },
    PicArr: (function() {
        var a = "images/Zombies/FootballZombie/";
        return ["images/Card/Zombies/FootballZombie.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, "images/Zombies/NewspaperZombie/BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"]
    })(),
    getShadow: function(a) {
        return "left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px"
    }
}),
oCigarZombie = InheritO(OrnNoneZombies, {
    EName: "oCigarZombie",
    CName: "雪茄僵尸",
    HP: 300,
    BreakPoint: 167,
    Status: 1,
    StandGif: 5,
    NormalGif: 6,
    DieGif: 3,
    BoomDieGif: 4,
    HeadGif: 11,
    LostHeadGif: 9,
    LostHeadAttackGif: 10,
    AttackGif: 2,
    AudioArr: ["cherrybomb", "squash_hmm"],
    PicArr: (function() {
        var j = "images/Zombies/";
        var a = "images/Zombies/CigarZombie/";
        return ["images/Card/Zombies/CigarZombie.png", a + "0.gif", a + "Attack.gif", a + "Die.gif" + $Random, j + "BoomDie.gif" + $Random, a + "1.gif", a + "Walk.gif", a + "OpenBox.gif", a + "Boom.gif" + $Random, a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random]
    })(),
    RandomOpenBox: function(a) {
        oSym.addTask(Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301),
        function(c) {
            var b = $Z[c];
            b && b.beAttacked && b.OpenBox(c)
        },
        [a])
    },
    OpenBox: function(b) {
        PlayAudio("squash_hmm");
        var a = $Z[b];
        a.EleBody.src = a.PicArr[7];
        a.ChkActs = a.ChkActs1 = function() {
            return 1
        };
        a.JudgeAttack = function() {
            var g = this,
            d = g.ZX,
            e = g.R + "_",
            f = GetC(d),
            h = oGd.$,
            c; (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0)
        };
        a.JudgeAttackH = function() {
            var e = this,
            d = oZ.getZ0(e.ZX, e.R),
            f = e.id,
            c;
            d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? (!e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1)) : e.isAttacking && (e.isAttacking = 0)
        };
        a.getPea = a.getSnowPea = a.getFirePeaSputtering = a.getFirePea = a.getHit = a.getHit0 = a.getHit1 = a.getHit2 = a.getHit3 = a.ChangeR = a.bedevil = function() {};
        oSym.addTask(50,
        function(c) {
            $Z[c] && (a.Status = 0, !--oGd.$JackinTheBox && StopAudio(""), PlayAudio(""), oSym.addTask(90,
            function(f) {
                var e = $Z[f],
                d;
                e && (d = NewImg("", "", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20"), PlayAudio("cherrybomb"), d.src = e.PicArr[8] + Math.random(), EDPZ.appendChild(d), oSym.addTask(70, ClearChild, [d]), e.PZ ? ((function(k, g) {
                    var w = Math,
                    q = w.max(1, k - 1),
                    o = w.min(oS.R, k + 1),
                    n = w.max(1, g - 1),
                    h = w.min(oS.C, g + 1),
                    r = oGd.$,
                    l,
                    j = "",
                    m;
                    do {
                        g = n;
                        do {
                            j = q + "_" + g + "_";
                            for (l = 0, len = 4; l < len; l++) { (m = r[j + l]) && m.BoomDie()
                            }
                        } while ( g ++< h )
                    } while ( q ++< o )
                })(e.R, GetC(e.ZX))) : (function(j, l) {
                    var w = Math,
                    m = j - 120,
                    o = j + 120,
                    h = w.min(1, l - 1),
                    g = w.max(oS.R, l + 1),
                    n,
                    k;
                    do {
                        k = (n = oZ.getArZ(m, o, h)).length;
                        while (k--) {
                            n[k].ExplosionDie()
                        }
                    } while ( h ++< g )
                })(e.ZX, e.R), e.DisappearDie())
            },
            [c]))
        },
        [b])
    },
    BirthCallBack: function(d) {
        var c = d.delayT,
        b = d.id,
        a = d.Ele = $(b);
        d.EleShadow = a.firstChild;
        d.EleBody = a.childNodes[1];
        c ? oSym.addTask(c,
        function(f, e) {
            var g = $Z[f];
            g && (PlayAudio("", true), ++oGd.$JackinTheBox, g.FreeSetbodyTime = 0, SetBlock(e), g.RandomOpenBox(f))
        },
        [b, a]) : (PlayAudio("", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b))
    },
    NormalDie: function() {
        var a = this;
        a.Status && !--oGd.$JackinTheBox && StopAudio("");
        a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
        oSym.addTask(250, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs()
    },
    ExplosionDie: function() {
        var a = this;
        a.Status && !--oGd.$JackinTheBox && StopAudio("");
        a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
        oSym.addTask(300, ClearChild, [a.Ele]);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs()
    },
    DisappearDie: function() {
        var a = this;
        a.Status && !--oGd.$JackinTheBox && StopAudio("");
        ClearChild(this.Ele);
        a.HP = 0;
        delete $Z[this.id];
        a.PZ && oP.MonPrgs()
    },
    CrushDie: function() {
        var a = this;
        a.Status && !--oGd.$JackinTheBox && StopAudio("");
        a.GoingDieHead(a.id, a.PicArr, a);
        ClearChild(a.Ele);
        a.HP = 0;
        delete $Z[a.id];
        a.PZ && oP.MonPrgs()
    }
}),
//沼泽僵尸从以下开始
oCaskZombie = InheritO(oNewspaperZombie, {
    EName: "oCaskZombie",
    CName: "酒桶僵尸",
    OrnHP: 500,
    HP: 500,
    Quickened: 2.2,
    Ornaments: 1,
    AudioArr: ["Cask"],
    PicArr: (function() {
        var a = "images/Zombies/CaskZombie/";
        var b = "images/Zombies/NewspaperZombie/";
        return ["images/Card/Zombies/NewspaperZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, b + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"]
    })(),
    getHit: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    getHit1: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    getHit2: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    getHit3: function(c, a, b) {
        b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10,
        function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1)
        },
        [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function() {})
    },
    CheckOrnHP: function(g, h, d, c, f, b, a) {
        var e = OrnNoneZombies.prototype; (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function() {
            return 1
        },
        g.ChkActs1 = function() {
            return 1
        },
        g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, 
PlayAudio("Cask"), oSym.addTask(150,
        function(m, l) {
            var k = $Z[m];
            if (!k) {
                return
            }
            var j = CZombies.prototype,
            i = k.Quickened;
            k.ChkActs = j.ChkActs;
            k.ChkActs1 = j.ChkActs1;
            k.Speed && (k.Speed = !k.FreeSlowTime ? i: 0.5 * i);
            if (!k.beAttacked) {
                return
            }
            k.EleBody.src = l;
            k.JudgeAttack()
        },
        [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]))
    }
}),
oDiggerZombie = InheritO(OrnNoneZombies, {
    EName: "oDiggerZombie",
    CName: "矿工僵尸",
    StandGif: 4,
    AttackGif: 5,
    HeadGif: 6,
    DieGif: 7,
    WalkGif0: 2,
    WalkGif1: 3,
    width: 143,
    height: 200,
    beAttackedPointL: 40,
    beAttackedPointR: 100,
    OSpeed: 3.2,
    Speed: 3.2,
    BirthCallBack: function(g) {
        var e = g.delayT,
        c = g.id,
        b = g.Ele = $(c),
        d = g.AttackedLX,
        f,
        a,
        h;
        f = g.EleShadow = b.firstChild;
        g.EleBody = b.childNodes[1];
        switch (true) {
        case d > GetX(9) : g.ChkActs = g.ChkActsL1;
            g.WalkStatus = 0;
            break;
        case d < GetX(0) : g.ChkActs = g.ChkActsL3;
            g.WalkStatus = 0;
            break;
        default:
            g.ChkActs = g.ChkActsL2;
            g.WalkStatus = 1;
            g.EleBody.src = g.PicArr[g.NormalGif = g.WalkGif1];
            SetHidden(f);
        }
        e ? oSym.addTask(e,
        function(j, i) {
            var k = $Z[j];
            k && (k.FreeSetbodyTime = 0, SetBlock(i))
        },
        [c, b]) : SetBlock(b)
    },
    JumpTime: 40,
    getShadow: function(a) {
        return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px"
    },
    PicArr: (function() {
        var a = "images/Zombies/DiggerZombie/";
        return ["", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Risk.gif" + $Random, a + "Sink.gif" + $Random]
    } ()),
    Jump: function(a) {
        a.beAttacked && (a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8] + Math.random(), oSym.addTask(160,
        function(c, b) {
            $Z[c] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 0, b.OSpeed = b.Speed = 2, b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2)
        },
        [a.id, a]), a.ChkActs = function() {
            return 1
        })
    },
    ChkActsL1: function(d, c, e, b) {
        if (d.JumpTime <= 0) {
            d.Jump(d);
            return 1
        }
        var a; ! (d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= (a = d.Speed), LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
        return 1
    },
    ChkActsL2: function(d, c, e, b) {
        var a; ! (d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedLX > GetX(0) ? (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= (a = d.Speed), d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px")) : (d.beAttacked && (d.WalkStatus = 0, d.Altitude = 1, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3)));
        return 1
    },
    ChkActsL3: CZombies.prototype.ChkActs,
    ChkActs1: function(d, c, e, b) {
        var a; ! (d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedLX += (a = d.Speed), d.ZX = d.AttackedRX += a, d.Ele.style.left = Math.ceil(d.X += a) + "px"));
        d.AttackedLX > GetX(9) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActs2);
        return 1
    },
    ChkActs2: function(e, c, f, b) {
        var a, d; ! (e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), !e.isAttacking ? (e.AttackedLX += (a = e.Speed)) > oS.W ? (f.splice(b, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += a, e.Ele.style.left = Math.ceil(e.X += a) + "px", d = 1) : d = 1) : d = 1;
        return d
    },
    JudgeAttack: function() {
        var e = this,
        b = e.ZX,
        c = e.R + "_",
        d = GetC(b),
        g = oGd.$,
        a,
        f = e.id; (a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g)) ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[9] + Math.random(), oSym.addTask(50,
        function(i, h) {
            $Z[i] && h.beAttacked && (h.EleBody.src = h.PicArr[h.AttackGif], h.Altitude = 1, h.NormalAttack(a[0], a[1]))
        },
        [f, e])) : e.NormalAttack(a[0], a[1]) : e.isAttacking && (e.EleBody.src = e.PicArr[10] + Math.random(), e.Altitude = 0, oSym.addTask(70,
        function(i, h) {
            $Z[i] && h.beAttacked && (h.isAttacking = 0, h.EleBody.src = h.PicArr[h.NormalGif])
        },
        [f, e]))
    },
    NormalAttack: function(b, a) {
        oSym.addTask(100,
        function(d, c) {
            var f = $Z[d],
            e;
            f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack())
        },
        [b, a])
    },
    JudgeAttackH: function() {
        var c = this,
        b = oZ.getZ0(c.ZX, c.R),
        d = c.id,
        a;
        b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2 ? (!c.isAttacking ? (c.isAttacking = 1, c.EleBody.src = c.PicArr[9] + Math.random(), a = b.id, !b.isAttacking && b.AttackZombie2(b, a, d), oSym.addTask(50,
        function(g, h, f, e) {
            $Z[h] && g.beAttacked && ($Z[e] && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, g.AttackZombie(h, e)) : g.JudgeAttackH())
        },
        [c, d, b, a])) : c.AttackZombie(d, a)) : c.isAttacking && (c.EleBody.src = c.PicArr[10] + Math.random(), c.Altitude = 0, oSym.addTask(70,
        function(f, e) {
            $Z[f] && e.beAttacked && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif])
        },
        [d, c]))
    },
    AttackZombie2: function(c, b, a) {
        c.isAttacking = 1;
        c.EleBody.src = c.PicArr[9] + Math.random();
        oSym.addTask(50,
        function(g, e, d, f) {
            $Z[e] && g.beAttacked && ((f = $Z[d]) && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, oSym.addTask(10,
            function(k, i, j, h) {
                $Z[i] && k.beAttacked && !k.FreeFreezeTime && !k.FreeSetbodyTime && ($Z[h] && j.beAttacked ? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h])) : (k.EleBody.src = k.PicArr[10] + Math.random(), k.Altitude = 0, oSym.addTask(70,
                function(l, m) {
                    $Z[l] && m.beAttacked && (m.isAttacking = 0, m.EleBody.src = m.PicArr[m.NormalGif])
                },
                [i, k])))
            },
            [g, e, f, d])) : (g.EleBody.src = g.PicArr[10] + Math.random(), g.Altitude = 0, oSym.addTask(70,
            function(h, i) {
                $Z[h] && i.beAttacked && (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif])
            },
            [e, g])))
        },
        [c, b, a])
    },
    GoingDie: function() {
        var b = this,
        c = b.id,
        a = b.PicArr;
        b.EleBody.src = a[7] + Math.random();
        b.GoingDieHead(c, a, b);
        b.beAttacked = 0;
        b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
        b.AutoReduceHP(c)
    },
    AutoReduceHP: function(a) {
        oSym.addTask(100,
        function(c) {
            var b = $Z[c];
            b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]))
        },
        [a])
    },
    ExplosionDie: function() {
        ClearChild(this.Ele);
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs()
    },
    DisappearDie: function() {
        ClearChild(this.Ele);
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs()
    },
    CrushDie: function() {
        ClearChild(this.Ele);
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs()
    },
    NormalDie: function() {
        this.HP = 0;
        delete $Z[this.id];
        this.PZ && oP.MonPrgs()
    }
}),
oSadakoZombie = InheritO(oZombie, {
    EName: "oSadakoZombie",
    CName: "贞子僵尸",
    OSpeed: 1.5,
    Speed: 1.5,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    getShadow: function(a) {
        return "display:none"
    },    
    JudgeAttack: function() {
        var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;
        for (f = c - 2, len = c;  f <= len; f++) {
            if (f > 9) {
                continue
            }
            for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
        }
    },
    JudgeLR: function(f, d, e, c, g) {
            return e > 10 || e < 1 ? false: function() {
                d += --e + "_";
                var h = 3,
                i;
                while (h--) {
                    if ((i = g[d + h])) {
                        return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                    }
                }
            } ()
    },
    JudgeSR: function(f, d, e, c, g) {
            return e > 9 ? false: function() {
                d += e + "_";
                var h = 3,
                i;
                while (h--) {
                    if ((i = g[d + h])) {
                        return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false
                    }
                }
            } ()
    },
    PicArr: (function() {
        var a = "images/Zombies/SadakoZombie/";
        return ["images/Card/Zombies/Zombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/NewspaperZombie/BoomDie.gif" + $Random, a + "1.gif"]
    })()
}),
oImp = InheritO(oZombie, {
    EName: "oImp",
    CName: "小鬼僵尸",
    OSpeed: 2,
    Speed: 2,
    HP: 220,
    getShadow: function(a) {
        return "left:" + (a.beAttackedPointL + 10) + "px;top:" + (a.height - 30) + "px"
    },
    PicArr: (function() {
        var a = "images/Zombies/Imp/";
        return ["images/Card/Zombies/Imp.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"]
    })()
}),
oBossA = InheritO(OrnNoneZombies, {
        EName: "oBossA",
        CName: "僵王博士-装甲火车",
        AttackGif: 2,
        LostHeadGif: 2,
        LostHeadAttackGif: 2,
        LostHeadGif: 2,
        HeadGif: 3,
        DieGif: 4,
        BoomDieGif: 5,
        StandGif: 6,
        HP: 25000,
        OSpeed: 0.5,
        Speed: 0.5,
        AudioArr: ["机甲爆炸", "僵王1", "僵王2", "僵王3", "hydraulic1", "hydraulic2"],
        BirthCallBack: function(a) {
            PlayAudio("僵王" + Math.floor(1 + Math.random() * 3));
            OrnNoneZombies.prototype.BirthCallBack(a)
        },
        PicArr: (function() {
            var a = "images/Zombies/BossA/";
            return ["", a + "0.gif", a + "Zombie.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, "" + $Random, a + "1.gif"]
        })(),
        getRaven: function(){},
        getShadow: function(a) {
            return "display:none"
        },    
        getExplosion: function() {
            PlayAudio("cherrybomb");
            this.HP -= 250;
            oSym.addTask(1,
            function() {
                var a = oDaoDan;
                CustomSpecial(a, 2, 6);
                CustomSpecial(a, 2, 4);
                CustomSpecial(a, 3, 8);
                CustomSpecial(a, 3, 2);
                CustomSpecial(a, 4, 7);
                CustomSpecial(a, 4, 2)
            },
            [])
        },
        NormalAttack: function(d, c) {
            PlayAudio("hydraulic" + Math.floor(1 + Math.random() * 2));
            SeeZombie(),//调用本函数前请确保关卡的ZName数组里已加入该僵尸,若不传参数，默认橄榄球僵尸。
            oSym.addTask(100,
            function(f, e) {
                var h = $Z[f],
                g;
                h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.Die(), h.JudgeAttack())
            },
            [d, c])
        },
        NormalDie: function() {
            var c = this;
            var e, d, b = "Snow_" + Math.random();
            for (d in $Z) { (e = $Z[d]).ZX < 901 && e.getRaven()}  //全场僵尸死亡控制
            c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
            oSym.addTask(250, ClearChild, [c.Ele]);
            c.HP = 0;
            delete $Z[c.id];
            c.PZ && oP.MonPrgs()
        }
})