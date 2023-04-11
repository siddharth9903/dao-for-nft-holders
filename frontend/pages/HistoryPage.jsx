import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function HistoryPage() {
    return (
        <div className={`container ${styles.img5}`}>
            <h2 style ={{display : 'flex', justifyContent : 'center', marginTop :"10px"}}>Purchased NFTs</h2>
            <div className={styles.div1}>
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
            </div>
        </div>
    );
}

export default HistoryPage
