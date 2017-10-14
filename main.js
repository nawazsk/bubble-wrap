(function(){
    function init(){
        var count = 0;
        var burstCount = 0;
        var time = 60;
        $(".gameArea").empty();
        $("#bubbleCount").html("Bubbles Wrapped <br/>"+count);
        $("#timer").html("Timer Left <br/>"+time);
        
        function generateBubbles(){
            $(".gameArea").empty();
            burstCount = 48;
            for(var i=0;i<48;i++){
                var bubble = document.createElement("img");
                bubble.id = "bubble"+i;
                bubble.src="assets/bub1.png";
                bubble.className = "bubble";
                $(".gameArea").append(bubble);
            }
            $(".bubble").click(function(){
                console.log("clicked");
                if($("#"+this.id).attr("src") === "assets/bub1.png"){
                    $("#"+this.id).attr("src", "assets/bub2.png" );
                    $("#bubbleCount").html("Bubbles Wrapped <br/>"+(++count));
                    var audio = document.createElement("audio");
                    audio.src = "assets/sound.wav";
                    audio.play();
                    $(audio).remove();
                    --burstCount;
                    if(burstCount === 0){
                        generateBubbles();
                    }
                }
                else{
                    console.log("no");
                }
            });

        }
        
        generateBubbles(0);
        
        
        var interval = window.setInterval(function(){
            
            if(time <=0){
                window.clearInterval(interval);
                $(".bubble").unbind("click");
                $(".gameScreen").hide();
                $(".resultScreen").show();
                $("#result").html("Bubbles Wrapped <br/>"+count);
                console.log(count);
            }
            else{
                $("#timer").html("Timer Left <br/>"+(--time));
            }
        },1000);
        
    }
    $("#start").click(function(){
        $(".startScreen").hide();
        $(".gameScreen").show();
        init();
    });
    $("#restart").click(function(){
        $(".resultScreen").hide();
        $(".gameScreen").show();
        init();
    });
    
    
    
    var rescale = function(){
        var parent = $(window);
        var gameArea = $("#gameArea");
        var widthToHeight =  2 / 3;
        var newWidth = parent.width();
        var newHeight = parent.height();
        var newWidthToHeight = newWidth / newHeight;
        var scale;
        
        if(newWidthToHeight > widthToHeight){
            newWidth = newHeight * widthToHeight;
            scale = newWidthToHeight;
        }
        else{
            newHeight = newWidth / widthToHeight;
            scale = widthToHeight;
            console.log("else");
        }
        
        
        
        $(".screen").each(function(){
            $(this).css({
                "width" : newWidth+"px",
                "height": newHeight+"px"
            });
        });
        $(".gameArea").css({
            "height" : (newHeight-60)+"px"
        });
        
        
        
    };
    
    rescale();
    
    $(window).resize(function(){
        rescale();
    });
    
    
    
})();