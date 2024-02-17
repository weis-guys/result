export type Result<Value = any> = {
    type: Result.Type
    value: Value
}

export module Result {
    export type Type = 'ok' | 'error' | 'warning'

    export type Types = {
        ok: { type: 'ok', value: any }
        error: { type: 'error', value: any }
        warning: { type: 'warning', value: any }
    }

    export function ok<const Value> ( value: Value ) {
        return { type: 'ok' as const, value }
    }

    export function error<const Value> ( value: Value ) {
        return { type: 'error' as const, value }
    }

    export function warning<const Value> ( value: Value ) {
        return { type: 'warning' as const, value }
    }

    export function match<result extends Result> ( result: result ) {

        function matched<Props extends {
            [ key in Type ]?: (
                value: Extract<result, Result.Types[ key ]>[ 'value' ]
            ) => T
        }, T> (
            props: Props
            // ): keyof Props {
        ): T {
            // : ReturnType<Exclude<Props[ keyof Props ], undefined>> {
            // : { [ key in keyof Props ]: ReturnType<Props[ key ]> }[ keyof Props ] {
            // type Foo = Props[ keyof Props ]
            // type Foo = {} extends Props
            //     ? undefined
            //     : Props[ keyof Props ]
            // as Props[ keyof Props ]
            switch ( result.type ) {
                case 'ok': return props?.ok?.( result.value )
                case 'warning': return props?.warning?.( result.value )
                case 'error': return props?.error?.( result.value )
            }
        }

        return matched
    }
}