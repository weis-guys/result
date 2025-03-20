type Result<Data = undefined, Error = undefined, Warning = undefined> = {
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