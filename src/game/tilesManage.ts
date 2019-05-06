import { ItilesManage, Itiles, ItilesManageEvent} from '../types/index';
import Tiles from './tiles';

export default class TilesManage implements ItilesManage, ItilesManageEvent{
    private collections: Array<Itiles> = [];
    private spaceTilesData: ImageData | null = null;
    readonly step: number;
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
    }
    setSpaceTiles(id: number): void {
        const tiles = this.getTilesById(id);
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
    getTilesById(id: number): Itiles | null{
        let len: number = this.collections.length;
        if(id < 0 || id > len - 1) return null; 
        return this.collections.find((v: Itiles)=> {
            return v.id === id;
        }) || null;
    }

    /**
     * 
     * @param ctx 
     */
    paint(): CanvasRenderingContext2D{
        this.collections.forEach((v: Itiles) => {
            v.paint();
        })
        return this.ctx;
    }
    doUp(e: Event): void {

    }
    doRight(e: Event): void {
        
    }
    doDown(e: Event): void {
        
    }
    doLeft(e: Event): void {
        
    }
}
