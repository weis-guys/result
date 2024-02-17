import { expect, test } from 'bun:test'
import { Result } from './index'

const ok = Result.ok( 'good value' )
// { type: 'ok', value: 'good value' }

const warning = Result.warning( 'some kind of warning' )
// { type: 'warning', value: 'some kind of warning' }

const error = Result.error( 'some kind of error' )
// { type: 'error', value: 'some kind of error' }

/**
 * this function could return a value or an error
 */
function someFn () {
    const items = [ ok, warning, error ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const result = someFn()
console.log( { result } )

const matched = Result.match( result )( {
    ok: value => 42,
    warning: warning => 'warning',
    error: error => 'error',
} )
console.log( { matched } )

const matched2 = Result.match( result )( {} )

// switch ( result.type ) {
//     case 'ok':
//         console.log( result.value )
//         // 'good value'
//         break
//     case 'warning':
//         console.warn( result.value )
//         // 'some kind of warning'
//         break
//     case 'error':
//         console.error( result.value )
//         // 'some kind of error'
//         break
// }


// test( 'result should make Result Type', () => {
//     expect( result ).toMatchObject( {
//         type: result.type,
//         value: result.value,
//     } )
// } )

// test( 'Result.match should allow ok and err callbacks', () => {
//     const foo = Result.match( result )( {
//         ok: value => value,
//         err: error => error,
//     } )
//     if ( result.success ) expect( foo ).toBe( result.value )
//     else expect( foo ).toBe( result.error )
// } )

// test( 'Result.match should allow just ok callback', () => {
//     const foo = Result.match( result )( {
//         ok: value => value,
//     } )
//     if ( result.success ) expect( foo ).toBe( result.value )
// } )

// test( 'Result.match should allow just err callback', () => {
//     const foo = Result.match( result )( {
//         err: error => error,
//     } )
//     if ( !result.success ) expect( foo ).toBe( result.error )
// } )