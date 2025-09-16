// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract StudentVoting is SepoliaConfig {
    using FHE for *;
    
    struct Election {
        euint32 electionId;
        euint32 totalVotes;
        euint32 candidateCount;
        bool isActive;
        bool isVerified;
        string title;
        string description;
        address organizer;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Candidate {
        euint32 candidateId;
        euint32 voteCount;
        string name;
        string position;
        bool isActive;
    }
    
    struct Vote {
        euint32 voteId;
        euint32 electionId;
        euint32 candidateId;
        address voter;
        uint256 timestamp;
        bool isEncrypted;
    }
    
    struct Student {
        euint32 studentId;
        euint32 reputation;
        bool isVerified;
        bool hasVoted;
        string university;
        string studentIdHash;
    }
    
    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(uint256 => Candidate)) public candidates; // electionId => candidateId => Candidate
    mapping(uint256 => Vote) public votes;
    mapping(address => Student) public students;
    mapping(address => euint32) public voterReputation;
    mapping(address => euint32) public organizerReputation;
    
    uint256 public electionCounter;
    uint256 public voteCounter;
    uint256 public candidateCounter;
    
    address public owner;
    address public verifier;
    
    event ElectionCreated(uint256 indexed electionId, address indexed organizer, string title);
    event CandidateAdded(uint256 indexed electionId, uint256 indexed candidateId, string name);
    event VoteCast(uint256 indexed voteId, uint256 indexed electionId, address indexed voter);
    event ElectionVerified(uint256 indexed electionId, bool isVerified);
    event StudentRegistered(address indexed student, string university);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createElection(
        string memory _title,
        string memory _description,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Election title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(students[msg.sender].isVerified, "Only verified students can create elections");
        
        uint256 electionId = electionCounter++;
        
        elections[electionId] = Election({
            electionId: FHE.asEuint32(0), // Will be set properly later
            totalVotes: FHE.asEuint32(0),
            candidateCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            title: _title,
            description: _description,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit ElectionCreated(electionId, msg.sender, _title);
        return electionId;
    }
    
    function addCandidate(
        uint256 electionId,
        string memory _name,
        string memory _position
    ) public returns (uint256) {
        require(elections[electionId].organizer == msg.sender, "Only organizer can add candidates");
        require(elections[electionId].isActive, "Election must be active");
        require(block.timestamp < elections[electionId].endTime, "Election has ended");
        
        uint256 candidateId = candidateCounter++;
        
        candidates[electionId][candidateId] = Candidate({
            candidateId: FHE.asEuint32(0), // Will be set properly later
            voteCount: FHE.asEuint32(0),
            name: _name,
            position: _position,
            isActive: true
        });
        
        // Increment candidate count
        elections[electionId].candidateCount = FHE.add(elections[electionId].candidateCount, FHE.asEuint32(1));
        
        emit CandidateAdded(electionId, candidateId, _name);
        return candidateId;
    }
    
    function castVote(
        uint256 electionId,
        uint256 candidateId,
        externalEuint32 encryptedVote,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(elections[electionId].organizer != address(0), "Election does not exist");
        require(elections[electionId].isActive, "Election is not active");
        require(block.timestamp <= elections[electionId].endTime, "Election has ended");
        require(students[msg.sender].isVerified, "Only verified students can vote");
        require(!students[msg.sender].hasVoted, "Student has already voted");
        require(candidates[electionId][candidateId].isActive, "Candidate is not active");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVote = FHE.fromExternal(encryptedVote, inputProof);
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            electionId: FHE.asEuint32(electionId),
            candidateId: FHE.asEuint32(candidateId),
            voter: msg.sender,
            timestamp: block.timestamp,
            isEncrypted: true
        });
        
        // Update candidate vote count
        candidates[electionId][candidateId].voteCount = FHE.add(candidates[electionId][candidateId].voteCount, internalVote);
        
        // Update election total votes
        elections[electionId].totalVotes = FHE.add(elections[electionId].totalVotes, internalVote);
        
        // Mark student as having voted
        students[msg.sender].hasVoted = true;
        
        emit VoteCast(voteId, electionId, msg.sender);
        return voteId;
    }
    
    function registerStudent(
        string memory _university,
        string memory _studentIdHash
    ) public {
        require(!students[msg.sender].isVerified, "Student already registered");
        require(bytes(_university).length > 0, "University cannot be empty");
        require(bytes(_studentIdHash).length > 0, "Student ID hash cannot be empty");
        
        students[msg.sender] = Student({
            studentId: FHE.asEuint32(0), // Will be set properly later
            reputation: FHE.asEuint32(100), // Initial reputation
            isVerified: false, // Needs verification
            hasVoted: false,
            university: _university,
            studentIdHash: _studentIdHash
        });
        
        emit StudentRegistered(msg.sender, _university);
    }
    
    function verifyStudent(address student, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify students");
        require(students[student].university != "", "Student not registered");
        
        students[student].isVerified = isVerified;
    }
    
    function verifyElection(uint256 electionId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify elections");
        require(elections[electionId].organizer != address(0), "Election does not exist");
        
        elections[electionId].isVerified = isVerified;
        emit ElectionVerified(electionId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is voter or organizer based on context
        if (students[user].university != "") {
            voterReputation[user] = reputation;
        } else {
            organizerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getElectionInfo(uint256 electionId) public view returns (
        string memory title,
        string memory description,
        uint8 totalVotes,
        uint8 candidateCount,
        bool isActive,
        bool isVerified,
        address organizer,
        uint256 startTime,
        uint256 endTime
    ) {
        Election storage election = elections[electionId];
        return (
            election.title,
            election.description,
            0, // FHE.decrypt(election.totalVotes) - will be decrypted off-chain
            0, // FHE.decrypt(election.candidateCount) - will be decrypted off-chain
            election.isActive,
            election.isVerified,
            election.organizer,
            election.startTime,
            election.endTime
        );
    }
    
    function getCandidateInfo(uint256 electionId, uint256 candidateId) public view returns (
        string memory name,
        string memory position,
        uint8 voteCount,
        bool isActive
    ) {
        Candidate storage candidate = candidates[electionId][candidateId];
        return (
            candidate.name,
            candidate.position,
            0, // FHE.decrypt(candidate.voteCount) - will be decrypted off-chain
            candidate.isActive
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 electionId,
        uint8 candidateId,
        address voter,
        uint256 timestamp,
        bool isEncrypted
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.electionId) - will be decrypted off-chain
            0, // FHE.decrypt(vote.candidateId) - will be decrypted off-chain
            vote.voter,
            vote.timestamp,
            vote.isEncrypted
        );
    }
    
    function getStudentInfo(address student) public view returns (
        uint8 reputation,
        bool isVerified,
        bool hasVoted,
        string memory university,
        string memory studentIdHash
    ) {
        Student storage studentInfo = students[student];
        return (
            0, // FHE.decrypt(studentInfo.reputation) - will be decrypted off-chain
            studentInfo.isVerified,
            studentInfo.hasVoted,
            studentInfo.university,
            studentInfo.studentIdHash
        );
    }
    
    function getVoterReputation(address voter) public view returns (uint8) {
        return 0; // FHE.decrypt(voterReputation[voter]) - will be decrypted off-chain
    }
    
    function getOrganizerReputation(address organizer) public view returns (uint8) {
        return 0; // FHE.decrypt(organizerReputation[organizer]) - will be decrypted off-chain
    }
    
    function endElection(uint256 electionId) public {
        require(elections[electionId].organizer == msg.sender, "Only organizer can end election");
        require(elections[electionId].isActive, "Election is not active");
        require(block.timestamp > elections[electionId].endTime, "Election has not ended yet");
        
        elections[electionId].isActive = false;
    }
    
    function resetStudentVoteStatus(address student) public {
        require(msg.sender == verifier, "Only verifier can reset vote status");
        require(students[student].university != "", "Student not registered");
        
        students[student].hasVoted = false;
    }
}
