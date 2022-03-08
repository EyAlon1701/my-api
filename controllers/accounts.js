const express = require('express');

const router = express.Router();

router.get('/sayHello', (request,response) =>{
    return response.status(200).json({
        msg: 'Say hello from API route'
    });
});

router.post('/sayHello', (request,response) =>{

    const fullName = request.body.fullName;
    console.log(fullName);

    return response.status(200).json({
        msg: `Hello ${fullName} from API route`
    });
});

module.exports = router;