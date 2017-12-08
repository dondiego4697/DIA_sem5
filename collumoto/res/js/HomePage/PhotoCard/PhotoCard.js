import './photocard.scss';
import {appendChild, createElement} from "../../util/htmlElement";

export default class PhotoCard {
    /**
     * {
     *  isLiked: Boolean,
     *  likesCount: Integer,
     *  link: String
     * }
     */
    constructor(node, card1, card2) {
        this._node = node;
        this._cardData1 = card1;
        this._cardData2 = card2;
        this._init();
    }


    _init() {
        this._photoPair = createElement('div', {
            'class': 'photo-pair'
        });

        this._photoCard1 = createElement('div', {
            'class': 'photo-card'
        });

        let infoCardData = this._createInfoCard();
        this._infoCard1 = infoCardData.infoCard;
        this._heart1 = infoCardData.heart;
        this._likes1 = infoCardData.likes;

        const img1 = createElement('img', {
           src: this._cardData1.link
        });
        appendChild(this._photoCard1, this._infoCard1);
        appendChild(this._photoCard1, img1);

        this._photoCard2 = createElement('div', {
            'class': 'photo-card'
        });

        infoCardData = this._createInfoCard();
        this._infoCard2 = infoCardData.infoCard;
        this._heart2 = infoCardData.heart;
        this._likes2 = infoCardData.likes;

        const img2= createElement('img', {
           src: this._cardData2.link
        });
        appendChild(this._photoCard2, this._infoCard2);
        appendChild(this._photoCard2, img2);

        appendChild(this._photoPair, this._photoCard1);
        appendChild(this._photoPair, this._photoCard2);

        this._setLikeState();
        this._setLikesCount();
    }

    _setLikesCount() {
        this._likes1.innerHTML = `_${this._cardData1.likesCount}`;
        this._likes2.innerHTML = `_${this._cardData2.likesCount}`;
    }

    _setLikeState() {

    }

    _createInfoCard() {
        const infoCard = createElement('div', {
            'class': 'info-card'
        });

        const heartContainer = createElement('div', {
            'class': 'heart-container'
        });

        const heart = createElement('div', {
            'class': 'heart'
        });
        appendChild(heartContainer, heart);

        const likesContainer = createElement('div', {
            'class': 'likes-container'
        });

        const likes = createElement('div', {
            'class': 'likes'
        });
        appendChild(likesContainer, likes);

        appendChild(infoCard, heartContainer);
        appendChild(infoCard, likesContainer);

        return {
            infoCard,
            heart,
            likes
        }
    }

    addToNode() {
        appendChild(this._node, this._photoPair);
    }
}