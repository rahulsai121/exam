const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User=require('../model/user')

exports.userPost=async(req,res)=>{
    console.log(req.body)
    try{
        const user=await User.findOne({where:{email: req.body.email}})

        if(!user){
            const hash=await bcrypt.hash(req.body.password, 10)

            const newUser=await User.create({
                username:req.body.name,
                email:req.body.email,
                password: hash
            })
            res.status(201).json({ message: 'User created successfully' })

            
        }
        else {

            res.status(409).json({ message: 'User already exists' })
        }
    }
    catch(error){
        console.log('error in login controller',error)
        res.status(500).json({error:error.massege})
    }
}
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }


        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(404).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.userGet=async (req,res)=>{

    try{

        const userDetails=await User.findOne({
            where:{
                id:req.userId
            }
        })
    
        res.status(200).json({ message: ' successful', userDetails:userDetails.dataValues});
    
    }
    catch(error){
        console.log('error in userGet',error)
        res.status(400).json({ error: error.message });
    }
}

exports.userUpdate=async(req,res)=>{
    try{

        const userDetails=await User.findOne({
            where:{
                id:req.userId
            }
        })

        if(req.body.name &&req.body.email){
            userDetails.username=req.body.name
            userDetails.email=req.body.email
        }
        else if(req.body.name){
            userDetails.username=req.body.name
        }
        else{
            userDetails.email=req.body.email
        }

        await userDetails.save()
    
       // res.status(200).json({ message: ' successful', userDetails:userDetails.dataValues});
    
    }
    catch(error){
        console.log('error in userUpdate',error)
        res.status(400).json({ error: error.message });
    }
}