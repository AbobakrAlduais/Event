//var User = require('./model/user.js');
//var Users = require('./collections/users');
//var Organizer = require('./model/organizer.js');
//var Organizers = require('./collections/Organizers');
var Event = require('./model/event.js');
var Events = require('./collections/events');
//var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {

    addEvent:function (req,res) {
    console.log("__in event")
    // console.log(req.body.tok)
    var decoded = jwt.decode(req.body.tok, 'secret')
    // var decoded = jwt.decode(token);
    console.log(decoded)
    organizerI = decoded.id
    console.log(organizerI)


      // console.log(req.username)
        ////>>>>>>>>>>
      ////need to get org id from the token to know which org adding the event;

          var eventName     = req.body.eventName;
          var type          = req.body.type;
          var location      = req.body.location;
          var date          = req.body.date;
          var cost          = req.body.cost;
          var organizerId   = decoded.id
      
      new Event({ eventName: eventName }).fetch().then(function(found) {
      if (found) {
        res.status(200).send("this event is already existed");
      } else {
          Events.create({
            eventName: eventName,
            type: type,
            location: location,
            date: date,
            cost: cost,
            organizerId: organizerId

          })
          .then(function(newEvent) {
              console.log(newEvent)
              //  var token = jwt.encode(newEvent, 'secret');
              // res.json({token: token});
            res.send(newEvent);
          });
        }
    });
  },

getAllEvent : function(req,res){
     // var decoded = jwt.decode(req.body.tok, 'secret')
     // var I     = decoded.id
// "sds".split("").splice(1).join("")
  var tok = jwt.decode(req.query.tok, 'secret')
  // console.log('in get all eve')
    //console.log(tok.id)
   
    Events.reset().fetch().then(function(events){
      console.log(999)
      var Orgevents=[];
       console.log(Orgevents)
      // console.log(events)
      for(var i=0;i<events.models.length;i++){
        if(tok.id===events.models[i].attributes.organizerId){
          //console.log('in for')
         // console.log(events.models[i].attributes.organizerId)
          Orgevents.push(events.models[i].attributes);

        }
      }
    console.log(Orgevents)
      res.json(Orgevents)
     })
    // .then(function(Orgevents){
    //   console.log(Orgevents)
    //   res.json(Orgevents)
    // })

    // console.log('in data rl btata')
    
   
    //   console.log(res)


}



};


