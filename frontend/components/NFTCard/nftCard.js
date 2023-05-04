import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import styles from './card1.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal'
import {
    CRYPTODEVS_DAO_ABI,
    CRYPTODEVS_DAO_CONTRACT_ADDRESS,
    CRYPTODEVS_NFT_ABI,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS
} from '../../constants';
import { Contract, providers } from 'ethers'

function NFTCard({ details }) {

    const { id, name, price, description, nft_image } = details
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

    /**
     * withdrawCoins: withdraws ether by calling
     * the withdraw function in the contract
     */
    const withdrawDAOEther = async () => {
        try {
            const signer = await getProviderOrSigner(true)
            const contract = getDaoContractInstance(signer)

            const tx = await contract.withdrawEther()
            setLoading(true)
            await tx.wait()
            setLoading(false)
            getDAOTreasuryBalance()
        } catch (err) {
            console.error(err)
            window.alert(err.reason)
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

    const createProposal = async (fakeNftTokenId) => {
        try {
            const signer = await getProviderOrSigner(true)
            const daoContract = getDaoContractInstance(signer)
            const txn = await daoContract.createProposal(parseInt(fakeNftTokenId))
            setLoading(true)
            await txn.wait()
            await getNumProposalsInDAO()
            setLoading(false)
        } catch (error) {
            console.error(error)
            window.alert(error)
        }
    }

    const fetchProposalById = async id => {
        try {
            const provider = await getProviderOrSigner()
            const daoContract = getDaoContractInstance(provider)
            const proposal = await daoContract.proposals(id)
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
            setProposals(proposals)
            return proposals
        } catch (error) {
            console.error(error)
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
    }, [walletConnected])

    useEffect(() => {
        if (selectedTab === 'View Proposals') {
            fetchAllProposals()
        }
    }, [selectedTab])


    return (
        <>
            <Card className={styles.card1}>
                <Card.Header>
                    <b>NFT ID</b> : {id}
                </Card.Header>
                <Card.Body>
                    <Card.Img
                        variant='top'
                        className={styles.Image}
                        src={nft_image}
                    />
                    <ListGroup variant='flush'>
                        <ListGroup.Item>Name : {name}</ListGroup.Item>
                        <ListGroup.Item>Price : {price} ether</ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Text>{description}</Card.Text>
                        </ListGroup.Item>
                        <br></br>
                    </ListGroup>
                    {
                        loading ?
                            <div className={styles.description}>
                                Loading... Waiting for transaction...
                            </div>
                            :
                            <Button
                                style={{
                                    width: '100%',
                                    backgroundColor: '#578ab6',
                                    color: 'white',
                                    border: '1px solid white'
                                }}
                                variant='success'
                                onClick={() => { createProposal(id) }}
                            >
                                Create Proposal
                            </Button>

                    }
                </Card.Body>
            </Card>
        </>
    );
}

export default NFTCard;
