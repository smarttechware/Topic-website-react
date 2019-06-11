import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import LogoImage from 'components/common/LogoImage';
import Paper from '@material-ui/core/Paper';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import 'styles/containers/signup.scss';

class SignUpPage extends PureComponent {
  static propTypes = {
    signUp: func.isRequired,
    authenticated: bool.isRequired
  }

  render() {
    const { signUp, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <main className="signupPage">
        <Paper className="signupPage__paper">
          <LogoImage />
          <h1 className="signupPage__title">
            <FormattedMessage id="signup.title" />
          </h1>
          <SignUpForm handleSubmit={signUp} />
          <Link to="/login/" className="signupPage__link">
            <FormattedMessage id="signup.signin" />
          </Link>
        </Paper>
      </main>
    );
  }
}

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user))
});

export default connect(mapState, mapDispatch)(SignUpPage);
