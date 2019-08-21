import {matchesField} from '../esm/'

test('Does nothing if field is present.', () => {
    const paramName = 'asdf'
    const paramValue = 123

    const request = {
        body: {
            [paramName]: paramValue,
        },
    }

    try {
        matchesField(paramName, paramValue, request)
    }
    catch(_) {
        throw Error('Excepted to find field matching value in response. Did not.')
    }
})

test('Throws exception if field is not present.', () => {
    const paramName = 'asdf'
    const paramValue = 123

    const request = {
        body: {
            [paramName]: paramValue,
        },
    }

    expect(() => matchesField(paramName + 'AAA', paramValue, request))
        .toThrow()
})

test('Throws exception if value does not match.', () => {
    const paramName = 'asdf'
    const paramValue = 123

    const request = {
        body: {
            [paramName]: paramValue,
        },
    }

    expect(() => matchesField(paramName, paramValue + 'AAA', request))
        .toThrow()
})
