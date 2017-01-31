function featuredStreams(url){
    $("#streams").append("<div class=\"streamers row heading\"><h2>Featured Live Streams</h2></div>");
    $.getJSON(url,function(json){
    // console.log(json);
      $.each(json.featured,function(index,key){  
        $("#streams").append("<div id=\"cont"+index+"\" class=\"streamers row\"> </div>");
        $("#cont"+index).append("<div class=\"col-xs-12 col-sm-2\"><img src=\""+key.stream.channel.logo+"\" class=\"img-circle img-responsive\"> </img></div>");
        $("#cont"+index).append("<div class=\"col-xs-12 col-sm-2\"><h4 style=\"word-wrap:break-word\">"+key.stream.channel.display_name+"</h4></div>");
        $("#cont"+index).append("<div class=\"col-xs-12 col-sm-2\"><h4><b>"+key.stream.game+"</b></h4></div>");
        if(key.stream.channel.status!==null){
          $("#cont"+index).append("<div class=\"col-xs-12 col-sm-6\"><a href=\""+key.stream.channel.url+"\" target=\"_blank\"><h4>"+key.stream.channel.status+"</h4></a></div>");
        }
        else{
          $("#cont"+index).append("<div class=\"col-xs-12 col-sm-6\"><a href=\""+key.stream.channel.url+"\" target=\"_blank\"><h4>No status available</h4></a></div>");
        }
      });
  });
}
function searchStreamer(url,name){
  var stream = "/streams/";
  var channel = "/channels/";
  $("#matchedStreamer").empty();
  if ($('#matchedStreamer').is(':empty')){
    $.getJSON(url+channel+name,function(channel){
      $.getJSON(url+stream+name,function(stream){
        $("#matchedStreamer").show();
        $("#matchedStreamer").empty(); 
        // console.log(json1);
        if(!channel.error){
          // console.log(json);
          $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-2\"><img src=\""+channel.logo+"\" class=\"img-circle img-responsive\"> </img></div>");
          $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-3\"><h4>"+channel.display_name+"</h4></div>");
          if(stream.stream!=null){
            $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-2\"><h4 style=\"color:green\">ONLINE</h4></div>");
            $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-2 text-center\"><h4><b>"+stream.stream.game+"</b></h4></div>");
            if(channel.status!==null){
               $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-3\"><a href=\""+channel.url+"\" target=\"_blank\"><h4>"+channel.status+"</h4></a></div>");
            }
            else{
              $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-3\"><a href=\""+channel.url+"\" target=\"_blank\"><h4>No status available</h4></a></div>");
            }
          } 
          else{
            $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-3\"><h4 style=\"color:red\">OFFLINE</h4></div>");
            if(channel.status!==null){
             $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-4\"><a href=\""+channel.url+"\" target=\"_blank\"><h4>"+channel.status+"</h4></a></div>");
            }
            else{
              $("#matchedStreamer").append("<div class=\"col-xs-12 col-sm-3\"><a href=\""+channel.url+"\" target=\"_blank\"><h4>No status available</h4></a></div>");
            }
          }
          
        }
        else{
          $("#matchedStreamer").empty();
            $("#matchedStreamer").append("<h3 class=\"text-center\"> Streamer does not exist or account is disabled</h3>");
        }
      });
    });
  }
}
$(document).ready(function(){
  
  var baseURL ="https://wind-bow.gomix.me/twitch-api";
  var featuredURL="https://wind-bow.gomix.me/twitch-api/streams/featured?limit=25";

  featuredStreams(featuredURL);
  $("#searchBar").keyup(function(){
    var bar = $(this);
    var streamer = bar.val(); 
    if(streamer!==""){
      $("#streams").hide();
      searchStreamer(baseURL,streamer);
    }
    else{
      $("#matchedStreamer").hide();
      $("#streams").show();
    }  
  });
});