# Oefening 03
## Voorbereiding:
Clone de git-repository uit github en maak je eigen branch.
1. Kopieer de url via github naar je klembord:  
   ![Copy url](https://raw.githubusercontent.com/SyntraFSD-JS/ex-01/master/images/copy_github.png "Copy url to clipboard")

Gebruik de terminal uit VSCode 
(zorg dat je in de juiste folder, die waar je alle oefeningen opslaat, zit in VSCode)
 om de volgende commands uit te voeren.
(vervang `[naam]` door je eigen naam)

1. `git clone https://github.com/SyntraFSD-JS/ex-03.git ex-03`
2. `cd ex-03`
3. `git checkout -b [naam]`
4. `git push --set-upstream origin [naam]`

Push regelmatig de changes die je maakt naar github

1. Commit je changes:
   1. Druk `Ctrl-Shift-G` om de Source Control tab te openen
   2. Geef een beschrijving van de changes die je deed en duw `Ctrl-Enter`
2. Push je changes:
   1. Druk `Ctrl-Shift-P` om het Command Palette te openen
   2. Zoek naar `Git: Push` en druk op `Enter` om uit te voeren 
   
Pull regelmatig om opmerkingen of aanpassingen van mij binnen te halen
1. Druk `Ctrl-Shift-P` om het Command Palette te openen
2. Zoek naar `Git: Pull` en druk op `Enter` om uit te voeren 
     
## Structuur
De oefeningen bevinden zich in een aparte map met de naam `ex[oef. nummer]_[oef. naam]`
Daarin zitten alle bestanden die je nodig hebt om de oefening te maken, meestal is dit een `index.html` en een `script.js` bestand.
Het script bestand zal al gelinkt zijn aan het html bestand. Zie:
```html
<script src="script.js"></script>
```
Normaal moet je niet in het html bestand meer werken maar enkel in `script.js`.
Ook daar zal meestal al een basisstructuur aanwezig zijn waarbij in comments staat waar je zelf dingen moet aanvullen.

Om het resultaat van je oefening te bekijken open je het `index.html` bestand in chrome.
In deze module gebruiken we allemaal chrome zodat we allemaal hetzelfde resultaat hebben.

## Oefeningen:
### Oefening 03: Vier op een rij
#### Doel:
Het doel is simpel, een speelbare versie van vier op een rij maken.
Hoe zie onze applicatie er uit:
- Alle Html en Css zijn reeds aanwezig om het spel te visualiseren  
  De structuur van het spelbord ziet er zo uit:  
  ```html
  <div id="board" data-turn="yellow">
    <div class="col" data-index="0">
      <div class="row" data-color="empty" data-winner="false" data-index="5"></div>
      <div class="row" data-color="empty" data-winner="false" data-index="4"></div>
      <div class="row" data-color="empty" data-winner="false" data-index="3"></div>
      <div class="row" data-color="empty" data-winner="false" data-index="2"></div>
      <div class="row" data-color="empty" data-winner="false" data-index="1"></div>
      <div class="row" data-color="empty" data-winner="false" data-index="0"></div>
    </div>
    <div class="col" data-index="0">
    ...
    </div>
    ...
  </div>  
  ```
  Dankzij de [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) 
  kunnen we heel makelijk het speelveld updaten. 
  - `data-turn="[kleur]"`:  
    Welk kleur is aan de beurt, mogelijke waarden: `yellow` of `red`
  - `data-color="[kleur]"`:  
    Kleurt een veld (square in onze code) in, mogelijke waarden: `yellow`, `red` of `empty`
  - `data-winner="[bool]"`:  
    Toont of een veld deel is van de winnende vier op een rij, modelijke waarden: `true` of `false`
  - `data-index="[index]`:  
    De index van ofwel de `row` ofwel de `col` (beginnen bij 0 zoals in een js array)
  - Hoe gebruik je data attributes (zie ook link hierboven):
    ```javascript
      // selecteer element met class='row' en data-index="2"
      const element = document.querySelector('.row[data-index="2"]');
  
      // vraag van een element de waarde van data-color op
      let color = element.dataSet.color;
    
      // wijzig de waarde van data-color van een element
      element.dataSet.color = "empty";
    ```
- Javascript
  - Het speelveld is in onze code een 
  [tweedimensionale array](https://www.dyn-web.com/javascript/arrays/multidimensional.php):
  ```javascript
    let board = 
      [ 
        [ square00, square01, square02, square03, square04, square05 ], // col 0
        [ square10, square11, square12, square13, square14, square15 ], // col 1
        [ square20, square21, square22, square23, square24, square25 ], // col 2
        [ square30, square31, square32, square33, square34, square35 ], // col 3
        [ square40, square41, square42, square43, square44, square45 ], // col 4
        [ square50, square51, square52, square53, square54, square55 ], // col 5
        [ square60, square61, square62, square63, square64, square65 ]  // col 6 
      ]
  ```  
  Dit is dus eigenlijk een copy van ons speelveld maar dan een kwartslag gedraaid.
  - Elk veld (square) is in onze code een object met volgende structuur:  
    ```javascript
       let square = {
         color: "yellow",
         winner: false,
         colIndex: 2,
         rowIndex: 1,
       }
    ```
  - `gameState`:
    De voortgang van ons spel wordt opgeslaan in het `gameState` object:
    ```javascript
      const gameState = {
        turn: "yellow", // kleur dat aan zet is
        winner: false, // is er iemand gewonnen
        winnerColor: null, // welk kleur is gewonnen (null als er niemand gewonnen is)
        full: false, // check of het speelveld vol is
        board: [board], // board (zoals hierboven besproken)
      }
    ``` 
  - `gameSettings`:
  ```javascript
    const gameSettings = {
      columns: 7, // aantal columns in ons speelveld
      rows: 6, // aantal rows in ons speelveld
    };
  ```
  - De structuur van ons programma ziet er als volgt uit:
    - We reageren op events om de `gameState` aan te passen:
      - `click` event op een `.col`
      - Kleur het juiste veld in met het juiste kleur (`square.color`) op je `gameState.board`
      - Check of er iemand vier op een rij heeft
        - Zo ja:
          - Verander gameState (`gameState.winner = true;`)
          - Toon winnaarsboodschap
      - Check of het speelveld vol is
          - Verander gameState (`gameState.full = true;`)
          - Toon gelijkspelboodschap
      - Verander gameState (`gameState.turn = ...`)
      - Schrijf `gameState.board` naar html
      - Schrijf `gameState.turn` naar html
  - Alle functies staan al klaar in de code, 
  het moeilijkste van deze oefening is het vinden van de winnende velden.  
  
## Succes!! 
**P.S.** Ik weet dat de oefening de niet makkelijk is en dat er zelfs nieuwe dingen in zitten. 
Ik verwacht ook niet jullie de oefening helemaal kunnen oplossen, 
ik wil jullie vooral zien proberen zodat we na de vakantie tien verschillende oplossingen kunnen bespreken.
Vergeet niet **regelmatig te pushen** naar Github zo kan ik zien wie waar op vast loopt.
Ik probeer ook regelmatig Mattermost te bekijken en eventueel daar vragen te beantwoorden.



   
      
