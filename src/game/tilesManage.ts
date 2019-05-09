import { ItilesManage, Itiles, ItilesManageEvent} from '../types/index';
import Tiles from './tiles';
import { Animate } from './Animate';
import { EventsManage } from '../eventsManage/index';
enum AnimateStatus{
    BeforeAnimate = 1,
    InAnimate = 2,
    EndAnimate = 3     
}

export default class TilesManage implements ItilesManage, ItilesManageEvent{
    private collections: Array<Itiles> = [];
    private spaceTilesData: ImageData | null = null;
    readonly step: number; // 单位长度
    readonly em: EventsManage = new EventsManage();
    readonly anim: Animate = new Animate(this.ctx, this.em);
    private optCount: number = 0;
    constructor(
        readonly ctx: CanvasRenderingContext2D,
        readonly img: HTMLImageElement,
        readonly rows: number = 6,
        readonly cols: number = 4
    ){
        this.collections = new Array( rows * cols );
        this.step = this.ctx.canvas.width / cols;
        this.init();
    }
    /**
     * 初始化所有瓦片
     */
    private init() :void{
        for(let i = 0; i < this.rows * this.cols; i++ ) {
            this.collections[i] = new Tiles( this, i );
        }
        this.paint();
        this.shuffle();
    }
    private shuffle(): void{
        let index = -1,
            len = this.collections.length;
        while(++index < len){
            let random = Math.floor(Math.random()*len);
            // this.interchange(this.collections[index], this.collections[random]);
            let tempPosId = this.collections[index].posId,
                tempPosX = this.collections[index].posX,
                tempPosY = this.collections[index].posY;
            this.collections[index].posId = this.collections[random].posId;
            this.collections[index].posX = this.collections[random].posX;
            this.collections[index].posY = this.collections[random].posY;
            this.collections[random].posId = tempPosId;
            this.collections[random].posX = tempPosX;
            this.collections[random].posY = tempPosY;
        }
        this.paint();
    }
    setSpaceTiles(posId: number): void {
        const tiles = this.getTilesByPosId(posId);
        if(tiles){
            this.spaceTilesData = tiles.setSpaceTiles();
        }
    }
    /**
     * 获取空白瓦片
     */
    getSpaceTiles(): Itiles | null{
        return this.collections.find((v: Itiles) => {
            return v.isSpaceTiles === true;
        });
    }
    getSpaceTilesData(): ImageData{
        return this.spaceTilesData;
    }
    
    /**
     * 根据id获取瓦片
     * @param id
     */
    getTilesByPosId(posId: number): Itiles | null{
        let len: number = this.collections.length;
        if(posId < 0 || posId > len - 1) return null; 
        return this.collections.find((v: Itiles)=> {
            return v.posId === posId;
        }) || null;
    }
    
    /**
     * 调用具体的瓦片去各自绘制，此处只是派发任务
     */
    paint(): CanvasRenderingContext2D{
        this.collections.forEach((v: Itiles) => {
            v.paint();
        })
        return this.ctx;
    }
    /**
     * 交换瓦片的位置
     */
    interchange(tiles1: Itiles, tiles2:Itiles): void{
        let tempPosId, tempPosX, tempPosY;
        tempPosId = tiles1.posId;
        tiles1.posId = tiles2.posId;
        tiles2.posId = tempPosId;
        this.anim.run(tiles1, tiles2);
    };

    doUp(): void {
        console.log('doUp');
        if(this.anim.status === AnimateStatus.InAnimate) return;
        let space = this.getSpaceTiles(),
            underSpaceId = space.getBottomTiles(),
            underSpace = this.getTilesByPosId(underSpaceId);
        if(underSpace !== null){
            this.interchange(underSpace, space);
            this.optCount++;
            this.checkComplete();
        }
    }
    doRight(): void {
        console.log('doRight');
        if(this.anim.status === AnimateStatus.InAnimate) return;
        let space = this.getSpaceTiles(),
            leftSpaceId = space.getLeftTiles(),
            leftSpace = this.getTilesByPosId(leftSpaceId);
        if(leftSpace !== null){
            this.interchange(leftSpace, space);
            this.optCount++;
            this.checkComplete();
        }
    }
    doDown(): void {
        console.log('doDown');
        if(this.anim.status === AnimateStatus.InAnimate) return;
        let space = this.getSpaceTiles(),
            topSpaceId = space.getTopTiles(),
            topSpace = this.getTilesByPosId(topSpaceId);
        if(topSpace !== null){
            this.interchange(topSpace, space);
            this.optCount++;
            this.checkComplete();
        }
    }
    doLeft(): void {
        console.log('doLeft');
        if(this.anim.status === AnimateStatus.InAnimate) return;
        let space = this.getSpaceTiles(),
            rightSpaceId = space.getRightTiles(),
            rightSpace = this.getTilesByPosId(rightSpaceId);
        if(rightSpace !== null){
            this.interchange(rightSpace, space);
            this.optCount++;
            this.checkComplete();
        }
    }
    checkComplete(){
        let rs = this.collections.filter((v: Itiles) => {
            return !v.isSpaceTiles;
        }).every((v: Itiles) => {
            return v.id === v.posId;
        })
        if(rs && this.optCount!==0){
            alert(`恭喜您，已完成， 共 ${this.optCount} 步`);
        }
    }
}
