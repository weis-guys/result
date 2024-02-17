<div align='center'>
    <h1>@weis-guys/result</h1>
</div>

<div align='center'>
    <a href='https://github.com/JacobWeisenburger' rel='nofollow'>
        <img alt='Created by Jacob Weisenburger'
            src='https://img.shields.io/badge/created%20by-Jacob%20Weisenburger-274D82.svg'>
    </a>
    <a href='https://github.com/weis-guys/result/stargazers' rel='nofollow'>
        <img alt='stars' src='https://img.shields.io/github/stars/weis-guys/result?color=blue'>
    </a>
</div>

<div align='center'>
    <a href='https://www.npmjs.com/package/@weis-guys/result' rel='nofollow'>
        <img alt='npm' src='https://img.shields.io/npm/v/@weis-guys/result?color=blue'>
    </a>
    <a href='https://www.npmjs.com/package/@weis-guys/result' rel='nofollow'>
        <img alt='downloads' src='https://img.shields.io/npm/dw/@weis-guys/result?color=blue'>
    </a>
</div>

<div align="center">
    <a href="https://github.com/weis-guys/result#weis-guysresult">Docs</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://github.com/weis-guys/result">github</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://www.npmjs.com/package/@weis-guys/result">npm</a>
</div>

<!-- Dist Readme Stops Here -->

<br />

## Contribute

Always open to ideas. Positive or negative, all are welcome. Feel free to contribute an [issue](https://github.com/weis-guys/result/issues) or [PR](https://github.com/weis-guys/result/pulls).

## Installation

```sh
npm install @weis-guys/result
yarn add @weis-guys/result
pnpm add @weis-guys/result
bun add @weis-guys/result
```

## Getting Started

```ts
import Result from '@weis-guys/result'

const okResult = Result.ok( 'good value' )
// { success: true, value: "good value"  }

const warningResult = Result.okWithWarning( 'good value', 'some kind of warning' )
// { success: true, value: "good value", warning: "some kind of warning" }

const errorResult = Result.error( 'some kind of error' )
// { success: false, error: "some kind of error" }

/**
 * this function could return a value, an error, or a value with a warning
 */
function someFn () {
    const items = [ okResult, warningResult, errorResult ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const result = someFn()
console.log( { result } )

if ( result.success ) {
    console.log( result.value )
    // 'good value'

    result.warning && console.warn( result.warning )
    // 'some kind of warning'
} else {
    console.error( result.error )
    // 'some kind of error'
}

const value = Result.getValue( result )
console.log( value )
// 'good value' | undefined

const warning = Result.getWarning( result )
console.log( warning )
// 'some kind of warning' | undefined

const error = Result.getError( result )
console.log( error )
// 'some kind of error' | undefined
```

## TODO
- Auto publish to npm
    - GitHub Actions ?