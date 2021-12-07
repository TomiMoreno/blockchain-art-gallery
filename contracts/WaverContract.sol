// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping (address => uint8) userWaves;

    constructor() {
        console.log("Hello! *Waves*");
    }

    function wave() public {
        totalWaves += 1;
        if (userWaves[msg.sender] == 0) {
            userWaves[msg.sender] = 1;
        } else {
            userWaves[msg.sender] += 1;
        }
        console.log("%s has waved %i times", msg.sender, userWaves[msg.sender]);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
