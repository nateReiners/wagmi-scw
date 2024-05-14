'use client'

import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi'
import { Capabilities } from '@/components/Capabilities'
import { Transact } from '@/components/Transact'
import { SignMessage } from '@/components/SignMessage'
import { TypedSign } from '@/components/TypedSign'

const abi = [
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [{ name: "to", type: "address" }],
		name: "safeMint",
		outputs: [],
	},
] as const;

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  return (
    <>
      <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          <Capabilities />
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector, chainId })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      { account.address && 
      <div>
      <Transact/>
      <SignMessage/>
      <TypedSign/>
      </div>
      }
    </>
  )
}

export default App
