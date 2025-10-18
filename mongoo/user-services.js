import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers(name, job) 
{
    if (name === undefined && job === undefined) 
    {
        return userModel.find();
    } 
    
    else if (name && job) 
    {
        return findUserByNameAndJob(name, job);
    } 
    
    else if (name && !job) 
    {
        return findUserByName(name);
    } 
    
    else if (job && !name) 
    {
        return findUserByJob(job);
    }

    return userModel.find();
}

function findUserById(id) 
{
    return userModel.findById(id);
}

function addUser(user) 
{
    const userToAdd = new userModel(user);
    return userToAdd.save();
}

function findUserByName(name) 
{
    return userModel.find({ name: name });
}

function findUserByJob(job) 
{
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) 
{
    return userModel.find({ name, job });
}

function deleteUserById(id) 
{
    return userModel.findByIdAndDelete(id);
}

export default 
{
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob,
    deleteUserById,
};
