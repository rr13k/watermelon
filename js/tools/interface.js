class Interface {
    constructor(name, method) {
        if (arguments.length != 2) {
            throw new Error('两个参数：name method');
        }
        this.name = name;
        this.method = [];
        for (let i in method) {
            if (typeof method[i] != 'string') {
                throw new Error('method 必须是字符串');
            }
            this.method.push(method[i]);
        }
    }
    //检查接口方法
    static ensureImplements(obj) {
        if (arguments.length < 2) {
            throw new Error('参数小于两个');
        }

        for (let i = 1; i < arguments.length; i++) {
            var instanceInterface = arguments[i];
            if (instanceInterface.constructor !== Interface) {
                throw new Error('你要检查的参数不属于Interface接口')
            }

            for (let j in instanceInterface.method) {
                let methodName = instanceInterface.method[j];
                if (!obj[methodName] || typeof obj[methodName] !== 'function') {
                    throw new Error(`请实现接口的${methodName}方法`)
                }
            }
        }
    }
}

exports.Interface = Interface