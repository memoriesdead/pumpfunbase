/**
 * Type declarations for Phantom Wallet
 */

interface PhantomWalletEvents {
  accountChanged: (publicKey: PublicKey | null) => void
  disconnect: () => void
}

interface PhantomWallet {
  isPhantom: boolean
  publicKey: PublicKey | null
  isConnected: boolean
  
  connect(opts?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }>
  disconnect(): Promise<void>
  signTransaction(transaction: Transaction): Promise<Transaction>
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
  signMessage(message: Uint8Array | string, display?: 'utf8' | 'hex'): Promise<any>
  
  on<T extends keyof PhantomWalletEvents>(
    event: T,
    handler: PhantomWalletEvents[T]
  ): void
  
  off<T extends keyof PhantomWalletEvents>(
    event: T,
    handler: PhantomWalletEvents[T]
  ): void
}

interface Window {
  solana?: PhantomWallet
}

// Re-export Solana types that might be needed
declare module '@solana/web3.js' {
  export class PublicKey {
    constructor(value: string | Buffer | Uint8Array | Array<number>)
    toString(): string
    toBase58(): string
    equals(pubkey: PublicKey): boolean
  }

  export class Transaction {
    signatures: Array<{
      publicKey: PublicKey
      signature: Buffer | null
    }>
    feePayer?: PublicKey
    recentBlockhash?: string
  }

  export class Connection {
    constructor(endpoint: string, commitment?: string)
    getBalance(publicKey: PublicKey): Promise<number>
    getAccountInfo(publicKey: PublicKey): Promise<any>
    sendTransaction(transaction: Transaction, signers: any[]): Promise<string>
  }
}