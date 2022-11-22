import { useAnchorProvider } from './useAnchorProvider';
import { useMemo } from 'react'
import { Spl } from '@project-serum/anchor'
export const useAnchorSplAta = () => {
    const provider = useAnchorProvider()
    const splAta = useMemo(() => {
        if (!provider) return null
        return Spl.associatedToken(provider)
    }, [provider])

    return splAta
}
