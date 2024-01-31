import { expect, test } from 'bun:test'
import { Result } from './lib'

function getResult () {
    const happy = Result.ok( 42 )
    const sad = Result.err( 'message' )
    const result = Math.random() > 0.5 ? happy : sad
    return result satisfies Result.Either<typeof sad.error, typeof happy.value>
}

const result = getResult()

// console.log( { result } )

test( 'result should make Result Type', () => {
    if ( result.success ) {
        expect( result ).toMatchObject( {
            success: true,
            value: result.value,
        } )
    } else {
        expect( result ).toMatchObject( {
            success: false,
            error: result.error,
        } )
    }
} )

test( 'Result.match should allow ok and err callbacks', () => {
    const foo = Result.match( result )( {
        ok: value => value,
        err: error => error,
    } )
    if ( result.success ) expect( foo ).toBe( result.value )
    else expect( foo ).toBe( result.error )
} )

test( 'Result.match should allow just ok callback', () => {
    const foo = Result.match( result )( {
        ok: value => value,
    } )
    if ( result.success ) expect( foo ).toBe( result.value )
} )

test( 'Result.match should allow just err callback', () => {
    const foo = Result.match( result )( {
        err: error => error,
    } )
    if ( !result.success ) expect( foo ).toBe( result.error )
} )