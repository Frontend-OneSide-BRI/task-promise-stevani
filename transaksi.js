const user = [
    {id: 1, username: "lala", address: "Jakarta"},
    {id: 2, username: "lili", address: "Surabaya"}
];

const transaction = [
    {
        user_id: 1, 
        transaction: [
            {id: 1, status: "Selesai"},
            {id: 2, status: "Sedang Dikirim"}
        ],
    },
    {
        user_id: 2, 
        transaction: [
            {id: 1, status: "Selesai"},
            {id: 2, status: "Dibatalkan"}
        ],
    },
];

const detailTransaction = [
    {id: 1, productName: "Kopi Hitam", qty: 3, totalAmount: 3000},
    {id: 2, productName: "Kopi Susu", qty: 1, totalAmount: 5000},
]

// Pengunaan Callback
function login(username, callback) {
    setTimeout(() => {
        let filterData = user.filter((e) => e.username === username);
        callback(filterData[0]);
    }, 1000);
}

function getTransaction(userId, callback) {
    setTimeout(() => {
        let filterData = transaction.filter((e) => e.user_id === userId);
        return callback(filterData[0]);
    }, 1000);
}

function getDetailTransaction(transactionId){
    setTimeout(() => {
        let filterData = detailTransaction.filter((e) => e.id === transactionId);
        console.log(filterData[0]);
    }, 1000)
}

login("lala", (res) => {
    console.log(res);
    getTransaction(res.id, (transaction) => {
        console.log(transaction);
        const transactionId = transaction.transaction[0].id;
        getDetailTransaction(transactionId);
    });
});

// Pengunaan Promise 
function login(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        let filterData = user.filter((e) => e.username === username); 
        if (filterData.length > 0) {
            resolve(filterData[0]);
          } else {
            reject("error");
          }
        }, 1000);
    });
}

function getTransaction(userId) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        let filterData = transaction.filter((e) => e.user_id === userId); 
        if (filterData.length > 0) {
            resolve(filterData[0]);
          } else {
            reject("error");
          }
        }, 1000);
    });
}


function getDetailTransaction (transactionId) { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let filterData = detailTransaction.filter((e) => e.id === transactionId); 
            if (filterData.length > 0) {
                resolve(filterData[0]);
              } else {
                reject("error");
              }
        }, 1000);
    });
}

console.log("Mulai Proses");
login("lala").
    then((user) => { 
        console.log(user);
        return getTransaction (user.id)
    .then((user) => {
        console.log(user);
        const transactionId = user.transaction[0].id;
        getDetailTransaction(transactionId)
    .then((user) => console.log(user))
    .catch(err => {
        console.log(err.message);
    });
    });
});

//Pengunaan Async Await
async function getManyData() {
      const tryLogin = await login("lala");
      console.log(tryLogin);
      const dataTransaction = await getTransaction(tryLogin.id);
      console.log(dataTransaction);
      const detailTransaction = await getDetailTransaction(dataTransaction.transaction[0].id);
      console.log(detailTransaction);
  }
  
  getManyData();
  