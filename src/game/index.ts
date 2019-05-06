import TilesManage from './tilesManage';

export function init(ctx: CanvasRenderingContext2D){
    let img = new Image();
    img.onload = function(){
        // ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        // divide(ctx, img);
        const manage = new TilesManage(ctx, img);
        manage.setSpaceTiles(7);
        console.log(manage.getSpaceTilesData());

    }
    img.src = '/image/qiaodan400-600.png';
    window.addEventListener('keydown', function(e){
        console.log(e);
        
        switch(e.keyCode){
            case 37: console.log('doLeft'); break;
            case 38: console.log('doTop'); break;
            case 39: console.log('doRight'); break;
            case 40: console.log('doBottom'); break;
            default: console.log('无监听'+ e.keyCode);
        }
    })
}
