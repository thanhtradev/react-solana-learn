import { useAnchorProvider } from './useAnchorProvider';
import { useMemo } from 'react'
import { Spl } from '@project-serum/anchor'
export const useAnchorSplt = () => {
    const provider = useAnchorProvider()
    const splt = useMemo(() => {
        if (!provider) return null
        return Spl.token(provider)
    }, [provider])
    return splt
}
