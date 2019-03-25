var Promise = TrelloPowerUp.Promise;

var SEND_TO_SPRINT_ICON = "./images/send_to_sprint.svg" // INCLUDE PATH TO FILE HERE
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
                    return t.card('name').get('name').set('name','OLHA O TESTE AÍ, GAROTADA');
                }
            },
            {
                icon: CARD_SYNC_ICON,
                text: "Sync with Sibling"
            }
        ]
        
    },

})