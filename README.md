# Oefening 02
## Voorbereiding:
Clone de git-repository uit github en maak je eigen branch.
1. Kopieer de url via github naar je klembord:  
   ![Copy url](https://raw.githubusercontent.com/SyntraFSD-JS/ex-01/master/images/copy_github.png "Copy url to clipboard")

Gebruik de terminal uit VSCode om de volgende commands uit te voeren.
(vervang `[naam]` door je eigen naam)

1. `git clone https://github.com/SyntraFSD-JS/ex-02.git ex-02`
2. `cd ex-02`
3. `git checkout -b [naam]`
4. `git push --set-upstream origin [naam]`

Push regelmatig de changes die je maakt naar github

1. Commit je changes:
   1. Druk `Ctrl-Shift-G` om de Dource Control tab te openen
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


#### Extra

#### Wat heb ik nodig:
(Als ik `[test]` vierkante haakjes gebruik is wat er tussen de haakjes staat een beschrijving van het soort waarde er verwacht is. Neem dit nooit letterlijk over.)

- Global functions:
   - `parseInt()` 
- DOM Methods:
   - `document.querySelector()`
   - `document.querySelctorAll()`
   - `[nodeList].forEach()`
   - `[element].matches()`
   - `[element].closest()`
   - `[element].remove()`
   - `[element].textContent`
   - `[element].children`
   - `[element].children.length`
   - `[element].cloneNode()`
   - `[element].appendChild()`
   - `[element].addEventListener()`
- Event:
   - `[event].target`
   
      
