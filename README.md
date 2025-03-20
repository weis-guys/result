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
```

```sh
yarn add @weis-guys/result
```

```sh
bun add @weis-guys/result
```

```sh
pnpm add @weis-guys/result
```

## Getting Started

```ts
import { Result } from '@weis-guys/result'

console.log( Result.ok( 'good data' ) )
// { data: "good data" }

console.log( Result( { data: 'good data' } ) )
// { data: "good data" }

console.log( Result.ok() )
// { data: {} }

console.log( Result.err( 'some kind of error' ) )
// { error: "some kind of error" }

console.log( Result.warn( 'some kind of warning' ) )
// { warning: "some kind of warning" }

console.log( Result( { data: 'good data', warning: 'some kind of warning' } ) )
// { data: "good data", warning: "some kind of warning" }

console.log( Result( { data: 'good data', error: 'some kind of error' } ) )
// { data: "good data", error: "some kind of error" }

console.log( Result( { data: 'good data', error: 'some kind of error', warning: 'some kind of warning' } ) )
// { data: "good data", error: "some kind of error", warning: "some kind of warning" }

/**
 * this function returns some kind of result that isn't known until runtime
 */
function someFn () {
    const items = [
        Result.ok( 'good data' ),
        Result.err( 'some kind of error' ),
        Result.warn( 'some kind of warning' ),
        Result( { data: 'good data', warning: 'some kind of warning' } ),
    ]
    return items[ Math.floor( Math.random() * items.length ) ]
}

const { data, error, warning } = someFn()

if ( data ) {
    console.log( data )
    // 'good data'
}

if ( warning ) {
    console.log( warning )
    // 'some kind of warning'
}

if ( error ) {
    console.log( error )
    // 'some kind of error'
}
```

## TODO
- Auto publish to npm
    - GitHub Actions ?