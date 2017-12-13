import BasePage from '../BasePage';
import './photopage.scss';
import {request} from "../util/http";
import urls from "../util/urls";
import Toast from "../Toast/Toast";

export default class PhotoPage extends BasePage {
    constructor() {
        super();
        this._heart = document.getElementById('heart');
        this._likesCount = document.getElementById('like-counter');
        this._photoData = {
            id: Number.parseInt(window.photoData.id),
            likesCount: Number.parseInt(window.photoData.likesCount),
            isLiked: window.photoData.isLiked === 'True'
        };
        this._init();
    }

    _init() {
        this._initListeners();
        this._setLikeState();
    }

    _initListeners() {
        this._heart.addEventListener('click', () => {
            this.showBlocker();
            const like = this._photoData.isLiked === false;
            request(urls.like(like, this._photoData.id)).then(res => {
                const data = res.json.message;
                this._photoData.isLiked = data.result;
                this._photoData.likesCount += data.result ? 1 : -1;
                this._setLikeState();
                this._setLikesCount();
                this.hideBlocker();
            }).catch(err => {
                Toast.showError(err.message);
                this.hideBlocker();
            });
        });
    }

    _setLikeState() {
        if (this._photoData.isLiked) {
            this._heart.classList.add('liked');
        } else {
            this._heart.classList.remove('liked');
        }
    }

    _setLikesCount() {
        this._likesCount.innerHTML = `_${this._photoData.likesCount}`;
    }
}
