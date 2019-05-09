import { Itiles, ItilesManage } from '../types/index';

export default class Tiles implements Itiles{
    readonly ctx: CanvasRenderingContext2D;
    readonly img: HTMLImageElement;
    angle: number = 0;
    posId: number;
    posX: number;
    posY: number;
    isSpaceTiles: Boolean = false;
    private imgInfo: number[];
    
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
        this.setImgInfo();
    }
    private setImgInfo(): void{
        let { step } = this.manage;
        this.imgInfo = [this.posX, this.posY, step, step];
    }
    /**
     * 根据posId计算出posX, posY, 并赋值
     */
    private initPosXandY(){
        const {cols, step} = this.manage;
        this.posX = step * ( this.posId % cols );
        this.posY = step * ( Math.floor(this.posId / cols) );
    }

    getTopTiles(): number | null{
        let {rows, cols} = this.manage,
            curRows = Math.floor(this.posId / cols);
        if(curRows === 0){
            return null;
        }else{
            return this.posId - cols;
        }
    };
    getRightTiles(): number | null{
        const {cols} = this.manage;
        if(this.posId % cols === cols - 1){
            return null;
        } else {
            return this.posId + 1
        }
    };
    getBottomTiles(): number | null{
        let {rows, cols} = this.manage,
            curRows = Math.floor(this.posId / cols);
        if(curRows === rows){
            return null;
        }else{
            return this.posId + cols;
        }
    };
    getLeftTiles(): number | null{
        const {cols} = this.manage;
        if(this.posId % cols === 0){
            return null;
        }else{
            return this.posId - 1;
        }
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
            // ctx.clearRect(this.posX, this.posY, step, step);
            ctx.save();
            ctx.translate(this.posX + step / 2, this.posY + step / 2);
            ctx.rotate(this.angle);
            ctx.translate(- this.posX - step / 2, - this.posY - step / 2);
            ctx.drawImage(this.img, this.imgInfo[0],this.imgInfo[1],this.imgInfo[2],this.imgInfo[3], this.posX, this.posY, step, step);
            ctx.restore();
        }
        return ctx;
    }
    erase(): void{
        this.ctx.clearRect(this.posX, this.posY, this.manage.step, this.manage.step);
    }
    paintLight(): CanvasRenderingContext2D{
        let ctx = this.ctx;
        this.paint();
        ctx.save();
        // ctx.shadowBlur = 20;
        // ctx.shadowColor = 'rgba(128,0,0,0.7)';
        // ctx.shadowOffsetX = 0;
        // ctx.shadowOffsetY = 0;
        ctx.restore();
        return ctx;
    }
    move(targetX: number, targetY: number){
        
    } 
}