import { Itiles, ItilesManage } from '../types/index';

export default class Tiles implements Itiles{
    readonly ctx: CanvasRenderingContext2D;
    readonly img: HTMLImageElement;
    angle: number = 0;
    posId: number;
    posX: number;
    posY: number;
    isSpaceTiles: Boolean = false;
    
    constructor(
        readonly manage: ItilesManage,
        readonly id: number
    ){
        this.ctx = this.manage.ctx;
        this.img = this.manage.img;
        this.posId = this.id;
        this.init();
    }
    protected init(){
        this.initPosXandY();
    }
    /**
     * 根据posId计算出posX, posY, 并赋值
     */
    private initPosXandY(){
        const {cols, step} = this.manage;
        this.posX = step * ( this.posId % cols );
        this.posY = step * ( Math.floor(this.posId / cols) );
    }

    getTopTiles(): Itiles | null{
        return null;
    };
    getRightTiles(): Itiles | null{
        return null;
    };
    getBottomTiles(): Itiles | null{
        return null;
    };
    getLeftTiles(): Itiles | null{
        return null;
    };
    interchange(tiles: Itiles): void{

    };
    setSpaceTiles(): ImageData{
        this.isSpaceTiles = true;
        let data: ImageData = this.ctx.getImageData(this.posX, this.posY, this.manage.step, this.manage.step);
        this.paint();
        return data;
    };  
    paint(): CanvasRenderingContext2D{
        let ctx = this.ctx,
            step = this.manage.step;
        if(this.isSpaceTiles === true){
            ctx.clearRect(this.posX, this.posY, step, step);
        }else{
            ctx.save();
            ctx.translate(this.posX + step / 2, this.posY + step / 2);
            ctx.rotate(this.angle);
            ctx.translate(- this.posX - step / 2, - this.posY - step / 2);
            ctx.drawImage(this.img, this.posX, this.posY, step, step, this.posX, this.posY, step, step);
            ctx.restore();
        }
        
        return ctx;
    } 
}