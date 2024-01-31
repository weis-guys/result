export module Result {
    export type Ok<Value> = { success: true, value: Value }
    export type Err<Error> = { success: false, error: Error }
    export type Either<Error, Value> = Err<Error> | Ok<Value>

    export function ok<const Value> ( x: Value ): Ok<Value> {
        return { success: true, value: x }
    }

    export function err<const Error> ( x: Error ): Err<Error> {
        return { success: false, error: x }
    }

    export function match<result extends Either<any, any>> (
        result: result
    ) {
        type Value = result extends Ok<infer Value> ? Value : never
        type Error = result extends Err<infer Error> ? Error : never

        function matched<OkReturn, ErrReturn> (
            props: {
                ok: ( value: Value ) => OkReturn,
                err: ( error: Error ) => ErrReturn,
            }
        ): OkReturn | ErrReturn
        function matched<OkReturn, ErrReturn> (
            props: {
                ok: ( value: Value ) => OkReturn,
            }
        ): OkReturn | undefined
        function matched<OkReturn, ErrReturn> (
            props: {
                err: ( error: Error ) => ErrReturn,
            }
        ): ErrReturn | undefined
        function matched<OkReturn, ErrReturn> (
            { ok, err }: {
                ok?: ( value: Value ) => OkReturn,
                err?: ( error: Error ) => ErrReturn,
            }
        ) {
            if ( result.success ) return ok?.( result.value )
            return err?.( result.error )
        }

        return matched
    }
}