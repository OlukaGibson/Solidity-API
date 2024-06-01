// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract blochealth {
    struct HealthRecord {
        uint256 id;
        string initialExamination;
        string diagnosis;
        // string evidence;
        // string treatment;
        // string medication;
        // string comment;
        uint256 date ;
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

    function setHealthRecord (uint256 _id, string memory _initialExamination, string memory _diagnosis, uint256 _date) public onlyOwner {
        HealthRecord memory healthRecord = HealthRecord(_id, _initialExamination, _diagnosis, _date);
        healthRecords[_id] = healthRecord;
        healthRecordArray.push(HealthRecord(_id, _initialExamination, _diagnosis, _date));
    }

    function getHealthRecord (uint256 _id) public view returns (uint256, string memory, string memory, uint256) {
        require(healthRecords[_id].id !=0 , "Health Record is not available");
        HealthRecord memory healthRecord = healthRecords[_id];
        return (healthRecord.id, healthRecord.initialExamination, healthRecord.diagnosis, healthRecord.date);
    }

    function getAllHealthRecords() public view returns (HealthRecord[] memory){
        return healthRecordArray;
    }

    function updateHealthRecord(uint256 _id, string memory _initialExamination, string memory _diagnosis, uint256 _date) public onlyOwner {
        require(healthRecords[_id].id !=0 , "Health Record is not available");
        deleteHealthRecord(_id);
        healthRecords[_id] = HealthRecord(_id, _initialExamination, _diagnosis, _date);
        healthRecordArray.push(HealthRecord(_id, _initialExamination, _diagnosis, _date));
    }

    function deleteHealthRecord(uint256 _id) public onlyOwner {
        require(healthRecords[_id].id !=0 , "Health Record is not available");
        delete healthRecords[_id];
        for (uint i = 0; i < healthRecordArray.length; i++) {
            if (healthRecordArray[i].id == _id) {
                removeMe = healthRecordArray[i];
                healthRecordArray[i] = healthRecordArray[healthRecordArray.length-1];
                healthRecordArray[healthRecordArray.length - 1] = removeMe;
            }
        }
        healthRecordArray.pop();
    }

}