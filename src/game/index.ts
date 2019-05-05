import { Tiles } from './tiles';
import Angle from './Angle';
import TilesManage from './tilesManage';
import { ItilesManage } from '../types/index';

export function init(ctx: CanvasRenderingContext2D){
    let img = new Image();
    img.onload = function(){
        // ctx.drawImage(img, 0, 0, 800, 1200, 0, 0, ctx.canvas.width, ctx.canvas.height);
        divide(ctx, img);
    }
    img.src = '/image/qiaodan.jpg';
}
export function divide(ctx: CanvasRenderingContext2D, img: HTMLImageElement, rows: number = 6, cols: number = 4): any{
    const {width, height} = ctx.canvas,
        step: number = width / cols,
        tilesCount: number = rows * cols;

        // let angle = new Angle();
        // let tiles = new Tiles(
        //     1, img, step, 0, step, step, 0, 0, angle);
        //     tiles.paint(ctx);
        // console.log(tilesCount);
        // new TilesManage();

        let manage: TilesManage = new TilesManage(tilesCount);
        for(let i = 0; i <= tilesCount; i++){
            let angle = new Angle();
            let posX: number = step * (i % cols);
            let posY: number = step *( Math.floor(i / cols));
            manage.add(
                new Tiles(i, img, posX, posY, step, step, posX, posY, angle)
            );
        }
        // manage.getTilesById(7).paint(ctx);
        manage.paint(ctx);
}