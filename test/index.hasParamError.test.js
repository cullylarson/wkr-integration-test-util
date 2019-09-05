import {hasParamError} from '../esm/'

test('Does nothing if error is present.', () => {
    const codeName = 'the-error'
    const paramName = 'asdf'

    const request = {
        body: {
            paramErrors: {
                [paramName]: [
                    {
                        code: codeName,
                    },
                ],
            },
        },
    }

    try {
        hasParamError(paramName, codeName, request)
    }
    catch(_) {
        throw Error('Excepted to find error code in response. Did not.')
    }
})

test('Finds a param using a param path array.', () => {
    const codeName = 'the-error'
    const paramPath = ['asdf', 'foo', 'halfs']

    const request = {
        body: {
            paramErrors: {
                [paramPath[0]]: {
                    [paramPath[1]]: {
                        [paramPath[2]]: [
                            {
                                code: codeName,
                            },
                        ],
                    },
                },
            },
        },
    }

    try {
        hasParamError(paramPath, codeName, request)
    }
    catch(_) {
        throw Error('Excepted to find error code in response. Did not.')
    }
})

test('Throws exception if error is not present.', () => {
    const codeName = 'the-error'
    const paramName = 'asdf'

    const request = {
        body: {
            paramErrors: {
                [paramName]: [
                    {
                        code: codeName,
                    },
                ],
            },
        },
    }

    expect(() => hasParamError(paramName, codeName + 'AAA', request))
        .toThrow()
})

test('Throws exception if error not present using using a param path array.', () => {
    const codeName = 'the-error'
    const paramPath = ['asdf', 'foo', 'halfs']

    const request = {
        body: {
            paramErrors: {
                [paramPath[0]]: {
                    [paramPath[1]]: {
                        [paramPath[2]]: [
                            {
                                code: codeName,
                            },
                        ],
                    },
                },
            },
        },
    }

    expect(() => hasParamError(paramPath, codeName + 'AAA', request))
        .toThrow()
})

test('Throws exception if param is not present.', () => {
    const codeName = 'the-error'
    const paramName = 'asdf'

    const request = {
        body: {
            paramErrors: {
                [paramName]: [
                    {
                        code: codeName,
                    },
                ],
            },
        },
    }

    expect(() => hasParamError(paramName + 'AAA', codeName, request))
        .toThrow()
})
