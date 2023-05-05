import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Web3Modal from 'web3modal';
import { useEffect, useRef, useState } from 'react';
import {
    CRYPTODEVS_DAO_ABI,
    CRYPTODEVS_DAO_CONTRACT_ADDRESS,
    CRYPTODEVS_NFT_ABI,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS
} from '../constants'
import { Contract, providers } from 'ethers'

function HistoryPage() {

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

    const [numProposals, setNumProposals] = useState('0')
    const [proposals, setProposals] = useState([])


    const [loading, setLoading] = useState(false)
    const [walletConnected, setWalletConnected] = useState(false)
    const web3ModalRef = useRef()
    const [myid, setMyid] = useState(0)
    let id1 = 0;

    const connectWallet = async () => {
        try {
            await getProviderOrSigner()
            setWalletConnected(true)
        } catch (error) {
            console.error(error)
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

    const getNumProposalsInDAO = async () => {
        try {
            const provider = await getProviderOrSigner()
            const contract = getDaoContractInstance(provider)
            const daoNumProposals = await contract.numProposals()
            setNumProposals(daoNumProposals.toString())
            console.log("xxxxxdaoNumProposals", numProposals)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchAllProposals = async () => {
        console.log('ii am ')
        try {
            const promises = []

            console.log('numProposals', numProposals);
            for (let i = 0; i < numProposals; i++) {
                console.log('dfghj');
                const promise = fetchProposalById(i);
                promises.push(promise);
            }
            const proposals = await Promise.all(promises);
            console.log('proposalssssss', proposals)
            setProposals(proposals)
            return proposals
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: 'goerli',
                providerOptions: {},
                disableInjectedProvider: false
            })

            connectWallet().then(async () => {
                console.log('Connected');
                getNumProposalsInDAO()
                // await fetchAllProposals()
                console.log('proposals', proposals)
            })
        }
    }, [])

    useEffect(() => {
        fetchAllProposals()

    }, [numProposals])

    // useEffect(() => {
    //     if (proposals.length < 0) {
    //         fetchAllProposals()
    //     }
    // })
    // }, [])

    console.log('Proposals', proposals);
    const filteredData = proposals.filter(item => item.executed === true && parseInt(item.yayVotes) > parseInt(item.nayVotes));
    console.log('filteredData', filteredData);

    return (
        <div className={`container ${styles.img5}`}>
            <Header />
            <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", color: 'rgb(129 2 2);' }}>Purchased NFTs</h2>
            {/* <div className={styles.div1}>
                <div className={styles.div2}>
                    <Table striped bordered hover className={`mt-4 ${styles.table}`}>
                        <thead>
                            <tr>
                                <th>NFT ID</th>
                                <th>Name</th>
                                <th>Yay Vote</th>
                                <th>Nay Vote</th>
                                <th>Price in ETH</th>
                                <th>Price in INR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>5</td>
                                <td>2</td>
                                <td>0.01 ETH</td>
                                <td>1574.63₹</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>9</td>
                                <td>5</td>
                                <td>0.02 ETH</td>
                                <td>3149.26₹</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>9</td>
                                <td>5</td>
                                <td>0.02 ETH</td>
                                <td>3149.26₹</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>9</td>
                                <td>5</td>
                                <td>0.02 ETH</td>
                                <td>3149.26₹</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>9</td>
                                <td>5</td>
                                <td>0.02 ETH</td>
                                <td>3149.26₹</td>
                            </tr>


                        </tbody>
                    </Table>
                </div>
            </div> */}

            <div className={styles.div1}>
                <div className={styles.div2}>
                    <Table striped bordered hover className={`mt-4 ${styles.table}`}>
                        <thead>
                            <tr>
                                <th style={{ color: '#8f3333' }}>NFT ID</th>
                                <th style={{ color: '#8f3333' }}>Yay Vote</th>
                                <th style={{ color: '#8f3333' }}>Nay Vote</th>
                                <th style={{ color: '#8f3333;' }}>Price in ETH</th>
                                <th style={{ color: '#8f3333;' }}>Price in INR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => {
                                if (item.executed && parseInt(item.yayVotes) > parseInt(item.nayVotes)) {
                                    return (
                                        <tr key={item.proposalId}>
                                            <td>{item.nftTokenId}</td>
                                            <td>{item.yayVotes}</td>
                                            <td>{item.nayVotes}</td>
                                            <td>0.1 ETH</td>
                                            <td>15334.81 ₹</td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default HistoryPage
