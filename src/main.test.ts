import { expect, test } from 'bun:test'
import Result from './index'

const goodValue = 'good value'
const warning = 'some kind of warning'
const error = 'some kind of error'

test( 'Result.ok', () => {
    const result = Result.ok( goodValue )
    expect( result.success ).toBe( true )
    expect( result.type ).toBe( 'ok' )
    expect( result.value ).toBe( goodValue )

    expect( Result.get( 'value' )( result ) ).toBe( goodValue )
    expect( Result.get( 'warning' )( result ) ).toBe( undefined )
    expect( Result.get( 'error' )( result ) ).toBe( undefined )
} )

test( 'Result.ok with no value', () => {
    const result = Result.ok()
    expect( result.success ).toBe( true )
    expect( result.type ).toBe( 'ok' )
    expect( result.value ).toBe( undefined )

    expect( Result.get( 'value' )( result ) ).toBe( undefined )
    expect( Result.get( 'warning' )( result ) ).toBe( undefined )
    expect( Result.get( 'error' )( result ) ).toBe( undefined )
} )

test( 'Result.warn', () => {
    const result = Result.warn( warning )
    expect( result.success ).toBe( true )
    expect( result.type ).toBe( 'warning' )
    expect( result.warning ).toBe( warning )

    expect( Result.get( 'value' )( result ) ).toBe( undefined )
    expect( Result.get( 'warning' )( result ) ).toBe( warning )
    expect( Result.get( 'error' )( result ) ).toBe( undefined )
} )

test( 'Result.valueAndWarning', () => {
    const result = Result.valueAndWarning( goodValue, warning )
    expect( result.success ).toBe( true )
    expect( result.type ).toBe( 'valueAndWarning' )
    expect( result.value ).toBe( goodValue )
    expect( result.warning ).toBe( warning )

    expect( Result.get( 'value' )( result ) ).toBe( goodValue )
    expect( Result.get( 'warning' )( result ) ).toBe( warning )
    expect( Result.get( 'error' )( result ) ).toBe( undefined )
} )

test( 'Result.error', () => {
    const result = Result.error( error )
    expect( result.success ).toBe( false )
    expect( result.type ).toBe( 'error' )

    expect( Result.get( 'value' )( result ) ).toBe( undefined )
    expect( Result.get( 'warning' )( result ) ).toBe( undefined )
    expect( Result.get( 'error' )( result ) ).toBe( error )
} )