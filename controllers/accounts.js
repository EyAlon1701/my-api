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

    const {password,email} = request.body;
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


router.post('/addUser', (request,response) =>{

    const {username,password,email} = request.body;
    if(username==null || password==null || email==null)
    {
        return response.status(200).json({
            msg: `data missing`
        });
    }
    arr.forEach(user=>{
        if(user.email==email)
        {
            return response.status(200).json({
                msg: `${user.email} already exist`
            });
        }
    })
    arr.push({username,password,email});

    return response.status(200).json({
        msg: arr
    });
});

module.exports = router;