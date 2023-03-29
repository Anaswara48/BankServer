const jwt = require("jsonwebtoken")
const db = require("./db")
userDetails = {
    1000: { usename: "anu", acno: 1000, password: "abc123", balance: 0, transactions: [] },
    1001: { usename: "amal", acno: 1001, password: "abc123", balance: 0, transactions: [] },
    1002: { usename: "anju", acno: 1002, password: "abc123", balance: 0, transactions: [] },
    1003: { usename: "arun", acno: 1003, password: "abc123", balance: 0, transactions: [] },
    1004: { usename: "arul", acno: 1004, password: "abc123", balance: 0, transactions: [] }

}

register = (acno, uname, psw) => {
    // store the resolved output of findonr in a variable user
    db.User.findOne({ acno }).then(user => {
        // if acno present in db then get the object of that user else null response
        if (user) {
            return {
                staus: false,
                message: "user already present",
                statusCode: 404
            }
        }
        else {

        }
    })
    if (acno in userDetails) {
        return {
            staus: false,
            message: "user already present",
            statusCode: 404
        }
    }
    else {
        userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transactions: [] }
        return {
            staus: true,
            message: "registered",
            statusCode: 200
        }
    }

}

login = (acno, psw) => {
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            //store currentuser
            currentUser = userDetails[acno]["username"]

            currentAcno = acno
            // token generation
            const token = jwt.sign({ acno }, "tokenkey")

            return {
                staus: true,
                message: "login success",
                statusCode: 200,
                currentUser,
                currentAcno,
                token

            }
        }
        else {
            return {
                staus: false,
                message: "incorrect password",
                statusCode: 404
            }

        }
    }
    else {
        return {
            staus: false,
            message: "not registered yet",
            statusCode: 404
        }
    }
}

deposit = (acno, psw, amnt) => {
    var amount = parseInt(amnt)

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            userDetails[acno]["balance"] += amount
            //add transaction data
            userDetails[acno]["transactions"].push({ Type: "credit", Amount: amount })
            return {
                staus: true,
                message: `your acc have been credited with amount ${amount}
                 and the balance is ${userDetails[acno]["balance"]}`,
                statusCode: 200,

            }
        }

        else {
            return {
                staus: false,
                message: "incorrect password",
                statusCode: 404
            }
        }
    }
    else {
        return {

            staus: false,
            message: "incorrect acno",
            statusCode: 404
        }
    }
}

withdraw = (acno, psw, amnt) => {
    //to convert string amnt to int
    var amount = parseInt(amnt)


    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            if (amount <= userDetails[acno]["balance"]) {
                userDetails[acno]["balance"] -= amount
                // console.log(userDetails);
                //add transaction data
                userDetails[acno]["transactions"].push({ Type: "Debit", Amount: amnt })

                return {
                    staus: true,
                    message: `your acc have been debited with amount ${amount}
                 and the balance is ${userDetails[acno]["balance"]}`,
                    statusCode: 200,

                }
            }

            else {
                return {

                    staus: false,
                    message: "insufficient balance",
                    statusCode: 404
                }
            }
        }
        else {
            return {

                staus: false,
                message: "incorrect password",
                statusCode: 404
            }
        }
    }

    else {
        return {

            staus: false,
            message: "incorrect acno",
            statusCode: 404
        }
    }
}
getTransaction = (acno) => {
    return {
        staus: true,
        transaction: userDetails[acno].transactions,
        statusCode: 200,

    }
}








module.exports = {
    register, login, deposit, withdraw, getTransaction
}
