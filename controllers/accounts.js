const express = require('express');

const router = express.Router();

const arr = [
    {
        username: 'aaa',
        password: '111',
        email: 'aaa@111'
    },
    {
        username: 'bbb',
        password: '222',
        email: 'bbb@222'
    },
    {
        username: 'ccc',
        password: '333',
        email: 'ccc@333'
    }
];

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

router.post('/Login', (request,response) =>{

    const {username,password,email} = request.body;
    arr.forEach(user=>{
        if(user.password==password && user.email==email)
        {
            return response.status(200).json({
                msg: `Hello ${user.username} from API route`
            });
        }
    }) 

    return response.status(200).json({
        msg: `u need to create a accounts`
    });
});


module.exports = router;