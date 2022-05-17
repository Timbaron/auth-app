import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
const KEY = "wfbegbjbuwebgjwebguowbgjrbguobjwgrbgwrjbgu3rbgrjgb";
export default function Login(req, res) {

    // if res.body is empty
    // if (req.body === undefined) {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.end(JSON.stringify({
    //         message: "Please enter your email and password"
    //     }));
    // }
    if(!req.body){
        res.statuscode = 404;
        res.end('Error');
        return;
    }
// console.log(req.body);

    // extract values from res.body
    const { email, password } = req.body;

    $token = res.json({
        token: jwt.sign({
            email,
            password,
            admin: email === 'doron@segal.com' && password === '123456',
        }, KEY)
    });

    // Alert token
    alert(token);
}