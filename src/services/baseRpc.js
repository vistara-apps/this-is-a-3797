import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

// Create a public client for Base
const baseClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org'),
});

/**
 * Get the current Base block number
 * @returns {Promise<bigint>} - Current block number
 */
export const getCurrentBlockNumber = async () => {
  try {
    return await baseClient.getBlockNumber();
  } catch (error) {
    console.error('Base RPC error:', error);
    throw new Error('Failed to get current block number. Please try again later.');
  }
};

/**
 * Get a Base block by number
 * @param {bigint|number} blockNumber - Block number
 * @returns {Promise<Object>} - Block data
 */
export const getBlock = async (blockNumber) => {
  try {
    return await baseClient.getBlock({
      blockNumber: BigInt(blockNumber),
    });
  } catch (error) {
    console.error('Base RPC error:', error);
    throw new Error('Failed to get block data. Please try again later.');
  }
};

/**
 * Get a transaction by hash
 * @param {string} hash - Transaction hash
 * @returns {Promise<Object>} - Transaction data
 */
export const getTransaction = async (hash) => {
  try {
    return await baseClient.getTransaction({
      hash,
    });
  } catch (error) {
    console.error('Base RPC error:', error);
    throw new Error('Failed to get transaction data. Please try again later.');
  }
};

/**
 * Get the balance of an address
 * @param {string} address - Ethereum address
 * @returns {Promise<bigint>} - Balance in wei
 */
export const getBalance = async (address) => {
  try {
    return await baseClient.getBalance({
      address,
    });
  } catch (error) {
    console.error('Base RPC error:', error);
    throw new Error('Failed to get balance. Please try again later.');
  }
};

/**
 * Verify if an address is a contract
 * @param {string} address - Ethereum address
 * @returns {Promise<boolean>} - Whether the address is a contract
 */
export const isContract = async (address) => {
  try {
    const code = await baseClient.getBytecode({
      address,
    });
    
    return code !== '0x';
  } catch (error) {
    console.error('Base RPC error:', error);
    throw new Error('Failed to verify contract. Please try again later.');
  }
};
