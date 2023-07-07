
const {src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass") (require("sass"));
const plumber = require('gulp-plumber');

//imagenes
const webp= require('gulp-webp');

function css(done){
    src('src/SCSS/**/*.scss')    //identificar el archivo de SASS
    .pipe(plumber()) //para que no se detenga el watch en la terminal
    .pipe(sass())    //compilarlo
    .pipe(dest("build/css"));    //almacenarlo en el disco duro
    done() // callback que avisa a gulp cuando llegamos al final
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
function dev(done){
    watch("src/SCSS/**/*.scss", css);

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);
