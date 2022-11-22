import { Button, Col, Row, Typography } from 'antd'
import { useAnchorSplt } from 'hooks/useAnchorSplt'
import React, { useState } from 'react'
import { web3, utils } from '@project-serum/anchor'
import { Token } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { useAnchorProvider } from 'hooks/useAnchorProvider'
const CreateMintAccount = () => {
  const [loading, setLoading] = useState(false)
  const [mintAddress, setMintAddress] = useState('')
  const splt = useAnchorSplt()
  const provider = useAnchorProvider()
  const { connection } = useConnection()

  const onCreateMint = async () => {
    try {
      if (!splt || !provider) throw new Error('Invalid anchor program')
      setLoading(true)
      const newMint = web3.Keypair.generate()
      const lamports = await Token.getMinBalanceRentForExemptMint(connection)

      //Create rent instruction
      const rentInstruction = web3.SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: newMint.publicKey,
        space: splt.account.mint.size,
        lamports,
        programId: utils.token.TOKEN_PROGRAM_ID,
      })
      const initMintInstruction = await splt.methods
        .initializeMint(9, provider.publicKey, provider.publicKey)
        .accounts({ mint: newMint.publicKey, rent: web3.SYSVAR_RENT_PUBKEY })
        .instruction()

      const transaction = new web3.Transaction().add(
        rentInstruction,
        initMintInstruction,
      )
      await provider.sendAndConfirm(transaction, [newMint])
      return setMintAddress(newMint.publicKey.toBase58())
    } catch (error) {
      alert(error)
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row>
      <Col>
        <Button type="primary" onClick={() => onCreateMint()} loading={loading}>
          Create Mint
        </Button>
      </Col>
      <Col flex={'auto'}>
        <Typography.Text>{mintAddress}</Typography.Text>
      </Col>
    </Row>
  )
}

export default CreateMintAccount
