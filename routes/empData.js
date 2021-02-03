const express = require('express')
const emp = require('../models/empData')

const router = express.Router()




//Home
router.get('/home', (req, res, next) => {
    emp.find((err, result) => {
        //console.log(result)
        if(err) throw err;

        res.render('task.ejs',{ "emps": result });
    })
})


//Storing employee Data
router.post('/home', function(req, res, next) {
	// console.log(req.body);
	var empInfo = req.body;
	if(!empInfo.eid || !empInfo.fname || !empInfo.lname || !empInfo.email || !empInfo.phone){
		res.send();
    } 
    else {
		emp.findOne({eid:empInfo.eid},function(err,data){
		    if(!data){
				var c;
				emp.findOne({},function(err,data){
                    // console.log(data)
                    if (data) {
							// console.log("if");
						c = data.unique_id + 1;
                        }
                    else{
							c=1;
						}

					var newPerson = new emp({
						unique_id:c,
						eid:empInfo.eid,
						fname: empInfo.fname,
                        lname: empInfo.lname,
                        email: empInfo.email,
                        phone: empInfo.phone
                    });
                        //console.log(newPerson)

					newPerson.save(function(err, Person){
						if(err)
							console.log(err);
						else
							console.log('Success');
					});

				}).sort({_id: -1}).limit(1);
                    //res.send({"Success":"Details Submitted"});
                res.redirect('/home')
            }
            else{
					res.send({"Success":"Employeed ID is already used."});
				}

		});
	}
});



//deleting employee details.
router.get('/delete', (req, res, next) => { 
    var empID = req.param('id')

    emp.deleteOne({unique_id: empID}, (err, data) => {
        if(err){
            res.json(err)
        }
        else{
            //console.log('deleted')
            res.redirect('/home')
        }
    })
})


//Editing employee Details.
router.get('/edit', (req, res, next) => {
    var empID = req.param('id')
    //console.log(empID)
    return res.render('edit.ejs')
})

router.post('/edit', (req, res, next) => {
    var empID = req.param('id')
    const empUpdate = req.body
    //console.log(empUpdate)
    //console.log(empID)

    emp.findOne({unique_id:empID}, (err, data) => {
        //console.log(data)
        if(!data){
            res.send("idnot matched")
        }
        else{
            data.eid = empUpdate.eid;
            data.fname = empUpdate.fname;
            data.lname = empUpdate.lname;
            data.email = empUpdate.email;
            data.phone = empUpdate.phone;

            data.save((err, result) => {
                if(err) 
                    console.log(err)
                
                else {
                    res.redirect('/home');
                }
            })
        }
    })
})

module.exports = router