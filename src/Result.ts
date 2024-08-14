export module Result {
    export type Ok<Value = undefined> = {
        type: 'ok'
        success: true
        /**
         * an intended value
         */
        value: Value
    }

    export type Warning<WarningType = undefined> = {
        type: 'warning'
        success: true
        /**
         * a non-fatal error
         */
        warning: WarningType
    }

    export type ValueAndWarning<Value = undefined, WarningType = undefined> = {
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

    export type Error<Error> = {
        type: 'error'
        success: false
        /**
         * a fatal error
         */
        error: Error
    }

    export type Any<ValueType = any, ErrorType = any, WarningType = any> =
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
    export function warn<const WarningType = undefined> ( warning: WarningType ): Warning<WarningType> {
        return { type: 'warning', success: true, warning }
    }

    /**
     * return a successful result with value and a warning
     */
    export function valueAndWarning<
        const Value = undefined,
        const Warning = undefined,
    > ( value: Value, warning: Warning ): ValueAndWarning<Value, Warning> {
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
     * return only the value of a perticualr property if it exists
     */
    export const get = ( key: PropKeys ) => <Result extends Any> ( result: Result ) => {
        return ( result as any )[ key ]
    }
}