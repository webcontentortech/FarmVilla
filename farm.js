var current;
var one;
var two;
var src;
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
    $("#plow").prop("disabled", true).css("cursor", "default");
    $("#seed").prop("disabled", true).css("cursor", "default");
    $("#harvest").prop("disabled", true).css("cursor", "default");
    $("#left").prop("disabled", true).css("cursor", "default");
    $("#right").prop("disabled", true).css("cursor", "default");
    $("#top").prop("disabled", true).css("cursor", "default");
    $("#down").prop("disabled", true).css("cursor", "default");
    $("#feedtree").click(function() {
        $(".farmboy").animate({
            "marginLeft": "+100px"
        }, 3000);
        $(".farmboy").animate({
            "marginTop": "+450px"
        }, 3000);
        setTimeout(startwaterbutton, 5000);
           
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
        setTimeout(stopbutton, 6000);
    });
    $("#stopwater").click(function() {
        stopwater();
    });
    $("#plow").click(function() {
        plowField(this);
    });
     $("#seed").click(function() {
        seedField(this);
        setTimeout(seededField(this), 6000);
    });
    $("#gohome").click(function() {
        $(".farmboy").animate({
            "marginTop": "+0px"
        }, 3000);
        $(".farmboy").animate({
            "marginLeft": "+0px"
        }, 3000);
        $("#startwater").hide();
    });
    createFarm(farmFields);
    $("#onfield").click(function() {
        $(".farmboy").animate({
            "marginTop": '250px'
        }, 3000);
        $(".farmboy").animate({
            "marginLeft": '645px'
        }, 3000);
        $("#plow").prop("disabled", false).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default");
        $("#harvest").prop("disabled", true).css("cursor", "default");
        activeButtons(farmFields.one);
        $("#startwater").hide();
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
        var td = '<td status="land" style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';
        if (i == 1) {
            var td = '<tr><td status="land" style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';
        }
        if (i == 4) {
            var td = '</tr><tr><td status="land" style = "background:url(img/land.png)" width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></td>';

        }
        if (i == 6) {
            var td = '<td status="land" style = "background:url(img/land.png)"width="200" height="150" current = "' + key + '" left = "' + farmData[key].left + '"></tr>';
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
    $('#seed').attr('current', btn.data.current);
    $('#harvest').attr('current', btn.data.current);
    if (!btn.isLeftActive) {
        $("#left").prop("disabled", true).css("cursor", "default");
        // document.getElementById("left").style.background="#222222";
        $('#right').removeAttr('nextLeft');
    } else {
        $('#left').prop("disabled", false).css("cursor", "pointer");
        $('#left').attr('nextLeft', btn.data.left);
    }
    if (!btn.isRightActive) {
        $('#right').prop("disabled", true).css("cursor", "default");
        $('#right').removeAttr('nextRight');
    } else {
        $('#right').prop("disabled", false).css("cursor", "pointer");
        $('#right').attr('nextRight', btn.data.right);
    }
    if (!btn.isTopActive) {
        $('#top').removeAttr('nextTop');
        $('#top').prop("disabled", true).css("cursor", "default");
    } else {
        $('#top').prop("disabled", false).css("cursor", "pointer");
        $('#top').attr('nextTop', btn.data.top);
    }
    if (!btn.isBottomActive) {
        $('#down').prop("disabled", true).css("cursor", "default");
        $('#down').removeAttr('nextBottom');
    } else {
        $('#down').prop("disabled", false).css("cursor", "pointer");
        $('#down').attr('nextBottom', btn.data.bottom);
    }
}

var moveRight= function() {
    activeKey++;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    console.log([activeKey]);
    var status = $('#myFarm').find('td[current="' + farmArray[activeKey].current + '"]').attr('status');
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) + 190;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
    if(status == 'land'){
        $("#plow").prop("disabled", false).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'plowed'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", false).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'seeded'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", false).css("cursor", "default");
    }
    console.log([activeKey]);
}

var  moveLeft= function(){
    activeKey--;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var status = $('#myFarm').find('td[current="' + farmArray[activeKey].current + '"]').attr('status');
    console.log(status);
    var off = $('#farmBoy').css('margin-left').replace('px', '');
    var margin = parseInt(off) - 190;
    $('#farmBoy').animate({
        'marginLeft': margin + 'px'
    }, 1000);
    if(status=='land'){
        $("#plow").prop("disabled",false).css("cursor","pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'plowed'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", false).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'seeded'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", false).css("cursor", "default");
    }
}

var moveTop = function(){
    activeKey -= 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var status = $('#myFarm').find('td[current="' + farmArray[activeKey].current + '"]').attr('status');
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) - 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
    if(status=='land'){
        $("#plow").prop("disabled",false).css("cursor","pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'plowed'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", false).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'seeded'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", false).css("cursor", "default");
    }
}

var moveBottom=function(){
    activeKey += 3;
    console.log(farmArray[activeKey]);
    activeButtons(farmArray[activeKey]);
    var status = $('#myFarm').find('td[current="' + farmArray[activeKey].current + '"]').attr('status');
    var off = $('#farmBoy').css('margin-top').replace('px', '');
    var margin = parseInt(off) + 150;
    $('#farmBoy').animate({
        'marginTop': margin + 'px'
    }, 1000);
    if(status=='land'){
        $("#plow").prop("disabled",false).css("cursor","pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'plowed'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", false).css("cursor", "default"); 
        $("#harvest").prop("disabled", true).css("cursor", "default");
    }else if(status == 'seeded'){
        $("#plow").prop("disabled", true).css("cursor", "pointer");
        $("#seed").prop("disabled", true).css("cursor", "default"); 
        $("#harvest").prop("disabled", false).css("cursor", "default");
    }
}

var plowField=function(self) {
    var current = $(self).attr('current');
    if($('#myFarm').find('td[current="' + current + '"]').attr('status') == 'land'){
        $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/plow.png)');
        $('#myFarm').find('td[current="' + current + '"]').attr('status', 'plowed');
        $("#seed").prop("disabled", false).css("cursor", "pointer");
        $("#plow").prop("disabled", true).css("cursor", "default");
        $("#harvest").prop("disabled", true).css("cursor", "pointer");
        console.log(status);
    }
}
var seedField=function(self){
    var current = $(self).attr('current');
    if($('#myFarm').find('td[current="' + current + '"]').attr('status') == 'plowed'){
        $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/seed.png)');
        $('#myFarm').find('td[current="' + current + '"]').attr('status', 'seed');
        $("#seed").prop("disabled", true).css("cursor", "default");
        $("#plow").prop("disabled", true).css("cursor", "default");
        $("#harvest").prop("disabled", false).css("cursor", "pointer");
    }
}
var seededField=function(self){
    var current = $(self).attr('current');
    if($('#myFarm').find('td[current="' + current + '"]').attr('status') == 'seed'){
        $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/field.png)');
        $('#myFarm').find('td[current="' + current + '"]').attr('status', 'seeded');
        $("#seed").prop("disabled", true).css("cursor", "default");
        $("#plow").prop("disabled", true).css("cursor", "default");
        $("#harvest").prop("disabled", false).css("cursor", "pointer");
        alert("hiii");
    }
}
var startharvest=function(self) {
    var current = $(self).attr('current');
    if($('#myFarm').find('td[current="' + current + '"]').attr('status') == 'seeded'){
        $('#myFarm').find('td[current="' + current + '"]').css('background', 'url(img/land.png)');
        $('#myFarm').find('td[current="' + current + '"]').attr('status','land');
        $("#seed").prop("disabled", true).css("cursor", "default");
        $("#plow").prop("disabled", false).css("cursor", "default");
        $("#harvest").prop("disabled", true).css("cursor", "pointer");
    }
    console.log(current);
}

var startwater=function() {
    $(".imgwater").show();
}

var stopwater=function() {
    $(".imgwater").hide();
    $("#stopwater").hide();
    $("#startwater").show();

}

var stopbutton=function() {
    alert("please stop the water");
    $("#startwater").hide();
    $("#stopwater").show();
}
var startwaterbutton=function(){
     $("#startwater").show();
}






