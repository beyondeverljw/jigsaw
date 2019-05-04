import {IAngle, Itiles} from '../types/index';

export class Tiles implements Itiles{
    
    constructor(
        readonly id: number,
        readonly img: HTMLImageElement,
        readonly imgOffsetX: number,
        readonly imgOffsetY: number,
        readonly width: number,
        readonly height: number,
        public x: number,
        public y: number,
        public angle: IAngle
    ){}

    paint(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
        console.log('paint');
        ctx.save();
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 0.5;
        ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.clip();
        ctx.drawImage(this.img, this.imgOffsetX, this.imgOffsetY, this.width, this.height, 0, 0, this.width, this.height);
        ctx.stroke();
        ctx.restore();
        return ctx;
    }
}