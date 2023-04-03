import Card1 from '../components/Card1/proposalCard'
import Header from '../components/Header'
import { Contract, providers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Web3Modal from 'web3modal'
import {
  CRYPTODEVS_DAO_ABI,
  CRYPTODEVS_DAO_CONTRACT_ADDRESS,
  CRYPTODEVS_NFT_ABI,
  CRYPTODEVS_NFT_CONTRACT_ADDRESS
} from '../constants'
// ProposalCard
import ProposalCard from '../components/Card1/proposalCard'
import styles from '../components/Card1/Card1.module.css'
// import styles from './Card1/Card1.module.css'
// import ProposalCard from './Card1/ProposalCard'

function ViewProposals () {
  const [treasuryBalance, setTreasuryBalance] = useState('0')
  const [numProposals, setNumProposals] = useState('0')
  const [proposals, setProposals] = useState([])
  const [nftBalance, setNftBalance] = useState(0)
  const [fakeNftTokenId, setFakeNftTokenId] = useState('')
  const [selectedTab, setSelectedTab] = useState('')
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const web3ModalRef = useRef()

  const connectWallet = async () => {
    try {
      await getProviderOrSigner()
      setWalletConnected(true)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * getOwner: gets the contract owner by connected address
   */
  const getDAOOwner = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const contract = getDaoContractInstance(signer)

      const _owner = await contract.owner()
      const address = await signer.getAddress()
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const getDAOTreasuryBalance = async () => {
    try {
      const provider = await getProviderOrSigner()
      const balance = await provider.getBalance(CRYPTODEVS_DAO_CONTRACT_ADDRESS)
      setTreasuryBalance(balance.toString())
    } catch (error) {
      console.error(error)
    }
  }

  const getNumProposalsInDAO = async () => {
    try {
      const provider = await getProviderOrSigner()
      const contract = getDaoContractInstance(provider)
      const daoNumProposals = await contract.numProposals()
      setNumProposals(daoNumProposals.toString())
    } catch (error) {
      console.error(error)
    }
  }

  const getUserNFTBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const nftContract = getCryptodevsNFTContractInstance(signer)
      const balance = await nftContract.balanceOf(signer.getAddress())
      setNftBalance(parseInt(balance.toString()))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchProposalById = async id => {
    try {
      const provider = await getProviderOrSigner()
      const daoContract = getDaoContractInstance(provider)
      console.log('id', id)
      const proposal = await daoContract.proposals(id)
      console.log('proposal', proposal)
      const parsedProposal = {
        proposalId: id,
        nftTokenId: proposal.nftTokenId.toString(),
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        yayVotes: proposal.yayVotes.toString(),
        nayVotes: proposal.nayVotes.toString(),
        executed: proposal.executed
      }
      return parsedProposal
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllProposals = async () => {
    try {
      const proposals = []
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalById(i)
        proposals.push(proposal)
      }
      console.log('proposals', proposals)
      setProposals(proposals)
      return proposals
    } catch (error) {
      console.error(error)
    }
  }

  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = await getProviderOrSigner(true)
      const daoContract = getDaoContractInstance(signer)

      let vote = _vote === 'YAY' ? 0 : 1
      const txn = await daoContract.voteOnProposal(proposalId, vote)
      setLoading(true)
      await txn.wait()
      setLoading(false)
      await fetchAllProposals()
    } catch (error) {
      console.error(error)
      window.alert(error.reason)
    }
  }

  const executeProposal = async proposalId => {
    try {
      const signer = await getProviderOrSigner(true)
      const daoContract = getDaoContractInstance(signer)
      const txn = await daoContract.executeProposal(proposalId)
      setLoading(true)
      await txn.wait()
      setLoading(false)
      await fetchAllProposals()
      getDAOTreasuryBalance()
    } catch (error) {
      console.error(error)
      window.alert(error.reason)
    }
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect()
    const web3Provider = new providers.Web3Provider(provider)

    const { chainId } = await web3Provider.getNetwork()
    console.log('chainId', chainId)
    if (chainId !== 1337) {
      if (chainId !== 5) {
        window.alert('Please switch to the Goerli network!')
        throw new Error('Please switch to the Goerli network')
      }
    }

    if (needSigner) {
      const signer = web3Provider.getSigner()
      return signer
    }
    return web3Provider
  }

  const getDaoContractInstance = providerOrSigner => {
    return new Contract(
      CRYPTODEVS_DAO_CONTRACT_ADDRESS,
      CRYPTODEVS_DAO_ABI,
      providerOrSigner
    )
  }

  const getCryptodevsNFTContractInstance = providerOrSigner => {
    return new Contract(
      CRYPTODEVS_NFT_CONTRACT_ADDRESS,
      CRYPTODEVS_NFT_ABI,
      providerOrSigner
    )
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'goerli',
        providerOptions: {},
        disableInjectedProvider: false
      })

      connectWallet().then(() => {
        getDAOTreasuryBalance()
        getUserNFTBalance()
        getNumProposalsInDAO()
        getDAOOwner()
      })
    }
  }, [])

  useEffect(() => {
    fetchAllProposals()
  }, [])

  return (
    <>
      <div className={styles.img}>
        <Header />
        <h2 className={styles.h2} style={{ marginTop: '22px' }}>
          <b>View Proposals</b>
        </h2>
        <div className={styles.main}>
          <div className={styles.main1}>
            {/* <Card1 /> */}
            {proposals &&
              proposals.map((p, index) => {
                let details = {
                  proposalId: p.proposalId,
                  nftTokenId: p.nftTokenId,
                  deadline: p.deadline,
                  yayVotes: p.yayVotes,
                  nayVotes: p.nayVotes,
                  executed: p.executed
                }
                return (
                  <ProposalCard
                    details={details}
                    voteOnProposal={voteOnProposal}
                    executeProposal={executeProposal}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProposals
