/* Skapa konstant objekt som sätts till att gulp skall användas, läsa in gulp
Nu kommer man åt alla dessa metoder genom gulp
*/
const { src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const GulpClient = require("gulp");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');


/* ---- Sökvägar ----

htmlPath sökvägen till html filer
src = src katalogen
/** = vilken katalog sokm helst
/*.html = vilken fil som helst så länge som de har filändelsen html 


*/
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js"
}

/* kopiera HTML-filer
för att indikera att att funktionen är klar läggs return till,
den skall skickas vidare i flödet med pipe, skall flyttas från src-katalogen 
till pup-katalogen*/
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pup')
    );
}

/* Sammanslå och minifiera JS-filer, i concat-stadiet så ligger den bara
i minnet, den skrivs in dest-stadiet, alltså main.js i pup skrivs först då*/
function jsTask() {
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('pup/js')
    );
}


/* Task/function för att hantera css-filer
1. Slår samman css-filerna från src till en css-fil - .pipe(concat())
2. */
function cssTask() {
    return src(files.cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pup/css')
    );

}


/* kollar om den hittar ändringar och då sparkar den igång tasks*/
function watchTask() {
    watch([files.htmlPath, files.jsPath], 
        parallel(copyHTML, jsTask));
}


/* Detta är en privat fil, man vill komma åt utanför också exempelvis i terminalen
eller kommandopromten*/

//default task
exports.default = series(
    parallel(copyHTML, jsTask),
    watchTask
);

