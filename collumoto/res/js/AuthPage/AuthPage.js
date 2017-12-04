import './auth.css';
import {createElement, appendChild} from '../util/htmlElement';
import configLogin from './LoginConfig';
import configSignup from './SignupConfig';
import urls from '../util/urls';
import {request} from "../util/http";
import getCsrf from "../util/csrf";
import BasePage from "../BasePage";

import {check200} from "../util/checkStatus";
import Toast from "../Toast/Toast";

export default class AuthPage extends BasePage {
    constructor() {
        super();
        this._node = document.getElementById('auth');

        this._btnToHandler = this._btnToHandler.bind(this);

        this._init();
    }

    _init() {
        this._loginContainer = createElement('div', {
            'class': 'auth-container'
        });

        this._signupContainer = createElement('div', {
            'class': 'auth-container hidden'
        });
        appendChild(this._node, this._loginContainer);
        appendChild(this._node, this._signupContainer);

        const loginControlsContainer = this._createControlsContainer(configLogin);
        const signupControlsContainer = this._createControlsContainer(configSignup);

        appendChild(this._loginContainer, loginControlsContainer);
        this.btnToSignup = createElement('a', {
            'class': 'auth-to',
            href: ''
        }, 'Sign up');
        appendChild(loginControlsContainer, this.btnToSignup);


        appendChild(this._signupContainer, signupControlsContainer);
        this.btnToLogin = createElement('a', {
            'class': 'auth-to',
            href: ''
        }, 'Log in');
        appendChild(signupControlsContainer, this.btnToLogin);

        this._initListeners();
    }

    _createControlsContainer(config) {
        const controls = createElement('div', {'class': 'auth-controls'});
        const data = this._createInputGroups(config);
        data.result.forEach(group => {
            appendChild(controls, group);
        });

        data.links.forEach(link => {
            this[link.name] = link.el;
        });
        return controls;
    }

    _createInputGroups(config) {
        const links = [];
        const result = [];
        config.forEach(groupData => {
            const group = createElement('div', {'class': 'input-group'});
            groupData.data.forEach(elData => {
                const el = createElement(elData.type, elData.attributes, elData.inner);
                if (elData.cId) links.push({el, name: elData.cId});
                appendChild(group, el);
            });
            result.push(group);
        });
        return {
            links,
            result
        }
    }

    _clearLoginFields() {
        this.etLLogin.value = '';
        this.etLPass.value = '';
        this._errorAction(false, this.etLLogin, this.etLLoginErr, '');
        this._errorAction(false, this.etLPass, this.etLPassErr, '');
    }

    _clearSignupFields() {
        this.etRLogin.value = '';
        this.etRPass.value = '';
        this.etRPassRepeat.value = '';
        this._errorAction(false, this.etRLogin, this.etRLoginErr, '');
        this._errorAction(false, this.etRPass, this.etRPassErr, '');
    }

    _initListeners() {
        this.btnToSignup.addEventListener('click', this._btnToHandler);
        this.btnToLogin.addEventListener('click', this._btnToHandler);
        this.btnLogin.addEventListener('click', event => {
            event.preventDefault();
            this._validate([
                {
                    type: 'checkEmpty',
                    value: [[this.etLLogin, this.etLLoginErr], [this.etLPass, this.etLPassErr]]
                }
            ]).then(() => {
                this.showBlocker();
                request(urls.login, {
                    'X-CSRFToken': getCsrf()
                }, 'POST', {
                    login: this.etLLogin.value,
                    password: this.etLPass.value
                }).then(data => {
                    if (!check200(data.status)) {
                        throw new Error('Wrong data');
                    }
                    this.hideBlocker();
                    if (data.redirected) {
                        window.location = data.url;
                    }
                }).catch(err => {
                    Toast.showError(err.message);
                    this.hideBlocker();
                });
            });
        });

        this.btnSignup.addEventListener('click', event => {
            event.preventDefault();
            this._validate([
                {
                    type: 'checkEmpty',
                    value: [[this.etRLogin, this.etRLoginErr], [this.etRPass, this.etRPassErr]]
                },
                {
                    type: 'passLength',
                    value: [this.etRPass, this.etRPassErr]
                },
                {
                    type: 'equal',
                    value: [[this.etRPass, this.etRPassErr], this.etRPassRepeat]
                }
            ]).then(() => {
                this.showBlocker();
                request(urls.signup, {
                    'X-CSRFToken': getCsrf()
                }, 'POST', {
                    login: this.etRLogin.value,
                    password: this.etRPass.value,
                    passwordRepeat: this.etRPassRepeat.value
                }).then(data => {
                    if (!check200(data.status)) {
                        throw new Error('Wrong data');
                    }
                    this.hideBlocker();
                    this._changeSubViews();
                    this._clearSignupFields();
                }).catch(err => {
                    Toast.showError(err.message);
                    this.hideBlocker();
                });
            });
        });
    }

    _btnToHandler(event) {
        event.preventDefault();
        this._changeSubViews();
    }

    _changeSubViews() {
        this._loginContainer.classList.toggle('hidden');
        this._signupContainer.classList.toggle('hidden');
        this._clearLoginFields();
        this._clearSignupFields();
    }

    _validate(data) {
        return new Promise((resolve, reject) => {
            let isError = false;
            data.forEach(val => {
                if (isError) return;
                switch (val.type) {
                    case 'checkEmpty': {
                        const arr = val.value;
                        arr.forEach(info => {
                            if (info[0].value.trim() === '') {
                                this._errorAction(true, info[0], info[1], 'Empty field');
                                isError = true;
                            } else {
                                this._errorAction(false, info[0], info[1], '');
                            }
                        });
                        break;
                    }
                    case 'passLength': {
                        if (val.value[0].value.length < 8) {
                            this._errorAction(true, val.value[0], val.value[1], 'Min length = 8');
                            isError = true;
                        } else {
                            this._errorAction(true, val.value[0], val.value[1], '');
                        }
                        break;
                    }
                    case 'equal': {
                        const arr = val.value;
                        if (arr[0][0].value !== arr[1].value) {
                            this._errorAction(true, arr[0][0], arr[0][1], 'Passwords not equal');
                            isError = true;
                        } else {
                            this._errorAction(false, arr[0][0], arr[0][1], '');
                        }
                        break;
                    }
                }
            });
            if (isError) {
                reject();
            } else {
                resolve();
            }
        });
    }

    _errorAction(isError, input, error, errText) {
        if (isError) {
            input.classList.add('error');
            error.innerHTML = errText;
            error.classList.remove('hidden');
        } else {
            input.classList.remove('error');
            error.classList.add('hidden');
        }
    }
}