var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" 
var CARD_SYNC_ICON = "./images/sync_icon.svg"

const API_KEY = ''
const TOKEN = ''

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
                    
                    var cardTest = t.card('all').then((card) => {
                        console.log(card.name)
                    })
                    
                    //t.set(cardID,'shared','name','SERÁ?')

                    // console.log(cardID, JSON.stringify(cardID), teste)
                    /*
                    var data = null
                    var xhr = new XMLHttpRequest()

                    xhr.addEventListener(
                        "readystatechange", function() {

                            if (this.readyState === this.DONE) {
                                console.log(this.responseText)
                            }
                        }
                    )
                    
                    xhr.open("PUT", CARD_EDIT_URL + cardID + "?name=" + newName + "&key=" + API_KEY + "&token=" + TOKEN)
                    xhr.send(data)
                    */
                    return cardTest
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },

})