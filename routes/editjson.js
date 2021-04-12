const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/editjson',function(req,res,next){
   
  
    var user = require('../199.json');
    // Read the file and send to the callback

    var data= [];
    // create a JSON object
    for(var i=0; i < 30;i++)
    {
        var national_id = 'IE' + Math.floor(Math.random()*1000 + 1);
        var cow = { 
            id : i+1,
            cow_id : user.animals[i].cow_id,
            dim : user.animals[i].dim,
            rf_id : user.animals[i].rf_id,
            last_calved : user.animals[i].last_calved,
            dob: user.animals[i].dob,
            national_id : national_id,
            last_heat : user.animals[i].last_heat
        };
        data.push(cow);

    }
    
    data = { animals : data }; 
    data = JSON.stringify(data);

    // write JSON string to a file
    fs.writeFile('animals.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    res.send("<h1>edit json</h1>" );
    });
module.exports = router;