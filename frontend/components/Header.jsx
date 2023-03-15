import React from 'react'

const Header = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#e3f2fd !important" }}>

                <div class="container-fluid">

                    <div class="collapse navbar-collapse d-flex justify-content-evenly" id="navbarNavAltMarkup">
                        <div class="navbar-nav d-flex" style={{width:"88%"}}>
                            <div class="d-flex justify-content-evenly" style= {{width:'97%'}}>
                                <a class="nav-link active" aria-current="page" href="/whitelist">Whitelist</a>
                                <a class="nav-link" href="governance">Governance Token</a>
                                {/* <a class="nav-link" href="">NFT marketplace</a> */}
                                <a class="nav-link" href="/">Proposals</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </nav>
        </>
    )
}

export default Header