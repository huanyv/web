

// setTimeout(() => {
//     console.log("河北省");
//     setTimeout(() => {
//         console.log("河北省沧州市");
//         setTimeout(() => {
//             console.log("河北省沧州市水电学院");
//         },1000)
//     },1000)
// },1000)



new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("河北省");
        resolve("河北省")
    },1000)

}).then(res => {

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(res + "沧州市");
            resolve(res + "河北省")
        },1000)
    })   

}).then(res => {

    setTimeout(() => {
        console.log(res + "水电学院");
    },1000)
})
