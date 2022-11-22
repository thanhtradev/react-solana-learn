import { useMemo } from 'react'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { AnchorProvider } from '@project-serum/anchor'
export const useAnchorProvider = () => {
    const wallet = useAnchorWallet()
    const { connection } = useConnection()
    const provider = useMemo(() => {
        if (!wallet) return null
        return new AnchorProvider(connection, wallet, { skipPreflight: true })
    }, [connection, wallet])
    return provider
}
