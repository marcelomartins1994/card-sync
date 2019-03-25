var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint_icon.svg" // INCLUDE PATH TO FILE HERE
var CARD_SYNC_ICON = "./images/sync_icon.svg" //INCLUDE PATH TO FILE HERE


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
                    
                    document.getElementsByClassName("card-detail-title-assist js-title-helper")[0].textContent = "É AGORA, SENHORES!"
                    console.log("Eba!")
                    return true
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },

})