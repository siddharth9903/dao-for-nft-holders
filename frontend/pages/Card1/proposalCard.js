import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import styles from './Card1.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function ProposalCard({ details, voteOnProposal, executeProposal }) {
    const { proposalId, nftTokenId, deadline, yayVotes, nayVotes, executed } = details
    return (
        <>
            <Card className={styles.card1}>

                <Card.Header><b>Proposol ID</b> : {proposalId}</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Fake NFT to Purchase : {nftTokenId}</ListGroup.Item>
                        <ListGroup.Item>Deadline : {deadline.toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Yay Votes : {yayVotes}</ListGroup.Item>
                        <ListGroup.Item>Nay Votes : {nayVotes}</ListGroup.Item>
                        <ListGroup.Item>Executed : {executed.toString()}</ListGroup.Item>
                        <br></br>
                    </ListGroup>

                    {deadline.getTime() > Date.now() && !executed ? (
                        <div className={styles.buttons}>
                            <Button
                                variant="info"
                                className={styles.btn}
                                onClick={() => voteOnProposal(proposalId, 'YAY')}
                            >
                                Yay Vote
                            </Button>
                            <Button
                                variant="info"
                                className={styles.btn}
                                onClick={() => voteOnProposal(proposalId, 'NAY')}
                            >
                                Nay Vote
                            </Button>
                        </div>
                    ) : deadline.getTime() < Date.now() && !executed ? (
                        <Button style={{ width: '100%' }}
                            variant="info"
                            className={styles.btn}
                            onClick={() => executeProposal(proposalId)}
                        >
                            Execute Proposal{' '}
                            {yayVotes > nayVotes ? '(YAY)' : '(NAY)'}
                        </Button>
                    ) : (
                        <div className={styles.description}>Proposal Executed</div>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}

export default ProposalCard;
