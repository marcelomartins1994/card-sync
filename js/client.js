var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" 
var CARD_SYNC_ICON = "./images/sync_icon.svg"

const API_KEY = "719193026361d54cf72ec2b372744cb4"
const TOKEN = "27a6f844cf95d64099ab9ed5e05dc7dc925d3af22daa8537014fe31be064d44d"

const CARD_EDIT_URL = "https://api.trello.com/1/cards"

function sendToSprint(t) {



}


function copyCardToList(cardToCopyID,listID/*,boardID*/) {

    var payload = {
        due: "",
        idList: listID,
        idCardSource: cardToCopyID,
        keepFromSource: "all"
    }

    var url = CARD_EDIT_URL + "?key=" + API_KEY + "&token=" + TOKEN
    var options = {
        method: "post",
        payload: payload
    }

    UrlFetchApp.fetch(url,options)

}







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
                    
                        var newName = "AGORA VAI, PORRA! (2)"
                        var data = null
                        var xhr = new XMLHttpRequest()

                        xhr.addEventListener(
                            "readystatechange", function() {

                                if (this.readyState === this.DONE) {
                                    console.log(this.responseText)
                                }
                            }
                        )
                        
                        xhr.open("POST", CARD_EDIT_URL /*+ "/" + cardID*/ + "/?name=" + newName + "&key=" + API_KEY + "&token=" + TOKEN)
                        xhr.send(data)
                        
                    })
                    
                    /*
                    var listPromise = t.card('all').then( (card) => {

                        var listID = card.idList
                        
                        var newCard = {
                            name: 'New Test Card', 
                            desc: 'This is the description of our new card.',
                            // Place this card at the top of our list 
                            idList: listID,
                            pos: 'top'
                          };
                          
                        window.Trello.post('/cards/', newCard, creationSuccess);
                    


                    }
                    )
                    */

                    


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