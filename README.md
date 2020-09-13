# Moment 2 Gulp ooch node.js

## Automatiseringsprocess:
Syftet är att förenkla processerna som man gör för alla webbprojekt. Det är exempelvis att minifiera filer, komprimera filer, slå samman filer. 

Dels för att skilja på hur de filer som skall publiceras ser ut och är sammansatta. Men också för att ha färdiga mallar med exempelvis en viss struktur på html-koden redan satt, detsamma för CSS.

## Paket
**Följande paket har jag valt att använda:**

* **Gulp-Concat** 
Slår samman filer. Perfekt att exempelvis slå samman alla JavaScript-filer man har i utvecklingsläget till en JavaScript-fil som används för den puplika versionen. 
* **Gulp uglify**
Minifierar JavaScript filer, tar bort kommentarer och alla radbrytningar osv och gör filen så liten som möjligt. 
* **Autoprefixers**
Adderar eller tar bort vendor prefixes som -webkit eller -moz. Det gör den genom att kontrollera support för olika css-funktioner för de olika webbläsarna på caniuse.com. Caniuse.com har den mest uppdaterade datan över detta. 
* **Gulp sourcemap**
Gör det möjligt att för de sammanslagna filerna ändå se fårn vilken urspiurngsfil en viss del av koden härstammar från.
* **Gulp cleanCSS**
Minifierar CSS-filer
* **BrowserSync**
Synkroniserar ändringar man gör så att webbläsaren ser dem utan att man behöver uppdatera i exempelvis kommandocentralen och uppdatera webbläsaren.
* **Gulp imagemin**
Minifierar gif, jpg, png och svg bilder genom komprimering.
* **Gulp htmlmin**
Minifierar html-filer. Jag har ställt så den plockar bort kommentarer, men låter resten vara.

## Instruktioner
Man startar systemet genom att först clone repon där gulpen finns sparad.  
I bash skriver man $ git clone git@github.com:bjorne84/gulp.git
Sedan kör man i kommandocentralen kommandot nom install i den filkatalog som man valt  
När det är gjort skriver man bara npm gulp i kommandocentralen så kickar allt igång.
	
## Tasks: 
**htmlTask**
Tar bort kommentarer(minifierar) och kopierar filerna till den publika katalogen.
**jsTask**
Slår samman och minifierar alla JavaScript-filer samt kör sourcemap och flyttar slutligen filerna
till den publika katalogen
**cssTask**
Slår samman och minifierar css-filerna. Förenklar css-skrivandet genom autoprefixer. Filerna körs
via sourcemap så de går att se sedan vart koden härstämmar ifrån. Flyttas sedan till den publika mappen.
**imgTask**
Komprimerar bilder och flyttar till den publika mappen.