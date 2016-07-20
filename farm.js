var current;
var one;
$(document).ready(function() {
    var t = 800;
    var w = 350;
    var x = 600;
    var count = 0;
    $("#stopwater").hide();
    $(".imgplow").hide();
    $(".imgseed").hide();
    $(".imgwater").hide();
    $("#startwater").hide();
    $("#plot").prop("disabled",true).css("cursor","default");
    $("#seed").prop("disabled",true).css("cursor","default");
    $("#harvest").prop("disabled",true).css("cursor","default");
    $("#feedtree").click(function() {
        $(".farmboy").animate({
            "marginLeft": "+100px"
        }, 3000);
        $(".farmboy").animate({
            "marginTop": "+450px"
        }, 3000);
        $("#startwater").show();
    });
    $("#left").click(function() {
        moveLeft();
    });
    $("#right").click(function() {
        moveRight();
    });
    $("#top").click(function() {
        moveTop();
    });
    $("#down").click(function() {
        moveBottom();
    });
    $("#startwater").click(function() {
        startwater();
        setTimeout(myFun, 6000);
    });
    $("#stopwater").click(function() {
        stopwater();
    });
    $("#gohome").click(function() {
        $(".farmboy").animate({
            "marginTop": "+0px"
        }, 3000);
        $(".farmboy").animate({
            "marginLeft": "+0px"
        }, 3000);
    });
    createFarm(farmFields);
    $("#onfield").click(function() {
        $(".farmboy").animate({
            "marginTop": '200px'
        }, 3000);
        $(".farmboy").animate({
            "marginLeft": '600px'
        }, 3000);
        $("#plow").prop("disabled",false).css("cursor","pointer");
        $("#seed").prop("disabled",true).css("cursor","default");
        $("#harvest").prop("disabled",true).css("cursor","default");
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
        var td = '<td style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';
        if (i == 1) {
            var td = '<tr><td style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';
        }
        if (i == 4) {
            var td = '</tr><tr><td style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';

        }
        if (i == 6) {
            var td = '<td style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></tr>';
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
        $("#left").prop("disabled",true).css("cursor","default");
        $('#right').removeAttr('nextLeft');
    } else {
        $('#left').prop("disabled",false).css("cursor","pointer");
        $('#left').attr('nextLeft', btn.data.left);
    }
    if (!btn.isRightActive) {
        $('#right').prop("disabled",true).css("cursor","default");
        $('#right').removeAttr('nextRight');
    } else {
        $('#right').prop("disabled",false).css("cursor","pointer");
        $('#right').attr('nextRight', btn.data.right);
    }
    if (!btn.isTopActive) {
        $('#top').removeAttr('nextTop');
        $('#top').prop("disabled",true).css("cursor","default");
    } else {
        $('#top').prop("disabled",false).css("cursor","pointer");
        $('#top').attr('nextTop', btn.data.top);
    }
    if (!btn.isBottomActive) {
        $('#down').prop("disabled",true).css("cursor","default");
        $('#down').removeAttr('nextBottom');
    } else {
        $('#down').prop("disabled",false).css("cursor","pointer");
        $('#down').attr('nextBottom', btn.data.bottom);
    }
}
var setActive = function(current) {
    if (current == 'one') {
        activeFarmField = 'one';
        nextFarmField = 'two';
    }
}

function moveRight() {
    activeKey++;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) + 150;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
}

function moveLeft() {
    activeKey--;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) - 150;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
}

function moveTop() {
    activeKey -= 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) - 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
}

function moveBottom() {
    activeKey += 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) + 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
}
plowField = function(self) {
    //$("#seed").show();
    current = $(self).attr('current');
    $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/plow.png)').css('(z-index: 2)');
    $("#seed").prop("disabled",false).css("cursor","pointer");
     $("#plow").prop("disabled",true).css("cursor","default");
    console.log(current);
}
seedField = function(self) {
    $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/seed.png)');
    $("#harvest").prop("disabled",false).css("cursor","pointer");
    $("#seed").prop("disabled",true).css("cursor","default");
    $("#plow").prop("disabled",true).css("cursor","default");
    console.log(current);
}

function myFunction() {
    $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/field.png)');
   // $("#harvest").show();

    console.log(current);
}

function startharvest() {
    $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/land.png)');
    console.log(current);
}

function startwater() {
    $(".imgwater").show();
}

function stopwater() {
    $(".imgwater").hide();
}

function myFun() {
    alert("please stop the water");
    $("#stopwater").show();
}