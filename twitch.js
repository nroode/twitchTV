// User Story: I can see whether Free Code Camp is currently streaming on Twitch.tv.
// User Story: I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
// User Story: if a Twitch user is currently streaming, I can see additional details about what they are streaming.


$(checkStatus);


function checkStatus() {
    // twitchUrl = "https://wind-bow.gomix.me/twitch-api/channels/rocketleague?callback=?";
    //wind-bow.glitch.me/twitch-api/users/rocketleague
    var regUser = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
   

    for (var i = 0; i < regUser.length; i++) {

        channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/" + regUser[i] + "?callback=?";
    
        var myLi = '';

        (function (i) {

        

            $.getJSON(channelUrl, function (response) {
                // console.log(response);
                // console.log(channelUrl);
                event.preventDefault();

                if (response.game !== null) { var game = response.game } else { var game = "" }
                if (response.status !== null) { var stream = response.status } else { var stream = "" }

            
                // console.log(game);

                myLi += `<div class="li  col-lg-3 col-md-4 col-sm-6 col-xs-12  ">
                            <div class="card_text">
                            <a href="${response.url}">
                            <div class="name"> ${response.display_name}</div>
                            <span class="logo"><img src="${response.logo}" class="img_${regUser[i]}"></span>
                            <div id="status" class="status_${regUser[i]}"></div>  
                            <span class="game"> ${game} </span>
                            <span class="stream"> ${stream}</span>
                            </a>
                            </div>
                            </div>`;

                document.querySelector("#userList").innerHTML = myLi;


                streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/" + regUser[i] + "?callback=?";


                $.getJSON(streamUrl, function (data) {
    
                    // console.log(data.stream);
        
                    if (data.stream === null) {
                        
                        $(`.status_${regUser[i]}`).html('Offline');
        
                    } else {
                        
                        console.log(data.stream.channel.status);
                        $(`.status_${regUser[i]}`).html('Online');
                        $(`.status_${regUser[i]}`).addClass('online');
                        $(`img.img_${regUser[i]}`).addClass('online');

                    }
        
                    // console.log(status);
                    
        
                });

            });

           
            // console.log(i);

        })(i);


    }



};

