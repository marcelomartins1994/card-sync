var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint.svg" // INCLUDE PATH TO FILE HERE
var CARD_SYNC_ICON = "./images/sync_icon.svg" //INCLUDE PATH TO FILE HERE


TrelloPowerUp.initialize({

    'card-buttons':
    function(t,options)
    {
        return [
            {
                icon: SEND_TO_SPRINT_ICON,
                text: "Send To Sprint"
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },

})