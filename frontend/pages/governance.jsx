import { Contract, providers, utils } from 'ethers'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Web3Modal from 'web3modal'
import { CRYPTODEVS_NFT_ABI as abi, NFT_CONTRACT_ADDRESS } from '../constants'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Governance () {
  const [walletConnected, setWalletConnected] = useState(false)
  const [presaleStarted, setPresaleStarted] = useState(false)
  const [presaleEnded, setPresaleEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [tokenIdsMinted, setTokenIdsMinted] = useState('0')
  const web3ModalRef = useRef()
  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer)
      const tx = await nftContract.presaleMint({
        value: utils.parseEther('0.01')
      })
      setLoading(true)
      await tx.wait()
      setLoading(false)
      window.alert('You successfully minted a Crypto Dev!')
    } catch (err) {
      console.error(err)
    }
  }

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer)
      const tx = await nftContract.mint({
        value: utils.parseEther('0.01')
      })
      setLoading(true)
      await tx.wait()
      setLoading(false)
      window.alert('You successfully minted a Crypto Dev!')
    } catch (err) {
      console.error(err)
    }
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner()
      setWalletConnected(true)
    } catch (err) {
      console.error(err)
    }
  }

  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer)
      const tx = await nftContract.startPresale()
      setLoading(true)
      await tx.wait()
      setLoading(false)
      await checkIfPresaleStarted()
    } catch (err) {
      console.error(err)
    }
  }

  const checkIfPresaleStarted = async () => {
    try {
      const provider = await getProviderOrSigner()
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider)
      const _presaleStarted = await nftContract.presaleStarted()
      if (!_presaleStarted) {
        await getOwner()
      }
      setPresaleStarted(_presaleStarted)
      return _presaleStarted
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner()
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider)
      const _presaleEnded = await nftContract.presaleEnded()
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000))
      if (hasEnded) {
        setPresaleEnded(true)
      } else {
        setPresaleEnded(false)
      }
      return hasEnded
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner()
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider)
      const _owner = await nftContract.owner()
      const signer = await getProviderOrSigner(true)
      const address = await signer.getAddress()
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner()
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider)
      const _tokenIds = await nftContract.tokenIds()
      setTokenIdsMinted(_tokenIds.toString())
    } catch (err) {
      console.error(err)
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

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'goerli',
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectWallet()

      const _presaleStarted = checkIfPresaleStarted()
      if (_presaleStarted) {
        checkIfPresaleEnded()
      }

      getTokenIdsMinted()

      const presaleEndedInterval = setInterval(async function () {
        const _presaleStarted = await checkIfPresaleStarted()
        if (_presaleStarted) {
          const _presaleEnded = await checkIfPresaleEnded()
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval)
          }
        }
      }, 5 * 1000)

      setInterval(async function () {
        await getTokenIdsMinted()
      }, 5 * 1000)
    }
  }, [walletConnected])

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      )
    }

    if (loading) {
      return <button className={styles.button}>Loading...</button>
    }

    return (
      <button className={styles.button} onClick={publicMint}>
        Mint 🚀
      </button>
    )
  }

  return (
    <div className={styles.image}>
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
            {tokenIdsMinted}/20 have been minted
          </div>
          {renderButton()}
        </div>
       
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  )
}
