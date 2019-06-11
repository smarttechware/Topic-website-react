import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LogoImage from 'components/common/LogoImage';
import Paper from '@material-ui/core/Paper';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';
import 'styles/containers/login.scss';

class LoginPage extends PureComponent {
  static propTypes = {
    login: func.isRequired,
    authenticated: bool.isRequired,
  }

  render() {
    const { login, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <main className="loginPage">
        <Paper className="loginPage__paper">
          <LogoImage />
          <h1 className="loginPage__title">
            <FormattedMessage id="login.title" />
          </h1>
          <LoginForm handleSubmit={login} />
          <Link to="/sign-up/" className="loginPage__link">
            <FormattedMessage id="login.signup" />
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
  login: user => dispatch(login(user))
});

export default connect(mapState, mapDispatch)(LoginPage);
