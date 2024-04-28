const express = require('express'); 
const app = express(); 
const User = require('./GymMembers'); 
const zod = require("zod");
app.get('/', (req, res) => {
  res.send('Hello, World!'); 
});
app.use(express.json());


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const userSchema = zod.object({
    username: zod.string().min(3,"Username is required"),
    email: zod.string().email(),
    registeredData: zod.date().optional(),
    numberOfDays: zod.number().min(1,"Number of days must be at least 1")
})
const Member = (req,res,next) => {
    try {
        userSchema.parse(req.body);
        next()
    } catch (error) {
        res.status(400).json({errors: error.errors})
    }
}
app.get("/members",async (req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send("can't find users")
    }
})
app.get("/members/:id",async (req,res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId)
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user)
    } catch (error) {
        
    }
})
app.post("/members",Member,(req,res)=>{
    try {
    const newUser = User.create(req.body); 
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(500).json({ error: 'Error creating User' }); 
  }
})
app.put("/members/:id",Member,async (req,res)=>{
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const user = await User.findByPk(userId)
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = updateData.username;
        user.email = updateData.email;
        user.registeredData = updateData.registeredData;
        user.numberOfDays = updateData.numberOfDays;
        await user.save()
         res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
})
app.delete("/members/:id", async(req,res)=>{
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error: 'user not found'})
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({error: "error deleting user"})
    }
})