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
