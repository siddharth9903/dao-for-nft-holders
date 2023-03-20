import {Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import styles from './Card1.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Card1() {
    return (
        <>
            <div className={styles.img}>
                <h2 className={styles.h2} style={{ marginTop: "22px" }}>
                    <b>View Proposals</b>
                </h2>
                <div className={styles.main}>
                    <div className={styles.main1}>

                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>
                                    <br></br>
                                </ListGroup>
                                <div className={styles.buttons}>
                                    <Button variant="info" className = {styles.btn}>Yay Vote</Button>
                                    <Button variant="info" className = {styles.btn}>Nay Vote</Button>
                                </div>

                            </Card.Body>

                        </Card>
                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>
                                    <br></br>
                                </ListGroup>
                                <Button style={{ width: '100%' }} variant="info" className = {styles.btn}>Execute Proposal</Button>
                            </Card.Body>

                        </Card>
                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>
                                    <br></br>

                                </ListGroup>
                                <Button style={{ width: '100%' }} variant="info" className = {styles.btn}>Execute Proposal</Button>
                            </Card.Body>

                        </Card>
                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>
                                    <br></br>

                                </ListGroup>
                                <Button style={{ width: '100%' }} variant="info" className = {styles.btn}>Execute Proposal</Button>
                            </Card.Body>

                        </Card>
                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>
                                    <br></br>

                                </ListGroup>
                                <Button style={{ width: '100%' }} variant="info" className = {styles.btn}>Execute Proposal</Button>
                            </Card.Body>

                        </Card>
                        <Card className={styles.card1}>
                            <Card.Header><b>Fake NFT to Purchase</b> : 1</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Deadline : 2/24/2023 , 4:48:48 AM</ListGroup.Item>
                                    <ListGroup.Item>Yay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Nay Votes : 1</ListGroup.Item>
                                    <ListGroup.Item>Executed : False</ListGroup.Item>

                                    <br></br>

                                </ListGroup>
                                <Button style={{ width: '100%' }} variant="info" className = {styles.btn}>Execute Proposal</Button>
                            </Card.Body>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card1;
