var name1 = prompt("Enter Player 1's Name");
var name2 = prompt("Enter Player 2's Name");
if (!name1 || name1 === "")
    name1 = "Player 1";
if (!name2 || name2 === "")
    name2 = "Player 2";
$(".turn0").text(name1 + "'s Turn");
$(".turn1").text(name2 + "'s Turn");
$("#p1").text(name1);
$("#p2").text(name2);

function showDice(n) {
    $(".board-img").before("<img src= '' alt= 'die-face' class= 'die-face'>");
    $(".die-face").attr("src", "Images/dice-" + n + ".jpg");
    setTimeout(function () { $(".die-face").remove(); }, 1000);
}

function convertToPoint(l, t) {
    var x, y;
    x = Math.floor(l + 45) / 60;
    y = (555 - t) / 60;
    if (y % 2 == 0) return (y * 10) + x;
    return (y * 10) + 11 - x;
}
function shiftToPoint(counter, e, i) {
    var x, y, l, t;
    if (e % 10 == 0) y = Math.floor(e / 10) - 1;
    else y = Math.floor(e / 10);
    rows[i] = y + 1;
    if (y % 2 == 0) x = e - 10 * y;
    else x = 10 * y + 11 - e;
    l = 60 * x - 45;
    t = 555 - 60 * y;
    $("." + counter).css("left", l + "px");
    $("." + counter).css("top", t + "px");
}

function movec(num, i) {
    var d, l, t, e;
    var t1, t2, l1, l2;
    l = $("." + c[i]).css("left");
    t = $("." + c[i]).css("top");
    l = parseInt(l, 10);
    t = parseInt(t, 10);
    if (rows[i] % 2 === 1) {
        d = 555 - l;
        if (d >= num * 60)
            $("." + c[i]).css("left", (l + num * 60) + "px");
        else {
            $("." + c[i]).css("left", "555px");
            $("." + c[i]).css("top", (t - 60) + "px");
            rows[i]++;
            d = num * 60 - d - 60;
            if (d > 0)
                $("." + c[i]).css("left", (555 - d) + "px");
        }
    }
    else if (rows[i] === 10) {
        d = l - 15;
        if (d > num * 60)
            $("." + c[i]).css("left", (l - num * 60) + "px");
        else if (d < num * 60) {
            $("." + c[i]).css("left", "15px");
            d = num * 60 - d;
            $("." + c[i]).css("left", (15 + d) + "px");
        }
        else {
            $("." + c[i]).css("left", "15px");
            $(".board-img").before("<img src= 'Images/fireworks.webp' alt= 'fw-img' class= 'fw fw1'>");
            if (i === 1) {
                $(".fw").removeClass("fw1");
                $(".fw").addClass("fw2");
            }
            $(".turn0").remove();
            $(".turn1").remove();
            if (i === 0)
                $(".win").text(name1 + " Wins");
            else $(".win").text(name2 + " Wins");
            $("button").removeClass("btn");
            $("button").addClass("btn1");
            $("button").html("<a href = 'index.html'>Restart</a>");
            $("button a").css("text-decoration", "none");
            $("button a").css("color", "white");
            return;
        }
    }
    else {
        d = l - 15;
        if (d >= num * 60)
            $("." + c[i]).css("left", (l - num * 60) + "px");
        else {
            $("." + c[i]).css("left", "15px");
            $("." + c[i]).css("top", (t - 60) + "px");
            rows[i]++;
            d = num * 60 - d - 60;
            if (d > 0)
                $("." + c[i]).css("left", (15 + d) + "px");
        }
    }
    setTimeout(function () {
        l = $("." + c[i]).css("left");
        t = $("." + c[i]).css("top");
        l = parseInt(l, 10);
        t = parseInt(t, 10);
        console.log(l + " , " + t);
        d = convertToPoint(l, t);
        if (M.has(d)) {
            console.log(d);
            e = M.get(d);
            console.log(e);
            shiftToPoint(c[i], e, i);
        }
    }, 1000);
    setTimeout(function () {
        t1 = parseInt($("." + c[0]).css("top"), 10);
        t2 = parseInt($("." + c[1]).css("top"), 10);
        l1 = parseInt($("." + c[0]).css("left"), 10);
        l2 = parseInt($("." + c[1]).css("left"), 10);
        if (l1 === l2 && t1 === t2) {
            t = $("." + c[0]).css("top");
            t = parseInt(t, 10);
            $("." + c[0]).css("top", (t + 15) + "px");
            t = $("." + c[1]).css("top");
            t = parseInt(t, 10);
            $("." + c[1]).css("top", (t - 15) + "px");
        }
    }, 1005);
}

var c = ["redcounter", "bluecounter"], i = 0, num, M, l, t, e;
M = new Map([[1, 38], [4, 14], [9, 31], [17, 7], [21, 42], [28, 84], [51, 67], [54, 34], [62, 19], [64, 60], [72, 91], [80, 99], [87, 36], [93, 73], [95, 75], [98, 79]]);
var rows = [1, 1]; // Rows in which counters are present
var t1, t2, l1, l2;
t1 = parseInt($("." + c[0]).css("top"), 10);
t2 = parseInt($("." + c[1]).css("top"), 10);
l1 = parseInt($("." + c[0]).css("left"), 10);
l2 = parseInt($("." + c[1]).css("left"), 10);
if (l1 === l2 && t1 === t2) {
    t = $("." + c[0]).css("top");
    t = parseInt(t, 10);
    $("." + c[0]).css("top", (t + 15) + "px");
    t = $("." + c[1]).css("top");
    t = parseInt(t, 10);
    $("." + c[1]).css("top", (t - 15) + "px");
}
$(".turn1").hide();
$(".btn").click(function () {
    $(".board-img").before("<img src= 'Images/dicef.webp' alt= 'dice-thrown' class= 'dthrow'>");
    setTimeout(function () { $(".dthrow").remove(); }, 2000);
    num = Math.floor(Math.random() * 6) + 1;
    setTimeout(showDice, 2000, num);
    var t1 = parseInt($("." + c[0]).css("top"), 10), t2 = parseInt($("." + c[1]).css("top"), 10);
    if (t1 - t2 === 30) {
        $("." + c[0]).css("top", (t1 - 15) + "px");
        $("." + c[1]).css("top", (t2 + 15) + "px");
    }
    setTimeout(movec, 3000, num, i);
    if (num != 6) {
        $(".turn" + i).hide();
        i = (i + 1) % 2;
        $(".turn" + i).show();
    }
});
