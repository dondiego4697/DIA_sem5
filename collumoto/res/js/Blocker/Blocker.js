import {appendChild, createElement, removeChild} from "../util/htmlElement";
import "./blocker.scss";

export default class Blocker {
    constructor() {
        this._node = document.body;
        this._isCreated = false;
    }

    _create() {
        this._blockerContainer = createElement('div', {
            'class': 'blocker-container'
        });
        this._blockerLoader = createElement('div', {
            'class': 'blocker-loader'
        });

        let i = 15;
        while (i > 0) {
            appendChild(this._blockerLoader, createElement('span'));
            i--;
        }
        appendChild(this._blockerContainer, this._blockerLoader);
    }

    add() {
        if (!this._isCreated) this._create();
        appendChild(this._node, this._blockerContainer);
    }

    remove() {
        removeChild(this._node, this._blockerContainer);
    }
}