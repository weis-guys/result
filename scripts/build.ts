import { $, type BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'
import { copyFile, rm } from 'node:fs/promises'
import * as Path from 'node:path'
import packageJSON from '../package.json'

// https://bun.sh/docs/bundler
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
            entrypoints: [ './src/index.ts' ],
            format: 'esm',
            // minify: true,
            // sourcemap: 'inline',
            plugins: [
                dts( {
                    output: {
                        noBanner: true,
                    }
                } )
            ],
        }
        await Bun.build( config )
            .then( buildResult => Promise.all(
                buildResult.outputs.map( res => Bun.write( Path.join( dist, res.path ), res ) )
            ) )
            .then( () => console.log( 'Bun.build: ran' ) )
            .catch( logError( { section, config } ) )
    } )

    .then( async () => {
        const { scripts, devDependencies, ...reduced } = packageJSON
        const section = `Reduced package.json: written: ${ reduced.version }`
        const distPath = Path.join( dist, 'package.json' )

        await Bun.write( distPath, JSON.stringify( reduced, null, 4 ) )
            .then( () => console.log( section ) )
            .catch( logError( { section, distPath, reduced } ) )
    } )

    .then( async () => {
        const section = 'Reduced README: written'
        const srcPath = Path.join( root, 'README.md' )
        const distPath = Path.join( dist, 'README.md' )
        const contents = await Bun.file( srcPath ).text()
        const newContents = contents
            .split( '<!-- Dist Readme Stops Here -->' )[ 0 ]
            .trim()

        await Bun.write( distPath, newContents )
            .then( () => console.log( section ) )
            .catch( logError( { section, distPath, contents } ) )
    } )

    .then( async () => {
        const section = 'LICENSE'
        const srcPath = Path.join( root, 'LICENSE' )
        const distPath = Path.join( dist, 'LICENSE' )
        await copyFile( srcPath, distPath )
            .then( () => console.log( 'LICENSE: copied' ) )
            .catch( logError( { section, srcPath, distPath } ) )
    } )

    .then( async () => {
        const section = 'src/index.ts'
        const srcPath = Path.join( root, 'src/index.ts' )
        const distPath = Path.join( dist, 'index.ts' )
        await copyFile( srcPath, distPath )
            .then( () => console.log( 'src/index.ts: copied' ) )
            .catch( logError( { section, srcPath, distPath } ) )
    } )

    .then( () => console.log( 'Build: done' ) )
    .catch( logError( { path: import.meta.path } ) )