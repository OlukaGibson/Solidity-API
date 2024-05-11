These instruction are to help run it locally
Install nodejs
cmd
npm install
npx hardhat run --network sepolia scripts/deploy.js

//this will be the sample json for data entry

{
    "id" : 1,
    "initialExamination" : "['doctorID' : 'doctorID_Value','patientID' : 'patientID_Value', 'organizationID_Value', 'patientComplaint' : 'patientComplaint_Value', 'heightandweight' : 'heightandweight_Value', 'bodyTemperature' : 'bodyTemperature_Value', 'respiratoryRate' : 'respiratoryRate_Value', 'bloodpressure' : 'bloodpressure_Value', 'pyhsicalInspection' : 'pyhsicalInspection_Value', 'palpationInspection' : 'palpationInspection_Value', 'auscultationInspection' : 'auscultationInspection_Value']",
    "diagnosis" : "diagnosis",
    "evidence" : "evidence",
    "treatment" : "treatment",
    "medication" : "medication",
    "comment" : "comment",
    "date" : 25
}
