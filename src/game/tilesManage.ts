import { ItilesManage, Itiles } from '../types/index';

export default class TilesManage implements ItilesManage{
    private collections: Array<Itiles> = [];
    constructor(tilesCount?: number){
        if(tilesCount !== undefined){
            this.collections = new Array(tilesCount);
        }
    }
    /**
     * 检测要添加进集合的数据是否在集合中已经存在
     * @param item
     */
    private checkIdHasRepeat(item: Itiles): boolean{
        if(this.collections.length === 0){
            return false;
        }else{
            return this.collections.some((v: Itiles) => {
                return v.id === item.id;
            });
        }
    }
    /**
     * 将瓦片添加进管理器
     * @param item
     */
    add(item: Itiles): boolean{
        let hasRepeat: boolean = this.checkIdHasRepeat(item);
        if( hasRepeat === true ){
            return false;
        }else{
            this.collections[item.id] = item;
            return true;
        }
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
    paint(ctx: CanvasRenderingContext2D){
        let i = 0;
        this.collections.forEach((v: Itiles) => {
            console.log(i++);
            v.paint(ctx);
            
        })
        return ctx;
    }
}
