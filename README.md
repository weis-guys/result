# @weis-guys/result

```ts
import { Result } from '@weis-guys/result'


const happy = Result.ok( 'good value' )
console.log( happy )
// { success: true, value: "good value" }


const sad = Result.err( 'some kind of error' )
console.log( sad )
// { success: false, error: "some kind of error" }


/**
 * this function could return a value or an error
 */
function someFn () {
    return Math.random() > 0.5 ? happy : sad
}


const result = someFn()

Result.match( result )( {
    ok: value => console.log( value ), // do something with the value
    err: error => console.error( error ), // do something with the error
} )

const valueOrError = Result.match( result )( {
    // optionally perform a typesafe transformation to the value before returning it
    ok: value => value,

    // optionally perform a typesafe transformation to the error before returning it
    err: error => error,
} )

console.log( 'valueOrError:', valueOrError )
// valueOrError: "good value" | "some kind of error"

type ValueOrError = typeof valueOrError
// type ValueOrError = "good value" | "some kind of error"


const justValue = Result.match( result )( { ok: value => value } )
console.log( 'justValue:', justValue )
// justValue: "good value" | undefined

type JustValue = typeof justValue
// type JustValue = "good value" | undefined


const justError = Result.match( result )( { err: error => error } )
console.log( 'justError:', justError )
// justError: "some kind of error" | undefined

type JustError = typeof justError
// type JustError = "some kind of error" | undefined


// you can also handle both cases with a normal if/else statement
if ( result.success ) {
    console.log( 'result.value:', result.value )
    // result.value: "good value"
} else {
    console.log( 'result.error', result.error )
    // result.error: "some kind of error"
}
```

## TODO
- [] make reduced readme for npm