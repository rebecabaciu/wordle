# 🇷🇴 Wordle

Această aplicație este o recreare fidelă și optimizată a celebrului joc Wordle, dezvoltată folosind **React** și **TypeScript**.

Proiectul a fost creat ca instrument practic pentru lucrarea de licență, având rolul de a valida strategiile de câștig generate de agenții inteligenți.

![](public/w2.png)

## Conexiunea cu Licența (Backend & AI)

Acest joc nu este doar o interfață grafică. El se bazează pe datele și algoritmi complecși de analiză.
Studiul teoretic, agenții AI (Greedy/Entropie) și scripturile care au generat baza de date de cuvinte se găsesc în repository-ul de cercetare:

**[Licență Wordle](https://github.com/rebecabaciu/licenta_wordle/))**

## Funcționalități Cheie

* **Validare în timp real:** Feedback vizual instant (Verde/Galben/Gri) conform regulilor oficiale Wordle.
* **Tastatură Virtuală Interactivă:** Tastele își schimbă culoarea pe măsură ce jucătorul ghicește, pentru a ajuta la vizualizarea literelor disponibile.
* **Animații Fluide:** Experiență de utilizare rafinată cu efecte vizuale la introducerea și verificarea literelor.
* **Dicționar Extins:** Include aproape toate substantivele de 5 litere din limba engleză (2309), oferind un grad ridicat de rejucabilitate.

## Tehnologii Utilizate

* **Frontend:** React 18
* **Limbaj:** TypeScript (pentru siguranța tipurilor și prevenirea erorilor)
* **Build Tool:** Vite (pentru performanță maximă)
* **Styling:** CSS3 (Grid & Flexbox pentru așezarea tablei de joc)

## Instrucțiuni de Instalare și Rulare

1.  Clonează acest repository:
    ```bash
    git clone [https://github.com/rebecabaciu/wordle.git](https://github.com/rebecabaciu/wordle.git)
    cd wordle
    ```

2.  Instalează dependențele:
    ```bash
    npm install
    ```

3.  Pornește aplicația local:
    ```bash
    npm run dev
    ```
    Jocul va fi disponibil în browser la adresa `http://localhost:5173`.
