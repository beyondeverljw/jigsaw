export interface IeventHandle{
    id: number;
    handle: (eventId: number, ...rest: any[]) => void;
    thisArg: object | null;
    param: any[]
}
export interface IdomKeyboardEvent{
    keycode: number,
    eventName: string,
    manage: IeventManage,
    triggerPayLoad: any []
}
/**
 * 抽象事件管理，用于与dom事件解耦
 */
export interface IeventManage {
    on: (eventName: string, handle: (eventId: number, ...arg: any[])=> void, thisArg: object | null, ...rest: any[]) => number;
    off: (eventName: string, handleId?: number) => void;
    trigger: (eventName: string, ...payLoad: any[]) => void;
}
/**
 * 所有绘画类需要实现的接口
 */
export interface Painter{
    ctx: CanvasRenderingContext2D;
    paint(): CanvasRenderingContext2D;
}

/**
 * jigsaw游戏需要实现的方法
 */
export interface ItilesManageEvent{
    doUp: (e: Event) => void;
    doRight: (e: Event) => void;
    doDown: (e: Event) => void;
    doLeft: (e: Event) => void;
}
/**
 * 瓦片（每一个方格）
 * ctx
 * img
 * step: 瓦片的宽高单位
 * id: 瓦片的标识
 * posId: 瓦片的位置标识
 * posX: 瓦片的左上角水平坐标
 * posY: 瓦片的左上角垂直坐标
 * angle: 瓦片的旋转角度
 */
export interface Itiles extends Painter {
    readonly manage: ItilesManage;
    readonly id: number;
    angle: number;
    posId: number;
    posX: number;
    posY: number;
    isSpaceTiles: Boolean;
    getTopTiles(): Itiles | null;
    getRightTiles(): Itiles | null;
    getBottomTiles(): Itiles | null;
    getLeftTiles(): Itiles | null;
    interchange(tiles: Itiles): void;
    setSpaceTiles(): ImageData;
}

/**
 * 瓦片管理器
 * rows: 拼图容器的行数
 * cols: 拼图容器的列数
 * img
 */
export interface ItilesManage extends Painter {
    readonly img: HTMLImageElement;
    readonly rows: number;
    readonly cols: number;
    readonly step: number;
    getTilesById(id: number): Itiles | null;
    setSpaceTiles(id: number): void;
    getSpaceTiles(): Itiles | null;
    getSpaceTilesData(): ImageData
}