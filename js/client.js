var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" 
var CARD_SYNC_ICON = "./images/sync_icon.svg"

const API_KEY = "719193026361d54cf72ec2b372744cb4"
const TOKEN = "27a6f844cf95d64099ab9ed5e05dc7dc925d3af22daa8537014fe31be064d44d"

const CARD_EDIT_URL = "https://api.trello.com/1/cards/"

//function sendToSprint(t) {

  //  t.set('name',"OLHA O TESTE AÍ, GAROTADA")

//}





TrelloPowerUp.initialize({

    'card-buttons':
    function(t,options)
    {
        return [
            {
                icon: SEND_TO_SPRINT_ICON,
                text: "Send To Sprint",
                callback: function(t) {
                    
                    var cardPromise = t.card('all').then((card) => {
                        var cardID = card.id 
                    
                        var newName = "AGORA VAI, PORRA!"
                        var data = null
                        var xhr = new XMLHttpRequest()

                        xhr.addEventListener(
                            "readystatechange", function() {

                                if (this.readyState === this.DONE) {
                                    console.log(this.responseText)
                                }
                            }
                        )
                        
                        xhr.open("PUT", CARD_EDIT_URL + cardID + "/?name=" + newName + "&key=" + API_KEY + "&token=" + TOKEN)
                        xhr.send(data)
                        
                    })

                    return null
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },

})