const express=require('express')
user=(req,res)=>
{
    res.send('Users route');
}
login=(req,res)=>
{
    res.send('response from login route from backend')
}
register=(req,res)=>
{
    res.send('response from register route from backend')
}
logout=(req,res)=>
{
    res.send('response from logout route from backend')
}
module.exports={user,login,register,logout}
// Compare this snippet from backend/controllers/user.js: