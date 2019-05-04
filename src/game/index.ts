import { Tiles } from './tiles';
import Angle from './Angle';
export function init(ctx: CanvasRenderingContext2D){
    let img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        divide(ctx, img);
    }
    img.src = '/image/qiaodan.jpg';
}
export function divide(ctx: CanvasRenderingContext2D, img: HTMLImageElement, rows: number = 6, cols: number = 4): any{
    const {width, height} = ctx.canvas,
        step: number = width / cols,
        tilesCount: number = rows * cols;
        let angle = new Angle();
        let tiles = new Tiles(
            1, img, step, 0, step, step, 0, 0, angle);
            tiles.paint(ctx);
}