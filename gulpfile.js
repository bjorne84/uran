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
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


/* ---- Sökvägar ----

htmlPath sökvägen till html filer
src = src katalogen
/** = vilken katalog sokm helst
/*.html = vilken fil som helst så länge som de har filändelsen html 


*/
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: "src/images/*"
}

/* kopiera HTML-filer och plockar bort kommentarer
för att indikera att att funktionen är klar läggs return till,
den skall skickas vidare i flödet med pipe, skall flyttas från src-katalogen 
till pup-katalogen*/
function htmlTask() {
    return src(files.htmlPath)
    .pipe(htmlmin({ removeComments: true }))
    .pipe(dest('pup')
    );
}

/* Sammanslå och minifiera JS-filer, i concat-stadiet så ligger den bara
i minnet, den skrivs in dest-stadiet, alltså main.js i pup skrivs först då, sourcemap körs för att man 
skall kunna se från vilken fil koden kommer*/
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pup/js')
    );
}


/* ------Task/funktion för att hantera css-filer -----
1. Hämtar alla css filer med return src
2. Startar igång sourcemap (som gör att man ser från vilken fil koden kommer i den sammanslagna)
3. Slår samman css-filerna från src till en css-fil - .pipe(concat())
4. Kör autoprefixer för automatisera inställningar för enskilda webbläsare
5. Minifiera CSS och spotta ut console.log med info om besparingen av storlek
6. avsluta sourcemaps
7. skicka över filen till pup foldern*/
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

/* Minifierar bildfiler genom att komprimera dem och sedan skicka till pup-folder*/
function imgTask() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pup/images')
    );
}



/* kollar om den hittar ändringar och då sparkar den igång tasks*/
function watchTask() {

    /* Browser sync uppdaterar wepplatsen on the go*/
    browserSync.init({
        injectChanges: false,
        server: {
            baseDir: './pup'
        }
    });
   
    watch([files.htmlPath, files.jsPath, files.imgPath], 
        parallel(htmlTask, jsTask, imgTask)).on('change', browserSync.reload);
    watch(files.cssPath, cssTask).on('change', browserSync.reload);

    
}


/* Detta är en privat fil, man vill komma åt utanför också exempelvis i terminalen
eller kommandopromten*/

//default task
exports.default = series(
    parallel(htmlTask, jsTask, cssTask, imgTask),
    watchTask
);


