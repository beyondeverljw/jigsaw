import * as dom from './dom/index';
import * as game from './game/index';
import { EventsManage } from './eventsManage/index';

dom.loadDom()
    .then(res => {
        const canvas: HTMLCanvasElement = document.querySelector('#jigsaw');
        const ctx = canvas.getContext('2d');
        if(ctx !== null){
            dom.loadImage('/image/qiaodan400-600.png')
                .then(image => {
                    const eManage = new EventsManage();
                    game.init(ctx, <HTMLImageElement>image, eManage);
                    dom.bindKeyboard(37, 'arrowLeft', eManage);
                    dom.bindKeyboard(38, 'arrowTop', eManage);
                    dom.bindKeyboard(39, 'arrowRight', eManage);
                    dom.bindKeyboard(40, 'arrowBottom', eManage);
                })
                .catch(err => {
                    console.log('图片加载失败');
                })
        }
    })