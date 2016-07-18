$(document).ready(function() {
    var t = 800;
    var w = 350;
    var x = 600;
    var count = 0;
    $(".up").hide();
    $(".left").hide();
    $(".right").hide();
    $(".down").hide();
    $("#mic").hide();
    $("#vic").hide();
    $("#stopwater").hide();
    $("#harvest").hide();
    $("#seed").hide();
    $(".imgplow").hide();
    $(".imgseed").hide();

    $("#feedtree").click(function() {
        $(".farmboy").animate({
            "marginLeft": "+100px"
        }, 1000);
        $(".farmboy").animate({
            "marginTop": "+450px"
        }, 1000);
    });
    $("#gohome").click(function() {
        $(".farmboy").animate({
            "marginTop": "+0px"
        }, 1000);
        $(".farmboy").animate({
            "marginLeft": "+0px"
        }, 1000);
    });
    $("#plow").click(function() {
        startploting();
    });

    $("#seed").click(function() {
        startseeding()();
    });

    function startploting() {
        $(".seed").show();
        $('#myFarm').find('td[current="' + activeFarmField + '"]').css('background', 'url(img/plow.png)');
    }

    function startseeding() {
        $(".imgplow").hide();
        $(".imgseed").show();
    }
    createFarm(farmFields);
    $("#onfield").click(function() {
        $(".farmboy").animate({
            "marginTop": '200px'
        }, 1000);
        $(".farmboy").animate({
            "marginLeft": '600px'
        }, 1000);
        activeButtons(farmFields.one);
    });
});
var defaultFarmField = 'one';
var activeFarmField = 'one';
var farmFields = {};
farmFields.one = {
    left: false,
    right: 'two',
    top: false,
    bottom: 'four',
    current: 'one'
}, farmFields.two = {
    left: 'one',
    right: 'three',
    top: false,
    bottom: 'five',
    current: 'two'
}, farmFields.three = {
    left: 'two',
    right: false,
    top: false,
    bottom: 'six',
    current: 'three'
}, farmFields.four = {
    left: false,
    right: 'five',
    top: 'one',
    bottom: false,
    current: 'four'
}, farmFields.five = {
    left: 'four',
    right: 'six',
    top: 'two',
    bottom: false,
    current: 'five'
}, farmFields.six = {
    left: 'five',
    right: false,
    top: 'three',
    bottom: false,
    current: 'six'
}
var farmArray = [];
var activeKey = 0;


var createFarm = function(farmData) {
    var i = 1;
    var elementToAppend = '';
    $.each(farmData, function(key, value) {
        var td = '<td width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '" ></td>';
        if (i == 1) {
            var td = '<tr><td width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';
        }
        if (i == 4) {
            var td = '</tr><tr><td width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';

        }
        if (i == 6) {
            var td = '<td width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td></tr>';
        }
        elementToAppend += td;
        farmArray.push(value);
        i++;
    });

    console.log('elementToAppend -----------------', elementToAppend, farmArray);
    $('#myFarm').html(elementToAppend);
}

var activeButtons = function(data) {
    console.log(data);
    var btn = {
        data: data
    };
    console.log(data.left);
    btn.isLeftActive = (data.left == false) ? false : true;
    btn.isRightActive = (data.right == false) ? false : true;
    btn.isTopActive = (data.top == false) ? false : true;
    btn.isBottomActive = (data.bottom) == false ? false : true;
    showButtons(btn);
}

var showButtons = function(btn) {
    console.log('BTN- -------------------', btn);
    $('#plow').attr('current', btn.data.current);
    if (!btn.isLeftActive) {
        $('#left').hide();
        $('#right').removeAttr('nextLeft');
    } else {
        $('#left').show();
        $('#left').attr('nextLeft', btn.data.left);
    }
    if (!btn.isRightActive) {
        $('#right').hide();
        $('#right').removeAttr('nextRight');
    } else {
        $('#right').show();
        $('#right').attr('nextRight', btn.data.right);
    }
    if (!btn.isTopActive) {
        $('#top').removeAttr('nextTop');
        $('#top').hide();
    } else {
        $('#top').show();
        $('#top').attr('nextTop', btn.data.top);
    }
    if (!btn.isBottomActive) {
        $('#down').hide();
        $('#down').removeAttr('nextBottom');
    } else {
        $('#down').show();
        $('#down').attr('nextBottom', btn.data.bottom);
    }
}
var setActive = function(current) {
    if (current == 'one') {
        activeFarmField = 'one';
        nextFarmField = 'two';
    }
}
var moveRight = function() {
    activeKey++;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) + 150;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
}
var moveLeft = function() {
    activeKey--;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) - 150;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
}
var moveTop = function() {
    activeKey -= 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) - 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
}

var moveBottom = function() {
    activeKey += 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) + 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
}

var plowField = function(self) {
    var current = $(self).attr('current');
    $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/plow.png)');
}