import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Card, Container, Form, Grid, Header, Icon, Label, Message, Segment } from "semantic-ui-react"
import photo from "../../images/loginbg.jpg"

export const Login = props => {
    const email = useRef();
    const password = useRef();
    const existDialog = useRef();
    const history = useHistory();



    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => (user.length ? user[0] : false));
    };

    const handleLogin = e => {
        e.preventDefault();

        existingUserCheck().then(exists => {
            if (exists) {
                localStorage.setItem("active_user", exists.id);
                history.push("/");
            } else {
                existDialog.current.showModal();
            }
        });
    };

    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Laugh Track
                    </Header>
                    <section className="container--login">
                        <dialog className="dialog dialog--auth" ref={existDialog}>
                            <div>User does not exist</div>
                            <Button
                                className="button--close"
                                onClick={e => existDialog.current.close()}
                            >
                                Close
                    </Button>
                        </dialog>
                    </section>
                    <Form size='large' onSubmit={handleLogin}>
                        <Segment stacked>
                            <input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                ref={email}
                                type="email"
                                id="email"
                                className="emailInput"
                                required
                                autoFocus
                            ></input>

                            <Button type="submit" fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/register">Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
            <div className="picContainer">
                <img id="child" src={photo} alt="Dave Chappelle doing standup" width="100%" />
            </div>
        </>
    );
};
