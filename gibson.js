// // Input JSON
// const inputJSON = {
//   "code": "HR005",
//   "diagnosis": {
//     "comment": "sample",
//     "diagnosis": "sample",
//     "evidence": "kg24mecqnr3rdj3nsfyrkdg1jn6tdgjr",
//     "healthRecordId": "js74rq72saf8g057t2m09tzmms6t5xb0",
//     "medication": "sample",
//     "staffId": "j97cxf3j8tew2h30v4txmw83bn6szjdq",
//     "staffName": "Ziggy Inhos",
//     "treatment": "sample",
//     "_creationTime": 1717467574707.0503,
//     "_id": "k17f3erdt3c5wbv9ekjzxcg14s6tcr71"
//   },
//   "examination": {
//     "abdominalAuscaltation": "Reduced sounds",
//     "auscaltationComments": "none",
//     "bloodPressure": "189/54",
//     "bodyTemperature": 238,
//     "heartAuscaltation": "Murmurs",
//     "height": 299,
//     "lungAuscaltation": "Crackles",
//     "organizationId": "org_2h670gdMkQcNrPdTalkmEwQrj8Q",
//     "palpationInspection": "none",
//     "patientComplaint": "none",
//     "patientId": "jn7cjhrdntm1sv2x9g1dddx0tx6snx5w",
//     "performedTests": ["Blood test", "Urine test"],
//     "physicalInspection": "none",
//     "respiratoryRate": 3288,
//     "staffId": "j97cxf3j8tew2h30v4txmw83bn6szjdq",
//     "staffName": "Ziggy Inhos",
//     "weight": 388,
//     "_creationTime": 1717170792900.4426,
//     "_id": "k570bq7hj5ff1tna5zkqv6vq956t429p"
//   },
//   "organizationId": "org_2h670gdMkQcNrPdTalkmEwQrj8Q",
//   "patientId": "jn7cjhrdntm1sv2x9g1dddx0tx6snx5w",
//   "_creationTime": 1717170792900.4429,
//   "_id": "js74rq72saf8g057t2m09tzmms6t5xb0"
// };

// // Function to transform the JSON
// function transformJSON(input) {
//   // Extract the code and convert it to id
//   const code = input.code;
//   const numStr = code.replace(/\D/g, '');
//   const id = parseInt(numStr, 10);

//   // Combine necessary fields into diagnosis
//   const diagnosis = {
//     ...input.diagnosis,
//     code: input.code,
//     organizationId: input.organizationId,
//     patientId: input.patientId,
//     _id: input._id
//   };

//   // Convert diagnosis and initialExamination to JSON strings
//   const diagnosisStr = JSON.stringify(diagnosis);
//   const initialExaminationStr = JSON.stringify(input.examination);

//   // Construct the final JSON object
//   const result = {
//     id: id,
//     diagnosis: diagnosisStr,
//     initialExamination: initialExaminationStr,
//     date: input._creationTime
//   };

//   return result;
// }

// // Transform the input JSON
// const transformedJSON = transformJSON(inputJSON);

// // Output the result
// console.log(JSON.stringify(transformedJSON, null, 2));


// // Transformed JSON
// const myJSON = {
//   "id": 5,
//   "diagnosis": "{\"comment\":\"sample\",\"diagnosis\":\"sample\",\"evidence\":\"kg24mecqnr3rdj3nsfyrkdg1jn6tdgjr\",\"healthRecordId\":\"js74rq72saf8g057t2m09tzmms6t5xb0\",\"medication\":\"sample\",\"staffId\":\"j97cxf3j8tew2h30v4txmw83bn6szjdq\",\"staffName\":\"Ziggy Inhos\",\"treatment\":\"sample\",\"_creationTime\":1717467574707.0503,\"_id\":\"k17f3erdt3c5wbv9ekjzxcg14s6tcr71\",\"code\":\"HR005\",\"organizationId\":\"org_2h670gdMkQcNrPdTalkmEwQrj8Q\",\"patientId\":\"jn7cjhrdntm1sv2x9g1dddx0tx6snx5w\",\"_id\":\"js74rq72saf8g057t2m09tzmms6t5xb0\"}",
//   "initialExamination": "{\"abdominalAuscaltation\":\"Reduced sounds\",\"auscaltationComments\":\"none\",\"bloodPressure\":\"189/54\",\"bodyTemperature\":238,\"heartAuscaltation\":\"Murmurs\",\"height\":299,\"lungAuscaltation\":\"Crackles\",\"organizationId\":\"org_2h670gdMkQcNrPdTalkmEwQrj8Q\",\"palpationInspection\":\"none\",\"patientComplaint\":\"none\",\"patientId\":\"jn7cjhrdntm1sv2x9g1dddx0tx6snx5w\",\"performedTests\":[\"Blood test\",\"Urine test\"],\"physicalInspection\":\"none\",\"respiratoryRate\":3288,\"staffId\":\"j97cxf3j8tew2h30v4txmw83bn6szjdq\",\"staffName\":\"Ziggy Inhos\",\"weight\":388,\"_creationTime\":1717170792900.4426,\"_id\":\"k570bq7hj5ff1tna5zkqv6vq956t429p\"}",
//   "date": 1717170792900.4429
// };

// // Function to convert back to the original JSON structure
// function revertJSON(transformed) {
//   // Parse the diagnosis and initialExamination strings
//   const diagnosis = JSON.parse(transformed.diagnosis);
//   const initialExamination = JSON.parse(transformed.initialExamination);

//   // Extract common fields from diagnosis
//   const { code, organizationId, patientId, _id } = diagnosis;

//   // Construct the original JSON object
//   const original = {
//     code: code,
//     diagnosis: diagnosis,
//     examination: initialExamination,
//     organizationId: organizationId,
//     patientId: patientId,
//     _creationTime: transformed.date,
//     _id: _id
//   };

//   return original;
// }

// // Convert the transformed JSON back to the original structure
// const originalJSON = revertJSON(transformedJSON);

// // Output the result
// console.log(JSON.stringify(originalJSON, null, 2));

// const ethers = require('ethers');
// const value = "1717170792900443000";
// const bigNumberValue = ethers.BigNumber.from(value);


a = Math.round(1717170792900.4429)

console.log(a)