import {notHasField} from '../esm/'

test('Does nothing if field is not present.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: 1,
        },
    }

    try {
        notHasField(paramName + 'AAA', request)
    }
    catch(_) {
        throw Error('Excepted to not find field in response. But it was found.')
    }
})

test('Throws exception if field is present.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: 1,
        },
    }

    expect(() => notHasField(paramName, request))
        .toThrow()
})

test('Throws exception if field is present and undefined.', () => {
    const paramName = 'asdf'

    const request = {
        body: {
            [paramName]: undefined,
        },
    }

    expect(() => notHasField(paramName, request))
        .toThrow()
})
