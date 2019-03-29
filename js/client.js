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
                            
                            var firstListID = t.get('board','shared','firstListSprint').then( (sprintListID) => {

                                var cardID = card.id
                                var cardURL = card.url
                                var data = null
                                var xhr = new XMLHttpRequest()
                                xhr.addEventListener(
                                    "readystatechange", function() {

                                        if (this.readyState === this.DONE) {
                                            console.log(this.responseText)
                                            var almostThere = this.responseText.split(",")[0].split('"')
                                            var twinCardID = almostThere[almostThere.length - 2]
                                            console.log(twinCardID)

                                            var findURL = this.responseText.search('"url":')
                                            var almostURL = this.responseText.substr(findURL + 5, this.responseText.length - 1)
                                            var twinCardURL = almostURL.split(",")[0].split('"')[1]
                                            console.log(twinCardURL)

                                            t.attach({url: twinCardURL})
                                            t.set('card','shared','siblingID',twinCardID)
                                            t.set(twinCardID,'shared','siblingID',cardID)


                                            var data2 = null
                                            var xhr2 = new XMLHttpRequest()
                                            xhr2.addEventListener(
                                                "readystatechange", function() {

                                                    if (this.readyState === this.DONE) {
                                                        console.log(this.responseText)
                                                    }
                                                }
                                            )


                                            xhr2.open("POST", CARD_EDIT_URL + "/" + twinCardID + "/attachments/?url=" + cardURL + "&key=" + API_KEY + "&token=" + TOKEN)
                                            xhr2.send(data2)


                                        }

                                    }
                                )
                                
                                xhr.open("POST", CARD_EDIT_URL + "/?idList=" + sprintListID + "&idCardSource=" + cardID + "&key=" + API_KEY + "&token=" + TOKEN)
                                xhr.send(data)
                            }
                            )
                            
                        }
                        )
                    }
                    )
                    
                    return null
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling",
                callback: function(t,options) {

                    var cardPromise = t.board('all').then ( (card) => {

                        var cardID = card.id
                        
                        var twinCardPromise = t.get('card','shared','siblingID').then( (twinCardID) => {
                            console.log(twinCardID)
                            var data = null
                            var xhr = new XMLHttpRequest()
                            xhr.addEventListener(
                                "readystatechange", function() {

                                    if (this.readyState === this.DONE) {
                                        var almostThere = this.responseText.split(",")[0].split('"')
                                        var listID = almostThere[almostThere.length - 2]
                                        console.log(listID)
                                        
                                        var data2 = null
                                        var xhr2 = new XMLHttpRequest()

                                        xhr2.addEventListener(
                                            "readystatechange", function(){
                                                if (this.readyState === this.DONE) {
                                                    var positionInList = this.responseText
                                                    console.log(this.responseText)

                                                    var data3 = null
                                                    var xhr3 = new XMLHttpRequest()

                                                    xhr3.addEventListener(

                                                        "readystatechange", function() {

                                                            if (this.readyState === this.DONE) {
                                                                var listID = this.responseText
                                                                console.log(positionInList)
                                                            }
                                                        }
                                                    )

                                                    xhr3.open("GET",CARD_EDIT_URL + "/" + twinCardID + "/idList?" + "&key=" + API_KEY + "&token=" + TOKEN)
                                                    xhr3.send(data3)


                                                }
                                            }
                                        )

                                        xhr2.open("GET", CARD_EDIT_URL + "/" + twinCardID + "/pos" + "&key=" + API_KEY + "&token=" + TOKEN)
                                        xhr2.send(data2)

                                    }

                                }
                            )
                            xhr.open("GET", CARD_EDIT_URL + "/" + twinCardID + "/list?" + "&key=" + API_KEY + "&token=" + TOKEN)
                            xhr.send(data)

                        }
                        )

                       


                    }
                    )

                }
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
                                    
                                    t.set('board','shared','sprintID',sprintID)
                                    t.set(sprintID,'shared','backlogID',boardID)


                                    var data2 = null
                                    var xhr2 = new XMLHttpRequest()
                                    
                                    xhr2.addEventListener(
                                        "readystatechange", function() {
                                            
                                            if (this.readyState === this.DONE) {
                                                console.log(this.responseText)
                                                var almostThere2 = this.responseText.split(",")[0].split('"')
                                                var firstListID = almostThere2[almostThere2.length - 2]

                                                t.set('board','shared','firstListSprint',firstListID)

                                        }
                                    }
                                    )
                                    xhr2.open("GET", BOARD_EDIT_URL + "/" + sprintID + "/lists?" + "&key=" + API_KEY + "&token=" + TOKEN)
                                    xhr2.send(data2)

                                }
                            }
                        )
                        postBoard(xhr,organizationID,"Sprint") // Creates Sprint Board
                        xhr.send(data)

                    }
                    )

                }
            }
        ]


    }

})