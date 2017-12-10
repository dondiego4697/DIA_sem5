import {appendChild, createElement, removeChild} from "../../util/htmlElement";

export default class PhotoPair {
    constructor(node) {
        this._node = node;
        this._init();
    }

    _init() {
        this._photoPair = createElement('div', {
            'class': 'photo-pair'
        });
        appendChild(this._node, this._photoPair);
    }

    addCard(card) {
        appendChild(this._photoPair, card.getCard());
    }

    removePair() {
        removeChild(this._node, this._photoPair);
    }
}