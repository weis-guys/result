// import { Result } from '@weis-guys/result'

// const ok = Result.ok( 'good value' )
// // { type: 'ok', value: 'good value' }

// const warning = Result.warning( 'some kind of warning' )
// // { type: 'warning', value: 'some kind of warning' }

// const error = Result.error( 'some kind of error' )
// // { type: 'error', value: 'some kind of error' }

// /**
//  * this function could return a value or an error
//  */
// function someFn () {
//     const items = [ ok, warning, error ]
//     return items[ Math.floor( Math.random() * items.length ) ]
// }

// const result = someFn()

// switch ( result.type ) {
//     case 'ok':
//         console.log( result.value )
//         // 'good value'
//         break
//     case 'warning':
//         console.warn( result.value )
//         // 'some kind of warning'
//         break
//     case 'error':
//         console.error( result.value )
//         // 'some kind of error'
//         break
// }