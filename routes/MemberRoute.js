const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const memberModel = require('../models/Member');

router
// GET member
    .get('/', async (request, response) => {
        controller.getMembers()
            .then(members => response.send(members))
            .catch(error => response.status(400).send(error));
    })


    .get('/:id', async (request, response) => {
        let id = request.params.id;
        controller.getSingleMember(id)
            .then(member => response.send(member))
            .catch(error => response.status(400).send(error));
    })

    // POST member
    .post('/', (request, response) => {
        let memberObj = request.body;
        controller.postMember(memberObj)
            .catch(error => response.status(400).send(error));
    })

    // DELETE member
    .delete('/:id', async (request, response) => {
        let {id} = request.params;
        controller.deleteMember(id)
            .catch(error => response.status(400).send(error));
    })

    // PUT member
    .put('/:id', async function (request, response) {
        let {id} = request.params;
        let memberObj = request.body;
        controller.updateMember(id, memberObj)
            .catch(error => response.status(400).send(error));
    });


module.exports = router;