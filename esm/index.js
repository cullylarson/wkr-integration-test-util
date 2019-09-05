const {curry, get, has, liftA} = require('@cullylarson/f')
const {createPool} = require('mysql2')

const Pool = (host, user, password, database, port) => {
    let pool

    return {
        get: () => {
            if(pool) return pool

            pool = createPool({
                host,
                user,
                password,
                database,
                port,
            })

            return pool
        },

        release: () => {
            if(!pool) return Promise.resolve()

            return new Promise((resolve, reject) => {
                pool.end(err => {
                    if(err) return reject(err)

                    pool = null
                    resolve()
                })
            })
        },
    }
}

// can be passed to request.expect. will check if a response error exists
const hasError = curry((errorCode, res) => {
    const errors = get('errors', [], res.body)

    if(!Array.isArray(errors)) throw Error(`Does not have error code [${errorCode}] because no errors in response.`)

    const codes = errors.map(get('code', undefined)).filter(x => !!x)

    if(!codes.includes(errorCode)) throw Error(`Does not have error code [${errorCode}]. Found these codes: [${codes.join(', ')}]`)
})

const hasParamError = curry((paramName, errorCode, res) => {
    const errors = get(['paramErrors', ...liftA(paramName)], [], res.body)

    if(!Array.isArray(errors)) throw Error(`Does not have param [${paramName}] error code [${errorCode}] because no errors for that parameter.`)

    const codes = errors.map(get('code', undefined)).filter(x => !!x)

    if(!codes.includes(errorCode)) throw Error(`Does not have param [${paramName}] error code [${errorCode}]. Found these codes for that param: [${codes.join(', ')}]`)
})

// can be passed to request.expect. will check if field present in response body and is not empty
// Field just be present, but can have any value (except undefined)
const hasField = curry((fieldName, res) => {
    if(get(fieldName, undefined, res.body) === undefined) throw Error(`Did not find field [${fieldName}] in response body.`)
})

// can be passed to request. checks of field is present and set to the provided value
const matchesField = curry((fieldName, fieldValue, res) => {
    const foundValue = get(fieldName, undefined, res.body)
    if(foundValue !== fieldValue) throw Error(`Field [${fieldName}] does not match [${fieldValue}] in response body. Found [${foundValue}].`)
})

// can be passed to request. make sure does not have field
const notHasField = curry((fieldName, res) => {
    if(has(fieldName, res.body)) throw Error(`Found field [${fieldName}] that should not be present in response body.`)
})

const resReport = curry((paramPath, res) => {
    console.log(get(paramPath, undefined, res))
    return res
})

module.exports = {
    Pool,
    hasError,
    hasParamError,
    hasField,
    matchesField,
    notHasField,
    resReport,
}
