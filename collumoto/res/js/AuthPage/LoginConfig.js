/*<div class="auth-container" id="login-container">
        <div class="auth-controls">
            <div class="input-group">
                <label>Login:</label>
                <input id="l_login" type="text" class="auth-input" title="Login">
                <div id="l_err_msg_login" class="error-message hidden"></div>
            </div>
            <div class="input-group">
                <label>Password:</label>
                <input id="l_pass" type="password" class="auth-input" title="Password">
                <div id="l_err_msg_pass" class="error-message hidden"></div>
            </div>
            <div class="input-group">
                <input id="login" type="submit" class="auth-submit" value="Log in">
            </div>
            <a class="auth-to" href="">Sign up</a>
        </div>
    </div>*/

const config = [
    {
        data: [
            {
                type: 'label',
                inner: 'Login:'
            },
            {
                type: 'input',
                attributes: {
                    type: 'text',
                    'class': 'auth-input'
                },
                cId: 'etLLogin'
            },
            {
                type: 'div',
                attributes: {
                    'class': 'error-message hidden'
                },
                cId: 'etLLoginErr'
            }
        ]
    },
    {
        data: [
            {
                type: 'label',
                inner: 'Password:'
            },
            {
                type: 'input',
                attributes: {
                    type: 'password',
                    'class': 'auth-input'
                },
                cId: 'etLPass'
            },
            {
                type: 'div',
                attributes: {
                    'class': 'error-message hidden'
                },
                cId: 'etLPassErr'
            }
        ]
    },
    {
        data: [
            {
                type: 'input',
                attributes: {
                    type: 'button',
                    'class': 'auth-submit',
                    value: 'Log in'
                },
                cId: 'btnLogin'
            }
        ]
    }
];
export default config;