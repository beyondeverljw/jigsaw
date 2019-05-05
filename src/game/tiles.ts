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
        ctx.strokeStyle = 'rgba(0,255,0,255)';
        ctx.lineWidth = 10;
        // ctx.translate(100, 200);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.clip();
        ctx.fillRect(this.x,this.y, 20, 50);
        console.log(this);
        // ctx.drawImage(this.img, this.imgOffsetX, this.imgOffsetY, this.width, this.height, this.imgOffsetX, this.imgOffsetY, this.width, this.height);
        // ctx.rotate(Math.PI * 1/2);
        
        
        ctx.restore();
        return ctx;
    }
}