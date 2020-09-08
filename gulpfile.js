/* Skapa konstant objekt som sätts till att gulp skall användas, läsa in gulp
Nu kommer man åt alla dessa metoder genom gulp
*/
const { src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;


/* ---- Sökvägar ----

htmlPath sökvägen till html filer
src = src katalogen
/** = vilken katalog sokm helst
/*.html = vilken fil som helst så länge som de har filändelsen html 


*/
const files = {
    htmlPath: "src/**/*.html",
    cssPatch: "src/**/*.css",
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


/* kollar om den hittar ändringar och då sparkar den igång copyHTML*/
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