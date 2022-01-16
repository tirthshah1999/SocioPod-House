import React from 'react';
import styles from './Home.module.css';
import {Link, useHistory} from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const history = useHistory();
    
    function register(){
        history.push('/register');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to SocioPod House!" icon="logo">
                {/* This all will be passed as children */}
                <p className={styles.text}>
                    This is SocioPod House where you can listen your favorite podcasters
                </p>
                <div>
                    <Button onClick={register} text="Get your username" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                    <Link style={signInLinkStyle} to="/login">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Home
