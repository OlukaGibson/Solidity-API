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

app.get('/getrecord/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const record = await contractInstance.getHealthRecord(id);
        const rec = {
            id: parseInt(record[0]),
            initialExamination: record[1],
            diagnosis: record[2],
            evidence: record[3],
            treatment: record[4],
            medication: record[5],
            comment: record[6],
            date: parseInt(record[7])
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
            id : parseInt(record[0]),
            initialExamination : record[1],
            diagnosis : record[2],
            evidence : record[3],
            treatment : record[4],
            medication : record[5],
            comment : record[6],
            date : parseInt(record[7])
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
        const {id, initialExamination, diagnosis, evidence, treatment, medication, comment, date} = req.body
        const tx = await contractInstance.setHealthRecord(id, initialExamination, diagnosis, evidence, treatment, medication, comment, date)
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
        const {initialExamination, diagnosis, evidence, treatment, medication, comment, date} = req.body
        const tx = await contractInstance.updateHealthRecord(id, initialExamination, diagnosis, evidence, treatment, medication, comment, date)
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

app.listen(3000, () => {
    console.log('Server running on port 3000')
});