const express=require('express')
const app=express()
const object=require('./Functions')




app.post('/register',(req,res)=>
{
let name=req.body.name;
let email=req.body.mailid;
let phonenum=req.body.contactnum;
let password=req.body.pass;
let college=req.body.collegename;

let myObj = new object();

let result={}
result['status']='success';

let failure={}
failure['status']='failure';

async function a() {
    if (await myObj.update(name,email,phonenum,password,college) == 1)
        return res.status(200).json(result);
    else
        return res.status(200).json(failure);
}
a();

})



app.post('/login',(req,res)=>
{
let email=req.body.mailid;
let password=req.body.pass;

let myObj = new object();

let result={}
result['status']='success';

let failure={}
failure['status']='failure';

async function a() {
    if (await myObj.checkloginuser(email,password) == 1)
        return res.status(200).json(result);
    else
        return res.status(200).json(failure);
}
a();

})




