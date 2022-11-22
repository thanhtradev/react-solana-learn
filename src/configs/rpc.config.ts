import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  endpoint: string
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    endpoint: 'https://api.devnet.solana.com',
    // endpoint: 'https://rpc.ankr.com/solana_devnet',
  },

  /**
   * Testing configurations
   */
  test: {
    endpoint: 'https://api.testnet.solana.com',
  },

  /**
   * Production configurations
   */
  production: {
    endpoint: 'https://api.mainnet-beta.solana.com',
  },
}

/**
 * Module exports
 */
export default conf
