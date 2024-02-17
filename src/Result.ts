export module Result {
    export type Ok<Value, Warning = undefined> = {
        success: true
        /**
         * an intended value
         */
        value: Value
        /**
         * a non-fatal error
         */
        warning?: Warning
    }

    export type Err<Error> = {
        success: false
        /**
         * a fatal error
         */
        error: Error
    }

    export type Any<Value = any, Error = any, Warning = any> =
        | Ok<Value, Warning>
        | Err<Error>

    /**
     * return a successful result
     */
    export function ok<const Value> ( x: Value ): Ok<Value> {
        return { success: true, value: x }
    }

    /**
     * return a successful result with a warning
     */
    export function okWithWarning<const Value, const Warning> ( x: Value, warning: Warning ): Ok<Value, Warning> {
        return { ...ok( x ), warning }
    }

    /**
     * return a failure result
     */
    export function error<const Error> ( x: Error ): Err<Error> {
        return { success: false, error: x }
    }

    /**
     * return only the value if the result is a success
     */
    export function getValue<Result extends Any> ( result: Result ) {
        return result.success ? result.value : undefined
    }

    /**
     * return only the warning if the result is a success
     */
    export function getWarning<Result extends Any> ( result: Result ) {
        return result.success ? result.warning : undefined
    }

    /**
     * return only the error if the result is a failure
     */
    export function getError<Result extends Any> ( result: Result ) {
        return result.success ? undefined : result.error
    }
}