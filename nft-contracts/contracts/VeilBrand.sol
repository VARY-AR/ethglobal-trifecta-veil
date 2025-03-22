// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// '##::::'##:'########:'####:'##:::::::
//  ##:::: ##: ##.....::. ##:: ##:::::::
//  ##:::: ##: ##:::::::: ##:: ##:::::::
//  ##:::: ##: ######:::: ##:: ##:::::::
// . ##:: ##:: ##...::::: ##:: ##:::::::
// :. ## ##::: ##:::::::: ##:: ##:::::::
// ::. ###:::: ########:'####: ########:
// :::...:::::........::....::........::

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VeilBrand is ERC1155, Ownable {
    // Mapping of authorized minters
    mapping(address => bool) private _minters;

    // Contract name
    string private _name;

    // Token details structure
    struct TokenInfo {
        string tokenName;
        string tokenURI;
        uint256 supplyLimit;
        uint256 currentSupply;
    }

    // Mapping from token ID to token information
    mapping(uint256 => TokenInfo) private _tokenInfo;

    constructor(string memory name_) ERC1155("") Ownable(msg.sender) {
        _name = name_;
        // Make the deployer a minter by default
        _minters[msg.sender] = true;
    }

    /**
     * @dev Returns the name of the contract
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Modifier to check if the caller is a minter
     */
    modifier onlyMinter() {
        require(_minters[_msgSender()], "Caller is not a minter");
        _;
    }

    /**
     * @dev Modifier to check if the token exists
     */
    modifier tokenExists(uint256 id) {
        require(bytes(_tokenInfo[id].tokenName).length > 0, "Token does not exist");
        _;
    }

    /**
     * @dev Adds an address to the list of authorized minters
     * @param minter Address to add as a minter
     */
    function addMinter(address minter) public onlyOwner {
        require(minter != address(0), "Cannot add zero address as minter");
        _minters[minter] = true;
    }

    /**
     * @dev Removes an address from the list of authorized minters
     * @param minter Address to remove from minters
     */
    function removeMinter(address minter) public onlyOwner {
        _minters[minter] = false;
    }

    /**
     * @dev Checks if an address is an authorized minter
     * @param account Address to check
     * @return bool True if address is a minter
     */
    function isMinter(address account) public view returns (bool) {
        return _minters[account];
    }

    /**
     * @dev Override uri function to return token-specific URI
     */
    function uri(uint256 id) public view override returns (string memory) {
        require(bytes(_tokenInfo[id].tokenName).length > 0, "URI query for nonexistent token");
        return _tokenInfo[id].tokenURI;
    }

    /**
     * @dev Creates a new token type with specified properties
     * @param id The token ID to create
     * @param tokenName The name of the token
     * @param supplyLimit The maximum supply allowed for this token
     * @param tokenURI The URI for this token's metadata
     */
    function createToken(
        uint256 id,
        string memory tokenName,
        uint256 supplyLimit,
        string memory tokenURI
    ) public onlyOwner {
        require(bytes(_tokenInfo[id].tokenName).length == 0, "Token already exists");
        require(bytes(tokenName).length > 0, "tokenName cannot be empty");
        require(supplyLimit > 0, "Supply limit must be greater than zero");

        _tokenInfo[id] = TokenInfo({
            tokenName: tokenName,
            tokenURI: tokenURI,
            supplyLimit: supplyLimit,
            currentSupply: 0
        });
    }

    /**
     * @dev Gets information about a token
     * @param id The token ID to query
     * @return tokenName The token name
     * @return tokenURI The token URI
     * @return supplyLimit The maximum supply of the token
     * @return currentSupply The current supply of the token
     */
    function getTokenInfo(uint256 id) public view tokenExists(id) returns (
        string memory tokenName,
        string memory tokenURI,
        uint256 supplyLimit,
        uint256 currentSupply
    ) {
        TokenInfo memory info = _tokenInfo[id];
        return (info.tokenName, info.tokenURI, info.supplyLimit, info.currentSupply);
    }

    /**
     * @dev Mints a new token or additional supply of an existing token.
     * @param to The address to mint tokens to.
     * @param id The token ID to mint.
     * @param amount Amount of the token to mint.
     * @param data Additional data with no specified format.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyMinter tokenExists(id) {
        require(_tokenInfo[id].currentSupply + amount <= _tokenInfo[id].supplyLimit, "Exceeds token supply limit");
        _mint(to, id, amount, data);
        _tokenInfo[id].currentSupply += amount;
    }

    /**
     * @dev Sets the URI for a token ID
     * @param id The token ID to update
     * @param tokenURI New URI for the token
     */
    function setTokenURI(uint256 id, string memory tokenURI) public onlyOwner tokenExists(id) {
        _tokenInfo[id].tokenURI = tokenURI;
    }
}
