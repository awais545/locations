var UserHistory = require('../models/userHistory');

module.exports = function(app){

    // API for locations
    // Adds lat and longitude against a username in history table
    // params ltd:float, lng:float, email:string
    app.get('/locations', function(req, res){
        if(!req.query.ltd){
            res.send(400, "missing required parameter ltd")
        }
        else if(!req.query.lng){
            res.send(400, "missing required parameter lng")
        }
        else if(!req.query.email){
            res.send(400, "missing required parameter email")
        }
        else{
            UserHistory.findOne({email: req.query.email}, function(err, userHistory){
                if(err){
                    res.json(err)
                }
                else if(userHistory){
                    userHistory.history.push({ltd: req.query.ltd, lng: req.query.lng})
                    userHistory.save(function(err){
                        if(err){
                            res.json(err)
                        }
                        else{
                            res.json({email: userHistory.email, params: userHistory.history.pop()})
                        }
                    })
                }
                else{
                    userHistory = new UserHistory();
                    userHistory.email = req.query.email;
                    userHistory.history.push({ltd: req.query.ltd, lng: req.query.lng});
                    userHistory.save(function(err){
                        if(err){
                            res.json(err)
                        }
                        else{
                            res.json({email: userHistory.email, params: userHistory.history.pop()})
                        }
                    })
                }
            })
        }
    });

    // API for getting the user history
    // retrieves history against a username
    // params email
    app.get('/locations/history', function(req, res){
        if(!req.query.email){
            res.send(400, "missing required parameter email")
        }
        else{
            UserHistory.findOne({email: req.query.email}, function(err, userHistory){
                if(err){
                    res.json(err)
                }
                else if(userHistory){
                    res.json(userHistory.history)
                }
                else{
                    res.send(404, "No history found for the user")
                }
            })
        }
    });
}