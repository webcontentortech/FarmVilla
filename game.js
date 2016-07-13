$(document).ready(function(){
    var t=800;
    var w=350;
    var x=800;    
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
        });
        $("#plot").click(function(){
            startploting();
        });
        $("#seed").click(function(){
            startseeding();
        });
        $("#right").click(function(){
            goright();
        }); 
        $("#down").click(function(){
            godown();
        }); 
        $("#up").click(function(){
            goup();
        }); 
        $("#left").click(function(){
            goleft();
        }); 
        function startploting(){
        $("#vic").show();
        $(".seed").show();
        $("#up").show();
        $("#left").show();
        $("#right").show();
        $("#down").show();
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
            $(".farmboy").animate({ "marginleft":"-"+x+"px"},1000);
            console.log(x);
        }
});
