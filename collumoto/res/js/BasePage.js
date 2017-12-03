import Blocker from "./Blocker/Blocker";

export default class BasePage {
    constructor() {
        this._blocker = new Blocker();
    }

    showBlocker() {
        this._blocker.add();
    }

    hideBlocker() {
        setTimeout(() => {
            this._blocker.remove();
        }, 1000);
    }
}