import { Result } from '@weis-guys/result'

console.log( Result.ok( 'good data' ) )
// { data: "good data" }

console.log( Result( { data: 'good data' } ) )
// { data: "good data" }

console.log( Result.ok() )
// { data: {} }

console.log( Result.err( 'some kind of error' ) )
// { error: "some kind of error" }

console.log( Result.warn( 'some kind of warning' ) )
// { warning: "some kind of warning" }

console.log( Result( { data: 'good data', warning: 'some kind of warning' } ) )
// { data: "good data", warning: "some kind of warning" }

console.log( Result( { data: 'good data', error: 'some kind of error' } ) )
// { data: "good data", error: "some kind of error" }

console.log( Result( { data: 'good data', error: 'some kind of error', warning: 'some kind of warning' } ) )
// { data: "good data", error: "some kind of error", warning: "some kind of warning" }

/**
 * this function returns some kind of result that isn't known until runtime
 */
function someFn () {
    const items = [
        Result.ok( 'good data' ),
        Result.err( 'some kind of error' ),
        Result.warn( 'some kind of warning' ),
        Result( { data: 'good data', warning: 'some kind of warning' } ),
    ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const { data, error, warning } = someFn()

if ( data ) {
    console.log( data )
    // 'good data'
}

if ( warning ) {
    console.log( warning )
    // 'some kind of warning'
}

if ( error ) {
    console.log( error )
    // 'some kind of error'
}