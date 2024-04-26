const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const contractAddress = process.env.CONTRACT_ADDRESS

const provider = new ethers.providers.JsonRpcProvider(API_URL)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const {abi} = require("./artifacts/contracts/blochealth.sol/blochealth.json")
const contractInstance = new ethers.Contract(contractAddress, abi, signer)

const express = require('express')
const app = express()
app.use(express.json())

// app.get('/getrecord/:id', async(req, res) => {  //http://localhost:3000/getrecord/1
//     try {
//         const id = req.params.id
//         const record = await contractInstance.getHealthRecord(id)
//         let rec = []
//         rec[0] = record[0]
//         rec[1] = record[1]
//         rec[2] = record[2]
//         rec[3] = record[3]
//         rec[4] = record[4]
//         rec[5] = parseInt(record[5])
//         res.send(rec)
//     }
//     catch (error) {
//         res.status(500).send(error.message)
//     }
// });

app.get('/getrecord/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const record = await contractInstance.getHealthRecord(id);
        const rec = {
            doctorID: record[0],
            patientID: record[1],
            patientID: record[2],
            description: record[3],
            evidence: record[4],
            date: parseInt(record[5])
        };
        res.send(rec);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/getallrecords/', async(req, res) => {  //http://localhost:3000/getallrecords/
    try {
        const allRecords = await contractInstance.getAllHealthRecords()
        const records = allRecords.map(record => ({
            id : parseInt(record.id),
            doctorID : record.doctorID,
            patientID : record.patientID,
            description : record.description,
            prescription : record.prescription,
            evidence : record.evidence,
            date : parseInt(record.date)
        }))
        console.log(records)
        res.send(records);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/createrecord', async(req, res) => { //http://localhost:3000/createrecord/
    try {
        const {id, doctorID, patientID, description, prescription, evidence, date} = req.body
        const tx = await contractInstance.setHealthRecord(id, doctorID, patientID, description, prescription, evidence, date)
        await tx.wait()
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message)
    }
});

app.put('/updaterecord/:id', async (req, res) => {  //http://localhost:3000/updaterecord/1
    try {
        const id = req.params.id
        const {doctorID, patientID, description, prescription, evidence, date} = req.body
        const tx = await contractInstance.updateHealthRecord(id, doctorID, patientID, description, prescription, evidence, date)
        await tx.wait()
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message)
    }
});

app.delete('/deleterecord/:id', async (req, res) => {  //http://localhost:3000/deleterecord/1
    try {
        const id = req.params.id
        const tx = await contractInstance.deleteHealthRecord(id)
        await tx.wait()
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message)
    }
});

app.listen(10000, () => {
    console.log('Server running on port 3000')
});