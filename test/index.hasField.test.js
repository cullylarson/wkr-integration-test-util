import {hasField} from '../esm/'

test('Does nothing if field is present.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: 1,
        },
    }

    try {
        hasField(paramName, request)
    }
    catch(_) {
        throw Error('Excepted to find field in response. Did not.')
    }
})

test('Does nothing if field is present but false.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: false,
        },
    }

    try {
        hasField(paramName, request)
    }
    catch(_) {
        throw Error('Excepted to find field in response. Did not.')
    }
})

test('Does nothing if field is present but empty string.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: '',
        },
    }

    try {
        hasField(paramName, request)
    }
    catch(_) {
        throw Error('Excepted to find field in response. Did not.')
    }
})

test('Throws exception if field is not present.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: 1,
        },
    }

    expect(() => hasField(paramName + 'AAA', request))
        .toThrow()
})
