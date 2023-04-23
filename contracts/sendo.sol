// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract sendo {
  event Transfer(address indexed from, address indexed to, uint256 amount);

    function sendCrypto(address payable _to) external payable {
        require(msg.value > 0, "Must send some cryptocurrency");
        _to.transfer(msg.value);
        emit Transfer(msg.sender, _to, msg.value);
    }
}
