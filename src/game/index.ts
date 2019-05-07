import { IeventManage } from '../types/index'
import TilesManage from './tilesManage';

export function init(ctx: CanvasRenderingContext2D, img: HTMLImageElement, eventManage: IeventManage){
    const manage = new TilesManage(ctx, img);
    manage.setSpaceTiles(7);
    // 绑定虚拟事件
    eventManage.on('arrowLeft', function(eventId){
        this.doLeft();
    }, manage);
    eventManage.on('arrowRight', function(eventId){
        this.doRight();
    }, manage);
    eventManage.on('arrowTop', function(eventId){
        this.doUp();
    }, manage);
    eventManage.on('arrowBottom', function(eventId){
        this.doDown();
    }, manage);
}
