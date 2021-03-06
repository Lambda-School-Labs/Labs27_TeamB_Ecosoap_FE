import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import * as logo from '../../../styles/logo.png';
import { config } from '../../../utils/oktaConfig';

const AdminLoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: logo,
      // add your custom logo to your signing/register widget here.
      colors: {
        brand: '#3BB54A',
      },
      helpLinks: {
        help: 'https://example.com/help',
        forgotPassword: 'https://example.com/forgot-password',
        unlock: 'https://example.com/unlock-account',
        custom: [
          {
            text: 'Login as Buyer',
            href: '/buyerlogin',
          },
        ],
      },
      i18n: {
        en: {
          'primaryauth.title': 'Admin login to Eco-Soap-Bank',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return <div id="sign-in-widget" />;
};

export default AdminLoginContainer;
