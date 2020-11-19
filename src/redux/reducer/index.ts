//定义初始化变量
let currentState = {
    bottomPlayerVisible: false,//底部的播放器是否展示
    songId: "",//歌曲id
};

interface Action {
    type?: string,
    visible?: boolean,
    id?: string
}

function reducer(state = currentState, action: Action) {
    switch (action.type) {
        case 'SHOW_BOTTOM_PLAYER':
            const {bottomPlayerVisible} = state;
            return {
                bottomPlayerVisible: action.visible,
                songId: action.id
            };

        default:
            return state;
    }
}

export {reducer};
