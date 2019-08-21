import {hasError} from '../esm/'

test('Does nothing if error is present.', () => {
    const codeName = 'the-error'

    const request = {
        body: {
            errors: [
                {
                    code: codeName,
                },
            ],
        },
    }

    try {
        hasError(codeName, request)
    }
    catch(_) {
        throw Error('Excepted to find error code in response. Did not.')
    }
})

test('Throws exception if error is not present.', () => {
    const codeName = 'the-error'

    const request = {
        body: {
            errors: [
                {
                    code: codeName,
                },
            ],
        },
    }

    expect(() => hasError(codeName + 'AAA', request))
        .toThrow()
})
