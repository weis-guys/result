import { expect, test } from 'bun:test'
import Result from './index'

const okResult = Result.ok( 'good value' )
// { success: true, value: "good value"  }

const warningResult = Result.okWithWarning( 'good value', 'some kind of warning' )
// { success: true, value: "good value", warning: "some kind of warning" }

const errorResult = Result.error( 'some kind of error' )
// { success: false, error: "some kind of error" }

/**
 * this function could return a value or an error
 */
function someFn () {
    const items = [ okResult, warningResult, errorResult ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const result = someFn()
console.log( { result } )

test( 'Result.getValue', () => {
    expect( Result.getValue( result ) )
        .toBe( result.success ? result.value : undefined )
} )

test( 'Result.getWarning', () => {
    expect( Result.getWarning( result ) )
        .toBe( result.success ? result.warning : undefined )
} )

test( 'Result.getError', () => {
    expect( Result.getError( result ) )
        .toBe( result.success ? undefined : result.error )
} )