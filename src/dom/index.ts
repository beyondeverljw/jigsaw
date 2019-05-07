import { IeventManage, IdomKeyboardEvent } from '../types/index';
let keyBoardEventTasks: Array<IdomKeyboardEvent> = [];

export function loadDom(){
    return new Promise((resolve, reject) => {
        window.onload = function(){
            resolve('success');
            window.addEventListener('keydown', function(e){
                let rs = keyBoardEventTasks.find((v:IdomKeyboardEvent) => {
                    return v.keycode === e.keyCode;
                });
                if(rs !== undefined){
                    rs.manage.trigger(rs.eventName, ...rs.triggerPayLoad);
                }else{
                    console.log('事件未监听' + e.keyCode);
                }
            })
        }
    })
}
export function loadImage(src: string){
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.onerror = function(e){
            reject(e);
        }
        img.src = src;
    });
}

export function bindKeyboard(keycode: number, eventName: string, manage: IeventManage, ...triggerPayLoad: any[]){
    keyBoardEventTasks.push({
        keycode,
        eventName,
        manage,
        triggerPayLoad
    });
}