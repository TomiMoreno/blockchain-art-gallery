// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SketchPortal {
    uint256 numberOfSketches;
    uint256 seed;

    event NewSketch(address indexed from, uint256 timestamp, string sketch, string title);

    struct Sketch {
        address sketcher;
        string sketch;
        string title;
        uint256 timestamp;
    }

    Sketch[] sketches;

    mapping(address => uint256) public lastSketchSentAt;
    constructor() payable{
        console.log("I AM SMART CONTRACT. POG.");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function checkSketch(string memory _sketch) private pure returns (bool) {
        uint256 expectedLength = 16*16*7; // Make it uint256 so we can compare it to the length of the sketch.
        bytes memory s = bytes(_sketch);
        if(s.length != expectedLength){
            return false;
        }
        for(uint256 i = 0; i < s.length; i++){
            uint8 x = uint8(s[i]);
            if(x == 35){ // #
                continue;
            }
            if(x < 58 && x > 47){ // 0-9
                continue;
            }
            if(x < 71 && x > 64){ // A-F
                continue;
            }
            if(x < 103 && x > 96){ // a-f
                continue;
            }
            return false;
        }
        return true;
    }
    
    function sendSketch(string memory _sketch, string memory _title) public {
        if(!checkSketch(_sketch)){
            revert("Invalid sketch.");
        }
        require(
            lastSketchSentAt[msg.sender] + 1 minutes < block.timestamp,
            "Wait 1m"
        );
        lastSketchSentAt[msg.sender] = block.timestamp;
        numberOfSketches += 1;
        console.log("%s sent a sketch!", msg.sender);

        sketches.push(Sketch(msg.sender, _sketch, _title, block.timestamp));

        seed = (block.timestamp + block.difficulty) % 100;

        console.log('Random # generated: %d', seed);

        if(seed < 50){
        uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewSketch(msg.sender, block.timestamp, _sketch, _title);
    }

    function getAllSketches() public view returns (Sketch[] memory) {
        return sketches;
    }

    function getNumberOfSketches() public view returns (uint256) {
        console.log("We have %d total sketches!", numberOfSketches);
        return numberOfSketches;
    }
}