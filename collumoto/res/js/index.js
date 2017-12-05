import '../css/main.css';
import '../css/brand.css';
import '../css/nav.css';

import AuthPage from './AuthPage/AuthPage';
import QuestionPage from "./QuestionPage/QuestionPage";
import HomePage from "./HomePage/HomePage";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    const href = location.href;
    if (href.indexOf('auth') !== -1) {
        const authPage = new AuthPage();
    } else if (href.indexOf('question') !== -1) {
        const questionPage = new QuestionPage();
    } else {
        const homePage = new HomePage();
    }
}