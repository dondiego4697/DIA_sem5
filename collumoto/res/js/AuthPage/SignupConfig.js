/*
    <div class="auth-container hidden" id="signup-container">
        <div class="auth-controls">
            <div class="input-group">
                <label>Login:</label>
                <input id="s_login" type="text" class="auth-input" title="Login">
                <div id="s_err_msg_login" class="error-message hidden"></div>
            </div>
            <div class="input-group">
                <label>Password:</label>
                <input id="s_pass" type="password" class="auth-input" title="Password">
                <div id="s_err_msg_pass" class="error-message hidden"></div>
            </div>
            <div class="input-group">
                <label>Repeat password:</label>
                <input id="s_repeat_pass" type="password" class="auth-input" title="Password">
                <div id="s_err_msg_repeat_pass" class="error-message hidden"></div>
            </div>
            <div class="input-group">
                <input id="signup" type="submit" class="auth-submit" value="Sign up">
            </div>
            <a class="auth-to" href="">Log in</a>
        </div>
    </div>
 */

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
                cId: 'etRLogin'
            },
            {
                type: 'div',
                attributes: {
                    'class': 'error-message hidden'
                },
                cId: 'etRLoginErr'
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
                cId: 'etRPass'
            },
            {
                type: 'div',
                attributes: {
                    'class': 'error-message hidden'
                },
                cId: 'etRPassErr'
            }
        ]
    },
    {
        data: [
            {
                type: 'label',
                inner: 'Repeat password:'
            },
            {
                type: 'input',
                attributes: {
                    type: 'password',
                    'class': 'auth-input'
                },
                cId: 'etRPassRepeat'
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
                    value: 'Sign up'
                },
                cId: 'btnSignup'
            }
        ]
    }
];
export default config;