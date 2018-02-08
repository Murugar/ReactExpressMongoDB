import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, browserHistory } from 'react-router';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      registerError: false,
    };
  }


  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ registerError: false });

    fetch('/api/register',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
          .then(response => response.json())
          .then(() => {
            browserHistory.push({
              pathname: '/chat',
              state: {
                username: this.state.username,
              },
            });
          })
          .catch((err) => {
            this.setState({ registerError: true });
            console.log(err);
          });
  }

  onBlur = () => {
    fetch(`/api/username/${this.state.username}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
            .then(response => response.json())
            .then((responseJson) => {
              this.setState({ registerError: responseJson.alreadyInUse });
            })
            .catch((err) => {
                 console.log(err)
            });
  }

  render() {
    return (
      <div className="ChooseNickDialogContainer">
        <p>Create Account</p>

        <div className="ChooseNickDialog">
          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              autoFocus
              hintText="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              onBlur={this.onBlur}
              errorText={this.state.registerError && 'Username is already in use. Please choose another.'}
            />
            <TextField
              type="password"
              fullWidth
              hintText="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <RaisedButton
              type="submit"
              disabled={false}
              fullWidth
              label="Create Account"
              primary
            />
          </form>
          <p>or <Link to="/">Login</Link></p>
        </div>
      </div>
    );
  }
}

export default Register;
