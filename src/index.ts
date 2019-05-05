import * as dom from './dom/index';
import * as game from './game/index';
dom.init(function(){
    const canvas: HTMLCanvasElement = document.querySelector('#jigsaw');
    const ctx = canvas.getContext('2d');
    if(ctx){
        game.init(ctx);
    }
    console.log('dom init');
    
});