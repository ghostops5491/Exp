module.exports = {
    Dimensions : {
        get : jest.fn( () => ( { width : 10, height : 10 } ) )
    },

    Platform : {
        OS : "ios",
        select : jest.fn()
    },

    StyleSheet : {
        create : jest.fn()
    }
};