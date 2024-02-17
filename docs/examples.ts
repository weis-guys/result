import Result from '@weis-guys/result'

const okResult = Result.ok( 'good value' )
// { success: true, value: "good value"  }

const warningResult = Result.okWithWarning( 'good value', 'some kind of warning' )
// { success: true, value: "good value", warning: "some kind of warning" }

const errorResult = Result.error( 'some kind of error' )
// { success: false, error: "some kind of error" }

/**
 * this function could return a value, an error, or a value with a warning
 */
function someFn () {
    const items = [ okResult, warningResult, errorResult ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const result = someFn()
console.log( { result } )

if ( result.success ) {
    console.log( result.value )
    // 'good value'

    result.warning && console.warn( result.warning )
    // 'some kind of warning'
} else {
    console.error( result.error )
    // 'some kind of error'
}

const value = Result.getValue( result )
console.log( value )
// 'good value' | undefined

const warning = Result.getWarning( result )
console.log( warning )
// 'some kind of warning' | undefined

const error = Result.getError( result )
console.log( error )
// 'some kind of error' | undefined