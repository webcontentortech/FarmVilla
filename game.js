$(document).ready(function(){
    var t=800;
    var w=350;
    var x=800;    
    $(".b").hide();
    $(".d").hide();
    $("#11").hide();
    $("#vic").hide();
    $("#mic").hide();
    $("#15").hide();
    $("#16").hide();
    $("#17").hide();
    $("#18").hide();

    $("#7").click(function () { 
    $(".k").animate({ "marginTop":"+200px"},1000);
    $(".k").animate({ "marginLeft":"+600px"},1000);
    });
    $("#12").click(function(){
        startploting();
    });
    $("#13").click(function(){
        startseeding();
    });
    $("#17").click(function(){
        goright();
    }); 
    $("#18").click(function(){
        godown();
    }); 
    $("#15").click(function(){
        goup();
    }); 
     $("#16").click(function(){
        goleft();
    }); 


    function startploting(){
        $("#vic").show();
        $(".b").show();
        $("#15").show();
        $("#16").show();
        $("#17").show();
        $("#18").show();

    }
    function startseeding(){
        $("#mic").show();
        

    }
    function goright(){
        $(".k").animate({ "marginLeft":"+"+t+"px"},1000);
        console.log(t);
        
        t=t+200;

    }
    function godown(){
        $(".k").animate({ "marginTop":"+"+w+"px"},1000);
        console.log(w);
        
        
    }
    function goup(){
        $(".k").animate({ "marginTop":"+200px"},1000);
        console.log(t);
    }
    function goleft(){
        $(".k").animate({ "marginleft":"-"+x+"px"},1000);
        console.log(x);
    }
});
