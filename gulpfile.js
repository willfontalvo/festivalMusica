
const {src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass") (require("sass"));
const plumber = require('gulp-plumber');

//imagenes
const cache= require('gulp-cache')
const iamgemin= require('gulp-imagemin');
const webp= require('gulp-webp');
const imagemin = require("gulp-imagemin");
const avif= require('gulp-avif')

function css(done){
    src('src/SCSS/**/*.scss')    //identificar el archivo de SASS
    .pipe(plumber()) //para que no se detenga el watch en la terminal
    .pipe(sass())    //compilarlo
    .pipe(dest("build/css"));    //almacenarlo en el disco duro
    done() // callback que avisa a gulp cuando llegamos al final
}

function imagenes(done){
    const opciones= {
        optimizationLe: 3
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}


function versionWebp(done){
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
 
    done()
}

function versionAvif(done){
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
 
    done()
} 

/*javascript */

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();

}

function dev(done){
    watch("src/SCSS/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript ,dev);
