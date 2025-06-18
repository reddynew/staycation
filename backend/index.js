const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const port=3000
const router=require('./routes/userRoutes')
const hotelRoutes=require('./routes/hotelRoutes')
const parksRoutes=require('./routes/parksRoutes')
const pool=require('./db/db')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use('/api',router)
app.use('/api',hotelRoutes)
app.use('/api',parksRoutes)
app.get('/contact',(req,res)=>{
    res.send('Contact Us')
})
app.get('/services',(req,res)=>{    
    res.send('Our Services')
})
app.get('/products',(req,res)=>{                
    res.send('Our Products')
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})