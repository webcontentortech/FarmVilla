$(document).ready(function(){
    var t=800;
    var w=350;
    var x=600; 
    var count=0;
    $(".up").hide();
    $(".left").hide();
    $(".right").hide();
    $(".down").hide();
    $("#mic").hide();
    $("#vic").hide();
    $("#stopwater").hide();
    $("#harvest").hide();
    $("#seed").hide();
        $("#onfield").click(function () { 
            $(".farmboy").animate({ "marginTop":"+200px"},1000);
            $(".farmboy").animate({ "marginLeft":"+600px"},1000);
            $("#up").show();
            $("#left").show();
            $("#right").show();
            $("#down").show();
        });
        $("#feedtree").click(function () { 
            $(".farmboy").animate({ "marginTop":"+450px"},1000);
            $(".farmboy").animate({ "marginLeft":"+100px"},1000);
        });
        $("#gohome").click(function () { 
            $(".farmboy").animate({ "marginTop":"+0px"},1000);
            $(".farmboy").animate({ "marginLeft":"+0px"},1000);
        });
        $("#plow").click(function(){
            startploting();
        });
        
        $("#seed").click(function(){
            startseeding();
        });
        $("#right").click(function(){
            if (count<4) {
            goright();
            console.log(count);
            count++;
        }
        });
        $("#down").click(function(){
            godown();
            count=0;
        }); 
        $("#up").click(function(){
            goup();
        }); 
        $("#left").click(function(){
            goleft();
        }); 
        function startploting(){
            $(".seed").show();
        }
        function startseeding(){
            $("#mic").show();
        }
        function goright(){
            $(".farmboy").animate({ "marginLeft":"+"+t+"px"},1000);
            console.log(t);
            t=t+200;
        }
        function godown(){
            $(".farmboy").animate({ "marginTop":"+"+w+"px"},1000);
            console.log(w);   
        }
        function goup(){
            $(".farmboy").animate({ "marginTop":"+200px"},1000);
            console.log(t);
        }
        function goleft(){
            $(".farmboy").animate({ "marginLeft":"+"+x+"px"},1000);
            console.log(x);
        }
});
