import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import { providers, Contract } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { WHITELIST_CONTRACT_ADDRESS, WHITELIST_ABI as abi } from '../constants'
import Header from '../components/Header'

export default function Whitelist () {
  const [walletConnected, setWalletConnected] = useState(false)
  const [joinedWhitelist, setJoinedWhitelist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0)
  const web3ModalRef = useRef()

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

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )
      const tx = await whitelistContract.addAddressToWhitelist()
      setLoading(true)
      await tx.wait()
      setLoading(false)
      await getNumberOfWhitelisted()
      setJoinedWhitelist(true)
    } catch (err) {
      console.error(err)
    }
  }

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner()
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      )
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted()
      setNumberOfWhitelisted(_numberOfWhitelisted)
    } catch (err) {
      console.error(err)
    }
  }

  const checkIfAddressInWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )
      const address = await signer.getAddress()
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      )
      setJoinedWhitelist(_joinedWhitelist)
    } catch (err) {
      console.error(err)
    }
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner()
      setWalletConnected(true)

      checkIfAddressInWhitelist()
      getNumberOfWhitelisted()
    } catch (err) {
      console.error(err)
    }
  }

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        )
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>
      } else {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        )
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      )
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'goerli',
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectWallet()
    }
  }, [walletConnected])

  return (
    <div>
      <Header />
      <Head>
        <title>CryptoDevs DAO</title>
        <meta name='description' content='CryptoDevs DAO' />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD'
          crossorigin='anonymous'
        ></link>
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN'
          crossorigin='anonymous'
        ></script>
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src='./crypto-devs.svg' />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  )
}
