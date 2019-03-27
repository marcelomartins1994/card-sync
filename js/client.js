var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" 
var CARD_SYNC_ICON = "./images/sync_icon.svg"

const API_KEY = "719193026361d54cf72ec2b372744cb4"
const TOKEN = "27a6f844cf95d64099ab9ed5e05dc7dc925d3af22daa8537014fe31be064d44d"

const CARD_EDIT_URL = "https://api.trello.com/1/cards"
const BOARD_EDIT_URL = "https://api.trello.com/1/boards"

function sendToSprint(t) {



}


function postCard(xhrRequest,card,boardID) {

    xhrRequest.open("POST", CARD_EDIT_URL + "/?idBoard=" + boardID + "&key=" + API_KEY + "&token=" + TOKEN)

}



function postBoard(xhrRequest,organizationID,boardName) {

    xhrRequest.open("POST", BOARD_EDIT_URL + "/?idOrganization=" + organizationID +"&name=" + boardName + "&key=" + API_KEY + "&token=" + TOKEN)

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
                    
                    var sprintPromise = t.get('board','shared','sprintID').then( (sprintID) => {
                        var cardPromise = t.card('all').then( (card) => {
                            var cardURL = card.url
                            t.attach({
                                url: cardURL
                            })

                        }
                        )
                    }
                    )
                    
                    return null
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },


    'board-buttons':
    function(t,options)
    {

        return [
            {
                icon: SEND_TO_SPRINT_ICON,
                text: "Create Sprint Board",
                callback: function(t)
                {
                    var boardPromise = t.board('all').then( (board) => {

                        var organizationID = board.idOrganization
                        var data = null
                        var xhr = new XMLHttpRequest()

                        xhr.addEventListener(
                            "readystatechange", function() {

                                if (this.readyState === this.DONE) {
                                    console.log(this.responseText)
                                }
                            }
                        )
                        t.set('board', 'shared', 'sprintID', organizationID)
                        postBoard(xhr,organizationID,"Sprint")
                        xhr.send(data)

                    }
                    )

                }
            }
        ]


    }

})