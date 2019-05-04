export function init(fn: ()=> void){
    window.onload = function(){
        fn();
    }
}

export default {
    init
}