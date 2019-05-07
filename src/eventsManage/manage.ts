import { IeventManage, IeventHandle } from '../types/index';
/**
 * 事件管理器：
 * 抽象事件管理，目的是与dom解耦
 * @author lijianwei
 */
export class EventsManage implements IeventManage{

    private bus: { [prop: string]: Array<IeventHandle> } = Object.create(null);
    private handleId: number = 0;
    /**
     * 注册指定事件
     * @param eventName 注册监听事件的名称
     * @param handle 事件句柄
     * @param thisArg 事件句柄调用时this的指向
     * @param payLoad 注册监听事件时携带的参数 
     * @return 返回事件句柄的id
     */
    on(eventName: string, handle: (eventId: number, ...arg: any[])=> void, thisArg: object | null = null, ...payLoad: any[]): number{
        let handleObj: IeventHandle = {
            id: this.handleId++,
            handle: handle,
            thisArg: thisArg,
            param: payLoad
        }
        if(!(eventName in this.bus)){
            this.bus[eventName] = [];
        }
        this.bus[eventName].push(handleObj);
        return handleObj.id;
    }
    /**
     * 取消指定id的监听
     * @param eventName 事件名称
     * @param handleId 要取消注册的时间句柄id，如果不指定，则清空 <eventName>指向的句柄队列
     */
    off(eventName: string, handleId?: number): void{
        if(eventName in this.bus){
            if(handleId !== undefined){
                let index = this.bus[eventName].findIndex((v: IeventHandle)=> {
                    return v.id === handleId;
                })
                if(index !== -1){
                    this.bus[eventName].splice(index, 1);
                }
            }else{
                this.bus[eventName] = []
            }
        }
    }
    /**
     * 触发事件
     * @param eventName 事件名称
     * @param payLoad 事件触发时需要的参数
     */
    trigger(eventName: string, ...payLoad: any[]): void{
        if(eventName in this.bus){
            this.bus[eventName].forEach((v:IeventHandle) => {
                let param = payLoad.concat(v.param);
                param.unshift(v.id);
                v.handle.call(v.thisArg, ...param);
            });
        }
    }
}