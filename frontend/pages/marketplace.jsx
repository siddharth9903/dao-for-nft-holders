import React from 'react'
import img1 from '../photos/nft-min.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../components/Card1/Card1.module.css'
import NFTCard from '../components/NFTCard/nftCard'
import { data } from '../NFTs_data'
import Header from '../components/Header'
import Head from 'next/head'

const Marketplace = () => {
  return (
    <>
      <div className={styles.img}>
      <Header />
        <h2 className={styles.h2} style={{ marginTop: '22px' }}>
          <b>NFT Marketplace</b>
        </h2>
        <div className={styles.main}>
          <div className={styles.main1}>
            {data &&
              data.length > 0 &&
              data.map(details => <NFTCard details={details} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Marketplace
