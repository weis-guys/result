import { expect, test } from 'bun:test'
import { Result } from './index'

const goodValue = 'good value'
const warning = 'some kind of warning'
const error = 'some kind of error'

const okResult = Result.ok( goodValue )
// { success: true, value: "good value"  }

const warningResult = Result.warn( warning )
// { success: true, warning: "some kind of warning" }

const valueAndWarningResult = Result.valueAndWarning( goodValue, warning )
// { success: true, value: "good value", warning: "some kind of warning" }

const errorResult = Result.error( error )
// { success: false, error: "some kind of error" }

/**
 * this represents a function that could return a value, an error, or a warning
 */
function someFn () {
    const items = [
        okResult,
        warningResult,
        valueAndWarningResult,
        errorResult,
    ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const result = someFn()
// console.log( { result } )

test( `Result.get( 'value' )`, () => {
    expect( Result.get( 'value' )( result ) ).toBe(
        result.type == 'ok' || result.type == 'valueAndWarning' ? result.value : undefined
    )
} )

test( `Result.get( 'warning' )`, () => {
    expect( Result.get( 'warning' )( result ) ).toBe(
        result.type == 'warning' || result.type == 'valueAndWarning' ? result.warning : undefined
    )
} )

test( `Result.get( 'error' )`, () => {
    expect( Result.get( 'error' )( result ) ).toBe(
        result.success ? undefined : result.error
    )
} )