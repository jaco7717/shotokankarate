const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();


router
// GET member
    .get('/',  (request, response) => {
        controller.getMembers()
            .then(members => response.send(members))
            .catch(error => response.status(400).send(error));
    })


    .get('/:id',  (request, response) => {
        let id = request.params.id;
        controller.getSingleMember(id)
            .then(member => response.send(member))
            .catch(error => response.status(400).send(error));
    })

    // POST member
    .post('/', (request, response) => {
        let memberObj = request.body;
        controller.postMember(memberObj).then(e => response.send(e))
            .catch(error => response.status(400).send({error}));
    })

    // DELETE member
    .delete('/:id',  (request, response) => {
        let {id} = request.params;
        controller.deleteMember(id).then (e=> response.send(e))
            .catch(error => response.status(400).send(error));
    })

    // PUT member
    .put('/:id', (request, response) => {
        let {id} = request.params;
        let memberObj = request.body;
        controller.updateMember(id, memberObj).then (e=> response.send(e))
            .catch(error => response.status(400).send(error));
    })


module.exports = router;