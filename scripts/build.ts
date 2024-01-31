import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'
import { copyFile, cp, rm } from 'node:fs/promises'
import * as Path from 'node:path'
import packageJSON from '../package.json'

// https://bun.sh/docs/bundler
// https://www.npmjs.com/~cakeboss777?activeTab=packages

// https://github.com/wobsoriano/bun-lib-starter/tree/main
// https://github.com/wobsoriano/bun-plugin-dts

const logError = ( ctx?: object ) => ( { message }: Error ) => {
    const data = { message, ...ctx }
    console.error( 'Error:', JSON.stringify( data, null, 2 ) )
}

const root = Path.join( import.meta.dir, '..' )
const dist = Path.join( root, 'dist' )

await Promise.resolve()
    .then( () => console.log( 'Building...' ) )
    .then( () =>
        console.log( {
            root,
            dist,
        } )
    )

    .then( async () => {
        await rm( dist, { recursive: true } )
            .then( () => console.log( 'dist: deleted' ) )
            .catch( logError( { dist } ) )
    } )

    .then( async () => {
        const section = 'Bun.build'
        const config: BuildConfig = {
            entrypoints: [ './lib.ts' ],
            root,
            outdir: dist,
            format: 'esm',
            minify: true,
            sourcemap: 'external',
            target: 'node',
            plugins: [
                dts()
            ],
        }
        await Bun.build( config )
            .then( () => console.log( 'Bun.build: ran' ) )
            .catch( logError( { section, config } ) )
    } )

    .then( async () => {
        const section = 'package.json'
        const distPath = Path.join( dist, 'package.json' )
        const { scripts, devDependencies, ...reduced } = packageJSON

        await Bun.write( distPath, JSON.stringify( reduced, null, 4 ) )
            .then( () => console.log( 'package: copied' ) )
            .catch( logError( { section, distPath, reduced } ) )
    } )

    .then( async () => {
        const section = 'README'
        const srcPath = Path.join( root, 'README.md' )
        const distPath = Path.join( dist, 'README.md' )
        await copyFile( srcPath, distPath )
            .then( () => console.log( 'README: copied' ) )
            .catch( logError( { section, srcPath, distPath } ) )
    } )

    .then( async () => {
        const section = 'LICENSE'
        const srcPath = Path.join( root, 'LICENSE' )
        const distPath = Path.join( dist, 'LICENSE' )
        await copyFile( srcPath, distPath )
            .then( () => console.log( 'LICENSE: copied' ) )
            .catch( logError( { section, srcPath, distPath } ) )
    } )

    .then( () => console.log( 'Build: done' ) )
    .catch( logError( { path: import.meta.path } ) )