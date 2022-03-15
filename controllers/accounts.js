const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

const users = [
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

const usersWithHase = [
    {
        username: 'bbb',
        password: '222',
        email: 'bbb@222'
    },
    {
        username: "eyalon",
        password: "$2a$10$8T7HyK3DlyeJxCN7Cw7GA.UcLcNbWaZrQi5Mm4jfx0DKdb6LlYWOC",
        email: "eyalon@123"
    }
]

router.post('/registerHash', async(request,response) =>{

    const {username,password,email} = request.body;

    if(username==null || password==null || email==null)
    {
        return response.status(200).json({
            msg: `data missing`
        });
    }
    usersWithHase.forEach(user=>{
        if(user.email==email)
        {
            return response.status(200).json({
                msg: `${user.email} already exist`,
                users: usersWithHase
            });
        }
    })
    const hash_password = await bcryptjs.hash(password,10);
    usersWithHase.push({username,hash_password,email});

    return response.status(200).json({
        msg: `Registered successfully ${username} ${hash_password} ${email}`
    });
});

router.post('/loginHash', async(request,response) =>{

    const {password,email} = request.body;

    usersWithHase.forEach(user=>{
        if(user.email==email)
        {
            isMatch = bcryptjs.compare(password,user.password)
            console.log(isMatch);
            if(isMatch)
            {
                const token = jsonwebtoken.sign(user, 'EyAlon#1701');
                console.log("here")
                return response.status(200).json({
                    token: token,
                });
            }
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
    users.forEach(user=>{
        if(user.email==email)
        {
            return response.status(200).json({
                msg: `${user.email} already exist`
            });
        }
    })
    users.push({username,password,email});

    return response.status(200).json({
        msg: users
    });
});

module.exports = router;




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

router.post('/login', async(request,response) =>{

    const {password,email} = request.body;

    const hash_password = await bcryptjs.hash(password,10);
    const isMatch = await bcryptjs.compare(password,hash_password);

    const data = {
        id: 123456,
        firstname: 'eyalon',
        lastname: 'hershler',
        email: 'eyalon@gmail.com',
    }
    
    const token = await jsonwebtoken.sign(data, 'EyAlon#1701');

    if(isMatch)
    {
        return response.status(200).json({
            token: token,
            hash_password: hash_password
        });
    }
    else
    {
        return response.status(200).json({
            msg: `False`
        });
    }

    users.forEach(user=>{
        if(user.password==password && user.email==email)
        {
            return response.status(200).json({
                msg: `Hello ${user.username} from API route your hash pass ${hash_password}`
            });
        }
    }) 

    return response.status(200).json({
        msg: `u need to create a accounts`
    });
});