import { describe, expect, test } from 'bun:test'
import { Result } from './index'

const goodData = 'good data'
const someWarning = 'some kind of warning'
const someError = 'some kind of error'

describe( 'Successful Result', () => {
    test( 'Result.ok()', () => {
        const result = Result.ok()
        const { data, error, warning } = result

        expect( data ).toMatchObject( {} )
        expect( !!data ).toBe( true )
        expect( 'data' in result ).toBe( true )

        expect( error ).toBe( undefined )
        expect( !!error ).toBe( false )
        expect( 'error' in result ).toBe( false )

        expect( warning ).toBe( undefined )
        expect( !!warning ).toBe( false )
        expect( 'warning' in result ).toBe( false )
    } )

    test( 'Result.ok( goodData )', () => {
        const result = Result.ok( goodData )
        const { data, error, warning } = result

        expect( data ).toBe( goodData )
        expect( !!data ).toBe( true )
        expect( 'data' in result ).toBe( true )

        expect( error ).toBe( undefined )
        expect( !!error ).toBe( false )
        expect( 'error' in result ).toBe( false )

        expect( warning ).toBe( undefined )
        expect( !!warning ).toBe( false )
        expect( 'warning' in result ).toBe( false )
    } )

    test( 'Result( { data: goodData } )', () => {
        const result = Result( { data: goodData } )
        const { data, error, warning } = result

        expect( data ).toBe( goodData )
        expect( !!data ).toBe( true )
        expect( 'data' in result ).toBe( true )

        expect( error ).toBe( undefined )
        expect( !!error ).toBe( false )
        expect( 'error' in result ).toBe( false )

        expect( warning ).toBe( undefined )
        expect( !!warning ).toBe( false )
        expect( 'warning' in result ).toBe( false )
    } )
} )

describe( 'Unsuccessful Result', () => {
    test( 'Result.err( someError )', () => {
        const result = Result.err( someError )
        const { data, error, warning } = result

        expect( data ).toBe( undefined )
        expect( !!data ).toBe( false )
        expect( 'data' in result ).toBe( false )

        expect( error ).toBe( someError )
        expect( !!error ).toBe( true )
        expect( 'error' in result ).toBe( true )

        expect( warning ).toBe( undefined )
        expect( !!warning ).toBe( false )
        expect( 'warning' in result ).toBe( false )
    } )

    test( 'Result( { data: goodData, error: someError } )', () => {
        const result = Result( { data: goodData, error: someError } )
        const { data, error, warning } = result

        expect( data ).toBe( goodData )
        expect( !!data ).toBe( true )
        expect( 'data' in result ).toBe( true )

        expect( error ).toBe( someError )
        expect( !!error ).toBe( true )
        expect( 'error' in result ).toBe( true )

        expect( warning ).toBe( undefined )
        expect( !!warning ).toBe( false )
        expect( 'warning' in result ).toBe( false )
    } )
} )

describe( 'Warning Result', () => {
    test( 'Result.warn( someWarning )', () => {
        const result = Result.warn( someWarning )
        const { data, error, warning } = result

        expect( data ).toBe( undefined )
        expect( !!data ).toBe( false )
        expect( 'data' in result ).toBe( false )

        expect( error ).toBe( undefined )
        expect( !!error ).toBe( false )
        expect( 'error' in result ).toBe( false )

        expect( warning ).toBe( someWarning )
        expect( !!warning ).toBe( true )
        expect( 'warning' in result ).toBe( true )
    } )

    test( 'Result( { data: goodData, warning: someWarning } )', () => {
        const result = Result( { data: goodData, warning: someWarning } )
        const { data, error, warning } = result

        expect( data ).toBe( goodData )
        expect( !!data ).toBe( true )
        expect( 'data' in result ).toBe( true )

        expect( error ).toBe( undefined )
        expect( !!error ).toBe( false )
        expect( 'error' in result ).toBe( false )

        expect( warning ).toBe( someWarning )
        expect( !!warning ).toBe( true )
        expect( 'warning' in result ).toBe( true )
    } )
} )

test( 'Result( { data: goodData, error: someError, warning: someWarning } )', () => {
    const result = Result( { data: goodData, error: someError, warning: someWarning } )
    const { data, error, warning } = result

    expect( data ).toBe( goodData )
    expect( !!data ).toBe( true )
    expect( 'data' in result ).toBe( true )

    expect( error ).toBe( someError )
    expect( !!error ).toBe( true )
    expect( 'error' in result ).toBe( true )

    expect( warning ).toBe( someWarning )
    expect( !!warning ).toBe( true )
    expect( 'warning' in result ).toBe( true )
} )