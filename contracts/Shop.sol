//SPDX-License-Identifier: Unlicense
pragma solidity = 0.8.15;

contract Shop {
    mapping(address => uint256) private accountBalance;
    mapping(address => string) private accountName;
    address[] public account;

    function createAccount(address _address) public {
        require(!isAccount(_address));
        account.push(_address);
    }

    function isAccount(address _account) public view returns (bool) {
        for (uint256 i = 0; i < account.length; i++) {
            if (account[i] == _account) {
                return true;
            }
        }
        return false;
    }
    
    function transferTo(address _to, uint256 _amount) public {
        require(_amount > 0);
        require(accountBalance[msg.sender] >= _amount);
        accountBalance[msg.sender] -= _amount;
        accountBalance[_to] += _amount;
    }

    function balanceOf(address _account) public view returns (uint256) {
        return accountBalance[_account];
    }

}