import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from 'utils/constraints';
import { TextField } from 'formik-material-ui';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import 'styles/components/user/loginForm.scss';

import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export class LoginForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
  }

  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values, actions) {
    try {
      await this.props.handleSubmit(values);
    } catch (err) {
      actions.setFieldError('general', err.errors[0]);
    } finally {
      actions.setSubmitting(false);
    }
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="loginForm">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.submitForm}
          validationSchema={LoginSchema}
          render={formProps => (
            <Form>
              <p className="loginForm__message">{formProps.errors.general}</p>
              <FormControl margin="normal" fullWidth>
                <Field
                  type="text"
                  name="email"
                  component={TextField}
                  className="loginForm__input"
                  label={intl.formatMessage(messages.email)}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <Field
                  type="password"
                  name="password"
                  component={TextField}
                  className="loginForm__input"
                  label={intl.formatMessage(messages.password)}
                  fullWidth
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="loginForm__button"
                disabled={formProps.isSubmitting}
              >
                <FormattedMessage id="login.form.submit" />
              </Button>

              {formProps.isSubmitting && <Loading />}
            </Form>
          )
          }
        />
      </div>
    );
  }
}

export default injectIntl(LoginForm);
