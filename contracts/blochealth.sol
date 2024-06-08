// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract blochealth {
    struct HealthRecord {
        string code;
        string diagnosis;
        string examination;
        string organizationId;
        string patientId;
        uint256 creationTime;
        string id;
    }

    address owner;

    HealthRecord public removeMe;

    mapping (uint256 => HealthRecord) public healthRecords;
    HealthRecord[] public healthRecordArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function setHealthRecord (string memory _code, string memory _diagnosis, string memory _examination, string memory _organizationId, string memory _patientId, uint256 _creationTime, string memory _id) public onlyOwner {
        HealthRecord memory healthRecord = HealthRecord(_code, _diagnosis, _examination, _organizationId, _patientId, _creationTime, _id);
        healthRecords[_creationTime] = healthRecord;
        healthRecordArray.push(HealthRecord(_code, _diagnosis, _examination, _organizationId, _patientId, _creationTime, _id));
    }

    function getHealthRecord(string memory id) public view returns (string memory, string memory, string memory, string memory,string memory, uint256, string memory){
        for (uint i = 0; i<healthRecordArray.length; i++){
            if (keccak256(abi.encodePacked(healthRecordArray[i].id)) == keccak256(abi.encodePacked(id))){
                return (healthRecordArray[i].code, healthRecordArray[i].diagnosis, healthRecordArray[i].examination, healthRecordArray[i].organizationId, healthRecordArray[i].patientId, healthRecordArray[i].creationTime, healthRecordArray[i].id);
            }
        }
        revert("Health Record not found");
    }

    function getAllHealthRecords() public view returns (HealthRecord[] memory){
        return healthRecordArray;
    }

    function updateHealthRecord(string memory _code, string memory _diagnosis, string memory _examination, string memory _organizationId, string memory _patientId, uint256 _creationTime, string memory _id) public onlyOwner {
        for (uint i = 0; i<healthRecordArray.length; i++){
            if (keccak256(abi.encodePacked(healthRecordArray[i].id)) == keccak256(abi.encodePacked(_id))){
                healthRecordArray[i].code = _code;
                healthRecordArray[i].diagnosis = _diagnosis;
                healthRecordArray[i].examination = _examination;
                healthRecordArray[i].organizationId = _organizationId;
                healthRecordArray[i].patientId = _patientId;
                healthRecordArray[i].creationTime = _creationTime;
                healthRecordArray[i].id = _id;
            }
        }
        revert("Health Record not found");
    }

    function deleteHealthRecord(string memory _id) public onlyOwner {
        for (uint i = 0; i<healthRecordArray.length; i++){
            if (keccak256(abi.encodePacked(healthRecordArray[i].id)) == keccak256(abi.encodePacked(_id))){
                removeMe = healthRecordArray[i];
                healthRecordArray[i] = healthRecordArray[healthRecordArray.length-1];
                healthRecordArray[healthRecordArray.length - 1] = removeMe;
                healthRecordArray.pop();
            }
        }
        revert("Health Record not found");
    }

}


