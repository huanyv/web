

// 箭头函数的 this 指向

function call(fn) {
    name = "lisi";
    fn()
}

/*
	普通函数中 this 指向的是函数的调用者
	箭头函数的 this 指向上下文对象
*/

var person = {
	name: "zhangsan",
	log:function() {
        call(() => {
            //箭头函数输出 zhangsan
            //普通函数输出 lisi
            console.log(this.name);
        })
    },
};

person.log()


