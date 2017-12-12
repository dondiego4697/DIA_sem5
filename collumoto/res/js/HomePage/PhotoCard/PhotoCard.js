import './photocard.scss';
import {appendChild, createElement} from '../../util/htmlElement';
import {request} from '../../util/http';
import urls from '../../util/urls';
import Toast from "../../Toast/Toast";

export default class PhotoCard {
    /**
     * {
     *  isLiked: Boolean,
     *  likesCount: Integer,
     *  link: String
     * }
     */
    constructor(page, data) {
        this._page = page;
        this._cardData = data;
        this._init();
    }

    getData() {
        return this._cardData;
    }

    getCard() {
        return this._photoCard;
    }

    _setHeartListeners() {
        this._heart.addEventListener('click', event => {
            event.stopPropagation();
            this._page.showBlocker();
            const like = this._cardData.isLiked === false;
            request(urls.like(like, this._cardData.id)).then(res => {
                const data = res.json.message;
                this._cardData.isLiked = data.result;
                this._cardData.likesCount += data.result ? 1 : -1;
                this._setLikeState();
                this._setLikesCount();
                this._page.hideBlocker();
            }).catch(err => {
                Toast.showError(err.message);
                this._page.hideBlocker();
            });
        });
    }

    _setListeners() {
        this._photoCard.addEventListener('click', () => {
           document.location = `/photo/${this._cardData.id}`;
        });
    }


    _init() {
        this._photoCard = createElement('div', {
            'class': 'photo-card'
        });

        let infoCardData = this._createInfoCard();
        this._infoCard = infoCardData.infoCard;
        this._heart = infoCardData.heart;
        this._setHeartListeners();
        this._setListeners();
        this._likes = infoCardData.likes;

        const img = createElement('img', {
            src: this._cardData.link
        });
        appendChild(this._photoCard, this._infoCard);
        appendChild(this._photoCard, img);

        this._setLikeState();
        this._setLikesCount();

    }

    _setLikesCount() {
        this._likes.innerHTML = `_${this._cardData.likesCount}`;
    }

    _setLikeState() {
        if (this._cardData.isLiked) {
            this._heart.classList.add('liked');
        } else {
            this._heart.classList.remove('liked');
        }
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
}