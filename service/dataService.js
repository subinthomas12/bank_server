
// import JWT
const jwt = require("jsonwebtoken")

userDetails = {
    1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transactions: [] },
    1001: { username: "amal", acno: 1001, password: "abc1231", balance: 0, transactions: [] },
    1002: { username: "arun", acno: 1002, password: "abc1232", balance: 0, transactions: [] },
    1003: { username: "mega", acno: 1003, password: "abc1233", balance: 0, transactions: [] },

}

register = (acno, uname, psw) => {

    if (acno in userDetails) {
        return {
            status: false,
            message: "User Already Present",
            statusCode: 404
        }
    }
    else {
        userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transactions: [] }
        return {
            status: true,
            message: "Registered",
            statusCode: 200
        }
    }
}


login = (acno, psw) => {
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            // store current user
            currentUser = userDetails[acno]["username"]
            currentAcno = acno

            // token creation
            const token = jwt.sign({ acno }, "superkey")

            return {
                status: true,
                message: "Login Success",
                statusCode: 200,
                currentUser,
                currentAcno,
                token
            }
        }
        else {
            return {
                status: false,
                message: "Incorrect Password",
                statusCode: 404
            }
        }
    }
    else {
        return {
            status: false,
            message: "Not Register Yet",
            statusCode: 404
        }
    }
}


deposit = (acno, psw, amnt) => {
    // to convert string amnt to int
    var amount = parseInt(amnt)

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            userDetails[acno]["balance"] += amount

            // add transaction data

            userDetails[acno]["transactions"].push(
                {
                    Type: "Credit",
                    Amount: amnt
                }
            )

            return {
                status: true,
                message: `Your AC has been credited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
                statusCode: 200
            }

        }
        else {
            return {
                status: false,
                message: "Incorrect Password",
                statusCode: 404
            }
        }
    }
    else {
        return {
            status: false,
            message: "Incorrect AC number",
            statusCode: 404
        }
    }
}


withdraw = (acno, psw, amnt) => {

    var amount = parseInt(amnt)

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            if (amount <= userDetails[acno]["balance"]) {
                userDetails[acno]["balance"] -= amount


                // add transaction data

                userDetails[acno]["transactions"].push(
                    {
                        Type: "Debit",
                        Amount: amount
                    }
                )

                return {
                    status: true,
                    message: `Your account has been debited with the amount ${amount} and the remaining balance is ${userDetails[acno]["balance"]}`,
                    statusCode: 200
                }
            }
            else {

                return {
                    status: true,
                    message: "Insufficent Balance",
                    statusCode: 400
                }
            }
        }
        else {
            return {
                status: false,
                message: "Incorrect Password",
                statusCode: 400
            }
        }
    }
    else {
        return {
            status: false,
            message: "Incorrect AC number",
            statusCode: 400
        }
    }

}


getTransaction = (acno) => {
    return {
        status: true,
        transaction: userDetails[acno].transactions,
        statusCode: 200
    }
}

// export
module.exports = {
    register, login, deposit, withdraw, getTransaction
}