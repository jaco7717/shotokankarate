const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();


router
// GET member
    .get('/', async (request, response) => {
        response.json(await memberModel.find().exec())
    })


    .get('/:id', async (request, response) => {
        let id = request.params.id;
        response.json(await memberModel.find({_id: id}).exec())
    })

    // POST member
    .post('/', (request, response) => {
        let found = false;
        let memberObj = request.body;
        if (memberObj.name) {
            let member = new memberModel({
                name: memberObj.name,
                age: memberObj.age,
                email: memberObj.email,
                password: memberObj.password,
            });

            memberModel.find().exec().then(array => {
                    for (let i of array) {
                        if (i.email === memberObj.email) {
                            found = true;
                        }
                    }

                    if (found === false) {
                        member.save();
                        response.status(200).send("Message sent");
                    } else {
                        response.status(406).send("Error");
                    }
                }
            )

        }
    })

    // DELETE member
    .delete('/:id', async (request, response) => {
        let {id} = request.params;

        await memberModel.find({_id: id}).deleteOne().exec();

        response.status(200).send("Message sent");
    })

    // PUT member
    .put('/:id', async function (request, response) {
        let {id} = request.params;
        let memberObj = request.body;
        if (memberObj.name) {
            let member = new newsModel({
                name: memberObj.name,
                age: memberObj.age,
                email: memberObj.email,
                password: memberObj.password,
            });

            await memberModel.findOneAndUpdate({_id: id}, memberObj);
            response.status(200).send("Member updated")

        }
    });


module.exports = router;