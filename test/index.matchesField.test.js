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

test('Does nothing if field is present, using field path array.', () => {
    const paramPath = ['asdf', 'foo']
    const paramValue = 123

    const request = {
        body: {
            [paramPath[0]]: {
                [paramPath[1]]: paramValue,
            },
        },
    }

    try {
        matchesField(paramPath, paramValue, request)
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

test('Throws exception if field is not present, using field path array.', () => {
    const paramPath = ['asdf', 'foo']
    const paramValue = 123

    const request = {
        body: {
            [paramPath[0]]: {
                [paramPath[1]]: paramValue,
            },
        },
    }

    expect(() => matchesField([paramPath[0], paramPath[1] + 'AAA'], paramValue, request))
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

test('Throws exception if value does not match, using field path array.', () => {
    const paramPath = ['asdf', 'foo']
    const paramValue = 123

    const request = {
        body: {
            [paramPath[0]]: {
                [paramPath[1]]: paramValue,
            },
        },
    }

    expect(() => matchesField(paramPath, paramValue + 'AAA', request))
        .toThrow()
})
