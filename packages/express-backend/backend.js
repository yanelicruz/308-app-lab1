// backend.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userService from "../../mongoo/user-services.js";

async function ensureSeed() 
{
    const all = await userService.getUsers();
    
    if (all.length === 0) 
    {
      await userService.addUser({ name: "Charlie", job: "Janitor" });
      await userService.addUser({ name: "Mac", job: "Bouncer" });
      await userService.addUser({ name: "Mac", job: "Bouncer" });
      await userService.addUser({ name: "Dee", job: "Aspiring actress" });
      await userService.addUser({ name: "Dennis", job: "Bartender" });
      console.log("Seeded initial users.");
    }
}

ensureSeed().catch(console.error);

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World! yayayayayayayay");
});

app.get("/users", async (req, res) => 
{
    const { name, job } = req.query;
    
    try 
    {
        const users = await userService.getUsers(name, job);
        res.send({ users_list: users });
    } 
    
    catch (err) 
    {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

app.post("/users", async (req, res) => 
{
    try 
    {
        const { name, job } = req.body;
      
        if (!name || !job) 
        {
            return res.status(400).send({ error: "Both name and job are required" });
        }
      
        const saved = await userService.addUser({ name, job });
        res.status(201).send(saved);
    } 
    
    catch (err) 
    {
        console.error(err);
        res.status(400).send({ error: err.message ?? "Failed to add user" });
    }
});

app.get("/users/:id", async (req, res) => 
{
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    {
        return res.status(400).send({ error: "Invalid id format" });
    }

    try 
    {
        const user = await userService.findUserById(id);
        if (!user) return res.status(404).send("Resource not found.");
        res.send(user);
    } 
    
    catch (err) 
    {
        console.error(err);
        res.status(400).send({ error: "Error occurred" });
    }
});

app.delete("/users/:id", async (req, res) => 
{
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    {
        return res.status(400).send({ error: "Invalid id format" });
    }

    try 
    {
        const deleted = await userService.deleteUserById(id);
        if (!deleted) return res.status(404).send("Resource not found.");
        res.status(204).send();
    } 
    
    catch (err) 
    {
        console.error(err);
        res.status(400).send({ error: "Error occurred" });
    }
});

app.listen(port, () => {
  console.log(`Job app listening at http://localhost:${port}`);
});
