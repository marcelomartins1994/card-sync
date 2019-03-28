var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" 
var CARD_SYNC_ICON = "./images/sync_icon.svg"

const API_KEY = "719193026361d54cf72ec2b372744cb4"
const TOKEN = "27a6f844cf95d64099ab9ed5e05dc7dc925d3af22daa8537014fe31be064d44d"

const CARD_EDIT_URL = "https://api.trello.com/1/cards"
const BOARD_EDIT_URL = "https://api.trello.com/1/boards"

function sendToSprint(t) {



}


function postCard(xhrRequest,card) {

    var cardinfo = "ble"
    xhrRequest.open("POST", CARD_EDIT_URL + "/?" + cardinfo + "&key=" + API_KEY + "&token=" + TOKEN)

}



function postBoard(xhrRequest,organizationID,boardName) {

    xhrRequest.open("POST", BOARD_EDIT_URL + "/?idOrganization=" + organizationID +"&name=" + boardName + "&key=" + API_KEY + "&token=" + TOKEN)

}


function copyBoard(xhrRequest,orgID,board2Copy,boardName) {

    xhrRequest.open("POST", BOARD_EDIT_URL + "/?idOrganization=" + orgID +"&name=" + boardName + "&idBoardSource=" + board2Copy + "&key=" + API_KEY + "&token=" + TOKEN)

}



function copyCardToBoard(xhrRequest,card,boardID) {

    var newCard = card
    newCard.idBoard = boardID

    postCard(xhrRequest,newCard)



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
                            
                            var firstListID = t.get(sprintID,'shared')
                            var name = card.name
                            var data = null
                            var xhr = new XMLHttpRequest()
                            xhr.addEventListener(
                                "readystatechange", function() {
    
                                    if (this.readyState === this.DONE) {
                                        console.log(this.responseText)
                                    }
                                }
                            )
                            xhr.open("POST", CARD_EDIT_URL + "/?idBoard=" + sprintID + "&name=" + name + "&key=" + API_KEY + "&token=" + TOKEN)
                            xhr.send(data)
                            /*var cardURL = card.url
                            t.attach({
                                url: cardURL
                            })*/

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
                        var boardID = board.id
                        var data = null
                        var xhr = new XMLHttpRequest()

                        xhr.addEventListener(
                            "readystatechange", function() {

                                if (this.readyState === this.DONE) {
                                    console.log(this.responseText)
                                    var almostThere = this.responseText.split(",")[0].split('"')
                                    var sprintID = almostThere[almostThere.length - 2]
                                    console.log(sprintID)
                                }
                            }
                        )
                        postBoard(xhr,organizationID,"Sprint") // Creates Sprint Board
                        

                        //console.log(sprintID)
                        xhr.send(data)
                        
                        /*
                        var orgPromise = t.organization('all').then( (org) => {

                            var boardsIDs = org.idBoards

                            for (i=0 ; i < boardsIDs.length; i++) {

                                var newBoardPromise = t.get(boardsIDs[i],'shared','name').then( (name) => {

                                    if (name.localeCompare("Sprint") == 0) {

                                        var sprintID = boardsIDs[i]
                                        break

                                    }

                                })

                            }

                            var data = null
                            var xhr = new XMLHttpRequest()

                            xhr.addEventListener(
                                "readystatechange", function() {
                                    if (this.readyState == this.DONE) {
                                        console.log(this.responseText)
                                    }
                                }
                            )  

                            var sprintLists = xhr.open("GET", BOARD_EDIT_URL + "/" + sprintID)

                        }
                        )


                        var data = null
                        var xhr = new XMLHttpRequest()

                        xhr.addEventListener(
                            "readystatechange", function() {

                                if (this.readyState === this.DONE) {
                                    console.log(this.responseText)
                                }
                            }
                        )
                        
                        var sprintLists = xhr.open("GET", BOARD_EDIT_URL + "/" + sprintID)

                        t.set('board', 'shared', {sprintID: sprintID, sprintFirstList: "*"})
                        xhr.send(data)
                        */
                    }
                    )

                }
            }
        ]


    }

})