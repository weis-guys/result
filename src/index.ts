export type Result<Data = undefined, Error = undefined, Warning = undefined> = {
    data: Data
    error: Error
    warning: Warning
}

/**
 * return a result with the given data, error, and/or warning
 */
export function Result<
    const R extends Partial<{
        data: unknown
        error: unknown
        warning: unknown
    }>,
> ( result: R ) {
    type Data = unknown extends R[ 'data' ] ? undefined : R[ 'data' ]
    type Error = unknown extends R[ 'error' ] ? undefined : R[ 'error' ]
    type Warning = unknown extends R[ 'warning' ] ? undefined : R[ 'warning' ]
    return result as Result<Data, Error, Warning>
}

export namespace Result {
    /**
     * a successful result
     */
    export type Ok<Data> = Omit<Result, 'data'> & { data: Data }

    /**
     * make a successful result
     */
    export function ok ( data?: undefined ): Ok<{}>
    export function ok<const Data> ( data: Data ): Ok<Data>
    export function ok<const Data> ( data?: Data ): Ok<Data> {
        return Result( { data: data ?? {} } ) as Ok<Data>
    }

    /**
     * a failure result
     */
    export type Error<E> = Result<undefined, E, undefined>

    /**
     * make a failure result
     */
    export function err<const E> ( error: E ) {
        return Result( { error } ) as Error<E>
    }

    /**
     * a warning result
     */
    export type Warning<W> = Result<undefined, undefined, W>

    /**
     * make a warning result
     */
    export function warn<const W> ( warning: W ) {
        return Result( { warning } ) as Warning<W>
    }
}

export namespace ResultStrict {
    export type Ok<Value = undefined> = {
        type: 'ok'
        success: true
        /**
         * an intended value
         */
        value: Value
    }

    export type Warning<WarningType> = {
        type: 'warning'
        success: true
        /**
         * a non-fatal error
         */
        warning: WarningType
    }

    export type ValueAndWarning<Value, WarningType> = {
        type: 'valueAndWarning'
        success: true
        /**
         * an intended value
         */
        value: Value
        /**
         * a non-fatal error
         */
        warning: WarningType
    }

    export type Error<ErrorType = string> = {
        type: 'error'
        success: false
        /**
         * a fatal error
         */
        error: ErrorType
    }

    // Result.Ok<string> | Result.Error<string>
    export type Either<ValueType, ErrorType = string> =
        | Ok<ValueType>
        | Error<ErrorType>

    export type Any<ValueType = unknown, ErrorType = string, WarningType = unknown> =
        | Ok<ValueType>
        | Warning<WarningType>
        | ValueAndWarning<ValueType, WarningType>
        | Error<ErrorType>

    /**
     * return a successful result
     */
    export function ok<const Value = undefined> ( value?: Value ): Ok<Value> {
        return { type: 'ok', success: true, value: value as Value }
    }

    /**
     * return a successful result with a warning
     */
    export function warn<const WarningType> ( warning: WarningType ): Warning<WarningType> {
        return { type: 'warning', success: true, warning }
    }

    /**
     * return a successful result with value and a warning
     */
    export function valueAndWarning<const Value, const Warning> (
        value: Value, warning: Warning
    ): ValueAndWarning<Value, Warning> {
        return { type: 'valueAndWarning', success: true, value, warning }
    }

    /**
     * return a failure result
     */
    export function error<const ErrorType> ( error: ErrorType ): Error<ErrorType> {
        return { type: 'error', success: false, error }
    }

    type PropKeys =
        | 'value'
        | 'warning'
        | 'error'
    /**
     * return only the value of a particular property if it exists
     */
    export const get = ( key: PropKeys ) => <Result extends Any> ( result: Result ) => {
        return ( result as Record<string, any> )[ key ]
    }
}