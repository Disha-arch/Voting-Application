const express = require('express');
const router = express.Router();
const Candidate = require('../model/candidate.js');
const User = require('../model/user.js');
const {jwtAuthMiddleware} = require('../jwt.js');

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user.role === 'admin';
    } catch (error) {
        console.log(error);
        return false;
    }
}

router.post('/' , jwtAuthMiddleware , async(req,res)=> {
    try {
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message: "User is not an admin"});
        }
        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log('data saved successfully');
        res.status(200).json({response : response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.put('/:candidateID' , jwtAuthMiddleware ,  async(req,res) => {
    try {
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message: "User is not an admin"});
        }

        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateID , updatedCandidateData , {new: true});

        if(!response){
            return res.status(404).json({message: "Candidate not found"});
        }

        console.log("candidate updated successfully");
        res.status(200).json({response});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.delete('/:candidateID' , jwtAuthMiddleware ,  async(req,res) => {
    try {
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message: "User is not an admin"});
        }

        const candidateID = req.params.candidateID;

        const response = await Candidate.findByIdAndDelete(candidateID);
        if(!response){
            return res.status(404).json({message: "Candidate not found"});
        }
        console.log("candidate deleted successfully");
        res.status(200).json({message: "Candidate deleted successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router;