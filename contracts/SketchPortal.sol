// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SketchPortal {
    uint256 totalSketches;

    event NewSketch(address indexed from, uint256 timestamp, string sketch);

    struct Sketch {
        address sketcher; 
        string sketch; 
        uint256 timestamp; 
    }

    Sketch[] sketches;

    constructor() {
        console.log("I AM SMART CONTRACT. POG.");
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
    
    function sendSketch(string memory _sketch) public {
        if(!checkSketch(_sketch)){
            revert("Invalid sketch.");
        }
        totalSketches += 1;
        console.log("%s sent a sketch!", msg.sender);

        sketches.push(Sketch(msg.sender, _sketch, block.timestamp));

        emit NewSketch(msg.sender, block.timestamp, _sketch);
    }

    function getAllSketches() public view returns (Sketch[] memory) {
        return sketches;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total sketches!", totalSketches);
        return totalSketches;
    }
}