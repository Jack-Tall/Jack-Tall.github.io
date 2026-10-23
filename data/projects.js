/*
  INHOUD VAN DE SITE
  ------------------
  Alles wat op de site staat, komt uit dit bestand.

  Projecten staan in de volgorde waarin ze getoond worden. Verplaats een blok om de volgorde te wijzigen,
  verwijder een blok om een project weg te laten.

  Per project:
    slug        mapnaam in img/ (en de url: project.html?p=slug)
    year        1, 2 of 3
    title       titel
    type        soort werk (getoond onder de titel)
    course      vak
    assignment  opdracht (optioneel)
    format      formaat (optioneel)
    team        samenwerking (optioneel)
    text        alinea's, als lijst van zinnen
    cover       welk beeld het overzicht toont (0 = eerste, optioneel)
    thumb       vast beeld voor het overzicht (bestandsnaam in img/<slug>/, optioneel)
    featured    true = staat in de Selectie op de startpagina
    home        "all" = toon alle beelden op de startpagina (zoals Minima Docta)
    size        "large" = groter getoond op de startpagina (zoals Chemtrails)
    book        bladerbaar boek: pagina's in img/<slug>/book/
    media       beelden in img/<slug>/ (f = bestand, w/h = afmetingen, cap = bijschrift)
                video: {"video": "clip.mp4", "poster": "poster.jpg"}
    links       knoppen naar live werk (optioneel)
*/
window.SITE = {
  "years": [
    {
      "id": 3,
      "name": "Jaar 3",
      "period": "2026–27",
      "note": "Lopend: letterontwerp, grafisch ontwerp en stage. Nieuw werk volgt."
    },
    {
      "id": 2,
      "name": "Jaar 2",
      "period": "2025–26"
    },
    {
      "id": 1,
      "name": "Jaar 1",
      "period": "2024–25"
    },
    {
      "id": 0,
      "name": "Vrij werk",
      "period": "2023–26"
    }
  ],
  "projects": [
    {
      "slug": "the-broad-way-collection",
      "year": 2,
      "title": "The Broad Way Collection",
      "type": "Krant",
      "course": "Atelier Graphic",
      "assignment": "The Broadsheet Collection",
      "format": "Broadsheet, 350 × 500 mm, 40 pagina's",
      "text": [
        "Voor The Broadsheet Collection ontwierp ik een krant op broadsheetformaat die 123 objecten van de klas ordent op een tijdlijn van 1907 tot 2026. Door de pagina's laat ik twee verhaallijnen lopen: The Strange Case of Dr Jekyll and Mr Hyde en ‘De Bom’ van Doe Maar.",
        "Mijn vertrekpunt was Bruno Latour: objecten sturen ons gedrag, niet alleen omgekeerd. Mijn eigen vijf objecten zijn fietsonderdelen van Etienne Hautekeete: kader, voorvork, ketting, crankstel en zadel."
      ],
      "media": [],
      "featured": true,
      "book": {
        "pages": [
          "001.jpg",
          "002.jpg",
          "003.jpg",
          "004.jpg",
          "005.jpg",
          "006.jpg",
          "007.jpg",
          "008.jpg",
          "009.jpg",
          "010.jpg",
          "011.jpg",
          "012.jpg",
          "013.jpg",
          "014.jpg",
          "015.jpg",
          "016.jpg",
          "017.jpg",
          "018.jpg",
          "019.jpg",
          "020.jpg",
          "021.jpg",
          "022.jpg",
          "023.jpg",
          "024.jpg",
          "025.jpg",
          "026.jpg",
          "027.jpg",
          "028.jpg",
          "029.jpg",
          "030.jpg",
          "031.jpg",
          "032.jpg",
          "033.jpg",
          "034.jpg",
          "035.jpg",
          "036.jpg",
          "037.jpg",
          "038.jpg",
          "039.jpg"
        ],
        "w": 1100,
        "h": 1541,
        "cap": "Pagina 2–40 van de krant"
      },
      "thumb": "02.jpg"
    },
    {
      "slug": "minima-docta",
      "year": 2,
      "title": "Minima Docta",
      "type": "Posterreeks",
      "course": "Atelier Graphic",
      "assignment": "Posters Minima Docta 25–26",
      "format": "6 posters",
      "text": [
        "Ik ontwierp de posters voor Minima Docta, een reeks avonden die met documentaire cinema en ontmoetingen reflecteert over hedendaagse kunst en maatschappij, met de steun van LUCA School of Arts campus Sint-Lucas Gent.",
        "Elke avond gaf ik een eigen beeldtaal, vertrekkend van de film of de gast: een rood kruis voor Liliane Vertessen, Hebreeuwse letters voor Chasing Portraits, overdrukte CMYK-letters voor Toshio Matsumoto."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1427,
          "h": 2000,
          "cap": "Viva Liliane V.!"
        },
        {
          "f": "02.jpg",
          "w": 1422,
          "h": 2000,
          "cap": "My Architect"
        },
        {
          "f": "03.jpg",
          "w": 1422,
          "h": 2000,
          "cap": "Chasing Portraits"
        },
        {
          "f": "04.jpg",
          "w": 1422,
          "h": 2000,
          "cap": "The Jewish Branch on the Belgian Art Tree"
        },
        {
          "f": "05.jpg",
          "w": 1422,
          "h": 2000,
          "cap": "Toshio Matsumoto"
        },
        {
          "f": "06.jpg",
          "w": 1422,
          "h": 2000,
          "cap": "Vaak weet mijn hand het beter dan ik zelf"
        },
        {
          "f": "insitu.jpg",
          "w": 1500,
          "h": 2000,
          "cap": "Viva Liliane V.! in situ",
          "nohome": true
        },
        {
          "video": "jury.mp4",
          "poster": "jury.jpg",
          "w": 720,
          "h": 1280,
          "cap": "Jury-opstelling",
          "loop": true,
          "nohome": true
        }
      ],
      "featured": true,
      "home": "all"
    },
    {
      "slug": "bankster",
      "year": 2,
      "title": "Bankster",
      "type": "Logo mash-up",
      "course": "Atelier Graphic",
      "assignment": "Logo mash-up",
      "text": [
        "Banken verstoppen hebzucht achter strakke logo's en lege beloftes. Ik bouwde Bankster op uit hun eigen symbolen en keer ze met twee middelvingers tegen hen.",
        "Ik vertrok van drie bronnen op één raster van cirkels: het symbool van het socialisme, Krefina Bank en Tokyo Tomin Bank. Het beeldmerk werkte ik uit als affiche, protestbord en geanimeerde webpagina."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1437,
          "h": 2000,
          "cap": "Affiche met constructie"
        },
        {
          "f": "expo.jpg",
          "w": 1500,
          "h": 2000,
          "cap": "Protestbord en affiche, opgesteld in het atelier"
        },
        {
          "f": "02.jpg",
          "w": 2000,
          "h": 1200,
          "cap": "Beeldmerk"
        },
        {
          "f": "web.jpg",
          "w": 1440,
          "h": 900,
          "cap": "Webpagina"
        }
      ],
      "links": [
        {
          "href": "work/clownweb/index.html",
          "label": "Bekijk de webpagina"
        }
      ],
      "featured": true
    },
    {
      "slug": "acabdance",
      "year": 2,
      "title": "ACABDANCE",
      "type": "Fotografie, letterbeeld",
      "course": "Magneetweek",
      "text": [
        "Tijdens de Magneetweek maakte ik letters met lichamen. Alles draait om de O: gevormd met armen en benen op de vloer, met een open mond, met een oog.",
        "Ik fotografeerde van bovenaf, knipte uit en bracht alles terug tot zwart en wit, zodat een houding een letterbeeld wordt."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1333,
          "h": 2000
        },
        {
          "f": "02.jpg",
          "w": 1333,
          "h": 2000
        },
        {
          "f": "03.jpg",
          "w": 1333,
          "h": 2000
        },
        {
          "f": "04.jpg",
          "w": 838,
          "h": 1257
        },
        {
          "f": "05.jpg",
          "w": 817,
          "h": 1225
        },
        {
          "f": "06.jpg",
          "w": 1361,
          "h": 2000
        },
        {
          "f": "07.jpg",
          "w": 2000,
          "h": 1333
        }
      ],
      "featured": true
    },
    {
      "slug": "web-experimenten",
      "year": 2,
      "title": "Web-experimenten",
      "type": "Web, interactie",
      "cover": 1,
      "course": "Atelier: Web",
      "text": [
        "Ik maakte twee experimenten in HTML, CSS en JavaScript.",
        "In Split It speel ik met het font Kremlin: je typt je eigen woord. Foolish Fish is mijn responsive waterstudie: het water vult de onderkant van het scherm, stijgt als je het venster smaller maakt, en de vis reageert via de webcam op je gezicht."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1440,
          "h": 900,
          "cap": "Split It"
        },
        {
          "f": "02.jpg",
          "w": 1440,
          "h": 900,
          "cap": "Foolish Fish"
        },
        {
          "video": "foolish-fish.mp4",
          "poster": "foolish-fish.jpg",
          "w": 720,
          "h": 1280,
          "cap": "Foolish Fish in actie",
          "loop": true
        }
      ],
      "links": [
        {
          "href": "work/split-it/index.html",
          "label": "Split It"
        },
        {
          "href": "work/foolish-fish/index.html",
          "label": "Foolish Fish (webcam)"
        }
      ],
      "featured": true
    },
    {
      "slug": "chemtrails",
      "year": 2,
      "title": "Chemtrails",
      "type": "Infographic",
      "course": "Atelier Graphic",
      "assignment": "Infographic: complottheorie",
      "text": [
        "Ik maakte een infographic die een complottheorie zo geloofwaardig mogelijk in beeld brengt: een geheime technische fiche van het ‘Secret Large-scale Atmospheric Program’, met sproeisystemen, vlieghoogtes en enquêtecijfers.",
        "Ik leende de vormtaal van veiligheidskaarten en technische handleidingen, zodat het verzinsel overtuigt. Daar zit voor mij de vraag van het project: hoe makkelijk laat je je overtuigen door goed ontwerp?"
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1385,
          "h": 2000
        }
      ],
      "featured": true,
      "size": "large"
    },
    {
      "slug": "fantastic-planet",
      "year": 2,
      "title": "Fantastic Planet",
      "type": "Filmaffiche, 3D",
      "course": "Atelier: Blender",
      "team": "Witse en Sebas",
      "text": [
        "Samen met Witse en Sebas maakte ik een filmaffiche voor Fantastic Planet (La Planète sauvage, René Laloux, 1973).",
        "We modelleerden en renderden de figuur in Blender, daarna bewerkte ik het beeld met een grof raster en een hard rood-groen contrast tot affiche."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1415,
          "h": 2000
        }
      ]
    },
    {
      "slug": "neue-haas-grotesk",
      "year": 2,
      "title": "Neue Haas Grotesk",
      "type": "Presentatie",
      "course": "Reflecties over typografie",
      "assignment": "Typo van de dag",
      "text": [
        "Voor Typo van de dag besprak ik Neue Haas Grotesk aan de hand van het NASA Graphics Standards Manual, en zette ik de letter naast Helvetica en Akzidenz-Grotesk.",
        "Mijn besluit: typografie die niet schreeuwt, maar draagt."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 2000,
          "h": 1500
        },
        {
          "f": "02.jpg",
          "w": 2000,
          "h": 1500
        },
        {
          "f": "03.jpg",
          "w": 2000,
          "h": 1500
        },
        {
          "f": "04.jpg",
          "w": 2000,
          "h": 1500
        },
        {
          "f": "05.jpg",
          "w": 2000,
          "h": 1500
        }
      ]
    },
    {
      "slug": "bauhaus-studieclip",
      "year": 2,
      "title": "Bauhaus",
      "type": "Video",
      "course": "Inleiding in kunsteducatie",
      "assignment": "Studieclip",
      "text": [
        "Ik maakte een studieclip over het Bauhaus als onderwijsmodel, rond vier meesters: Walter Gropius, Johannes Itten, Paul Klee en Oskar Schlemmer.",
        "Ik koos bewust voor geen voice-over en geen uitleg: archiefbeelden, korte Nederlandse teksten en een trage montage in After Effects laten ruimte om zelf te kijken. “Het atelier, niet het auditorium. Maken voor je begrijpt.”"
      ],
      "media": [
        {
          "video": "clip.mp4",
          "poster": "poster.jpg",
          "w": 1280,
          "h": 720,
          "cap": "Studieclip, 1’55”"
        }
      ]
    },
    {
      "slug": "sint-ritakerk",
      "year": 2,
      "title": "Sint-Ritakerk, Harelbeke",
      "type": "Banner, fotografie, Pecha Kucha",
      "course": "Architectuur",
      "team": "Sebas, Michaela, Aster en Sander",
      "text": [
        "Met mijn groep gaf ik een Pecha Kucha over de Sint-Ritakerk in Harelbeke (1959–1966) van Léon Stynen en Paul De Meyer: een geplooide betonnen tent met wanden van amper 8,5 centimeter en geen enkele kolom.",
        "In Harelbeke heet ze ‘de omgekeerde bloempot’, in architectuurboeken is ze een icoon. Sinds 2016 is ze beschermd monument. De foto's nam ik tijdens ons bezoek ter plaatse.",
        "Voor het project maakte ik ook een banner: letters opgebouwd uit rode ruiten, omringd door waaiers van lijnen die terugverwijzen naar de geplooide betonwanden en het licht in de kerk."
      ],
      "media": [
        {
          "f": "banner.jpg",
          "w": 1125,
          "h": 2000,
          "cap": "Banner"
        },
        {
          "f": "01.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "02.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "03.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "04.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "05.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "06.jpg",
          "w": 1500,
          "h": 2000
        },
        {
          "f": "07.jpg",
          "w": 2000,
          "h": 1500
        },
        {
          "f": "08.jpg",
          "w": 2000,
          "h": 1500
        }
      ],
      "featured": true
    },
    {
      "slug": "visual-essay",
      "year": 2,
      "title": "Visual essay",
      "type": "Visueel essay",
      "course": "Film",
      "text": [
        "Ik maakte dit visueel essay bij mijn tekst ‘Cinefilie: de magie van zichtbaar maken’. Mijn vertrekpunt is Orphée van Jean Cocteau, waar je de hand van de maker nog voelt in elke truc.",
        "Ik koppelde de stills aan elkaar op wat je letterlijk ziet: compositie, gebaar, kleur en houding."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1415,
          "h": 2000
        },
        {
          "f": "02.jpg",
          "w": 1415,
          "h": 2000
        },
        {
          "f": "03.jpg",
          "w": 1415,
          "h": 2000
        },
        {
          "f": "04.jpg",
          "w": 1415,
          "h": 2000
        }
      ]
    },
    {
      "slug": "the-criminal-world",
      "year": 1,
      "title": "The Criminal World",
      "type": "Boek, fotografie",
      "course": "Atelier Graphic",
      "assignment": "Reading the House",
      "format": "56 pagina's",
      "text": [
        "Ik maakte een catalogus van knuffels als criminelen. In het boek kruis ik de classificaties van criminoloog Cesare Lombroso met de gevoelsfilosofie van Marie Kondo: koude taxonomie tegenover zachte emotie, wetenschappelijke orde tegenover poëtische aanraking.",
        "Elk hoofdstuk koppelt een type misdadiger aan een idee uit de KonMari-methode. Mike Kelleys knuffelportretten waren voor mij een belangrijke referentie.",
        "“A catalogue of the measured and the tender. An archive of stitched bodies.”"
      ],
      "media": [
        {
          "f": "14.jpg",
          "w": 1500,
          "h": 2000,
          "cap": "Knuffelportret"
        },
        {
          "f": "15.jpg",
          "w": 1500,
          "h": 2000,
          "cap": "Knuffelportret"
        },
        {
          "f": "16.jpg",
          "w": 2000,
          "h": 1414,
          "cap": "Bewerkt portret"
        }
      ],
      "featured": true,
      "book": {
        "pages": [
          "001.jpg",
          "002.jpg",
          "003.jpg",
          "004.jpg",
          "005.jpg",
          "006.jpg",
          "007.jpg",
          "008.jpg",
          "009.jpg",
          "010.jpg",
          "011.jpg",
          "012.jpg",
          "013.jpg",
          "014.jpg",
          "015.jpg",
          "016.jpg",
          "017.jpg",
          "018.jpg",
          "019.jpg",
          "020.jpg",
          "021.jpg",
          "022.jpg",
          "023.jpg",
          "024.jpg",
          "025.jpg",
          "026.jpg",
          "027.jpg",
          "028.jpg",
          "029.jpg",
          "030.jpg",
          "031.jpg",
          "032.jpg",
          "033.jpg",
          "034.jpg",
          "035.jpg",
          "036.jpg",
          "037.jpg",
          "038.jpg",
          "039.jpg",
          "040.jpg",
          "041.jpg",
          "042.jpg",
          "043.jpg",
          "044.jpg",
          "045.jpg",
          "046.jpg",
          "047.jpg",
          "048.jpg",
          "049.jpg",
          "050.jpg",
          "051.jpg",
          "052.jpg",
          "053.jpg",
          "054.jpg",
          "055.jpg",
          "056.jpg"
        ],
        "w": 1000,
        "h": 1455,
        "cap": "56 pagina's"
      },
      "thumb": "01.jpg"
    },
    {
      "slug": "beelden-maken",
      "year": 1,
      "title": "Beelden maken",
      "type": "Fotografie, theateraffiches",
      "course": "Atelier Graphic",
      "assignment": "50 foto's, 12 beelden",
      "text": [
        "Uit vijftig eigen foto's koos en bewerkte ik er twaalf. Die beelden gebruikte ik als materiaal voor theateraffiches: Inferno van Romeo Castellucci, Waiting for Godot van Samuel Beckett en The Tubes."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1415,
          "h": 2000,
          "cap": "Inferno"
        },
        {
          "f": "02.jpg",
          "w": 1415,
          "h": 2000,
          "cap": "The Tubes"
        },
        {
          "f": "03.jpg",
          "w": 1415,
          "h": 2000,
          "cap": "Waiting for Godot"
        },
        {
          "f": "04.jpg",
          "w": 1410,
          "h": 2000
        },
        {
          "f": "05.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "06.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "07.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "08.jpg",
          "w": 1410,
          "h": 2000
        },
        {
          "f": "09.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "10.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "11.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "12.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "13.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "14.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "15.jpg",
          "w": 1414,
          "h": 2000
        }
      ]
    },
    {
      "slug": "het-proces",
      "year": 1,
      "title": "Het Proces",
      "type": "Affiche",
      "course": "Atelier Graphic",
      "assignment": "Jury 1",
      "text": [
        "Ik ontwierp een affiche voor Het Proces van Franz Kafka. De in elkaar gedraaide buizen verbeelden het ondoorgrondelijke systeem waarin Josef K. verstrikt raakt.",
        "Voor de titel koos ik CoFo Peshka, een langgerekte, hoekige schreefloze letter die opgaat in de buizen."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1423,
          "h": 2000
        },
        {
          "f": "02.jpg",
          "w": 1414,
          "h": 2000
        }
      ]
    },
    {
      "slug": "out-of-this-world",
      "year": 1,
      "title": "Out of This World",
      "type": "Platenhoes",
      "course": "Atelier Graphic",
      "assignment": "Opdracht 06: LP",
      "format": "12 inch: hoes, binnenhoes, labels",
      "text": [
        "Ik ontwierp de platenhoes, binnenhoes en labels voor ‘Out of This World’ van de BBC Radiophonic Workshop, een plaat vol elektronische geluiden en effecten.",
        "De titel laat ik in een spiraal rond het midden draaien, als een plaat die speelt. De hoes werkt als scanimation: schuif je het gestreepte transparant over de print, dan komt de spiraal in beweging.",
        "In mijn schetsen speelde ik verder met ruimtevaart en stereo: ‘We came in peace’ en ‘How to give yourself a stereo check-out’."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 2000,
          "h": 996,
          "cap": "Hoes"
        },
        {
          "video": "scanimation.mp4",
          "poster": "scanimation.jpg",
          "w": 720,
          "h": 896,
          "cap": "Scanimation",
          "loop": true
        },
        {
          "f": "02.jpg",
          "w": 2000,
          "h": 1024,
          "cap": "Binnenhoes"
        },
        {
          "f": "03.jpg",
          "w": 2000,
          "h": 2000,
          "cap": "Label A"
        },
        {
          "f": "04.jpg",
          "w": 2000,
          "h": 2000,
          "cap": "Label B"
        },
        {
          "f": "05.jpg",
          "w": 2000,
          "h": 2000
        },
        {
          "f": "06.jpg",
          "w": 2000,
          "h": 2000
        },
        {
          "f": "07.jpg",
          "w": 2000,
          "h": 2000
        }
      ],
      "featured": true
    },
    {
      "slug": "25-ans-de-cyclisme",
      "year": 1,
      "title": "25 ans de cyclisme",
      "type": "Boekomslag",
      "course": "Atelier Graphic",
      "assignment": "Don't judge a book by its cover",
      "text": [
        "Ik ontwierp een omslag voor ‘25 ans de cyclisme’ van sportjournalist Théo Mathy.",
        "De letters bouwde ik op uit stukken fietswiel, de rode bollen verwijzen naar de bolletjestrui."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 2000,
          "h": 1181
        },
        {
          "f": "02.jpg",
          "w": 1410,
          "h": 2000
        },
        {
          "f": "03.jpg",
          "w": 1410,
          "h": 2000
        }
      ]
    },
    {
      "slug": "naamplaten",
      "year": 1,
      "title": "Naamplaten",
      "type": "Typografie",
      "course": "Atelier Graphic",
      "assignment": "Jury 1: naamplaat",
      "text": [
        "Ik maakte naamplaten voor bekende namen met een onverwacht beroep.",
        "Soms laat ik de typografie het beroep volgen: Isaac Newton, fruitplukker, werd een fruitsticker in Gigalypse en Bodoni. Soms volgt ze de naam: Bill Gates, ruitenwasser, zette ik in een Windows 95-venster met de pixelletter W95FA."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "02.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "03.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "04.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "05.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "06.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "07.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "08.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "09.jpg",
          "w": 2000,
          "h": 1429
        },
        {
          "f": "10.jpg",
          "w": 2000,
          "h": 1429
        }
      ]
    },
    {
      "slug": "typogym",
      "year": 1,
      "title": "Typogym",
      "type": "Typografie",
      "course": "Atelier Graphic",
      "assignment": "Typogym: vergeten woorden",
      "text": [
        "Snelle typografische oefeningen: één woord, één ingreep. Ik liet de vorm tonen wat het woord betekent. Amechtig staat benauwd op elkaar gedrukt, in musket verspringen de letters, steak kreeg spikkels."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 2000,
          "h": 1415
        },
        {
          "f": "02.jpg",
          "w": 2000,
          "h": 1415
        },
        {
          "f": "03.jpg",
          "w": 2000,
          "h": 1442
        },
        {
          "f": "04.jpg",
          "w": 2000,
          "h": 1414
        }
      ]
    },
    {
      "slug": "grondbeginselen-der-typografie",
      "year": 1,
      "title": "Grondbeginselen der typografie",
      "type": "Boekje",
      "course": "Atelier Graphic",
      "assignment": "Stanley Morison",
      "text": [
        "Ik maakte een tekstboekje met Stanley Morisons ‘Grondbeginselen der typografie’.",
        "Ik zette de tekst volgens zijn eigen regels: typografie staat in dienst van de lezer, met een vertrouwde letter, een beperkte regellengte en ruime interlinie."
      ],
      "media": [],
      "book": {
        "pages": [
          "001.jpg",
          "002.jpg",
          "003.jpg",
          "004.jpg",
          "005.jpg",
          "006.jpg",
          "007.jpg",
          "008.jpg",
          "009.jpg",
          "010.jpg",
          "011.jpg",
          "012.jpg",
          "013.jpg",
          "014.jpg",
          "015.jpg",
          "016.jpg",
          "017.jpg"
        ],
        "w": 1000,
        "h": 1429,
        "cap": "17 pagina's"
      },
      "thumb": "01.jpg"
    },
    {
      "slug": "blad-spiegel",
      "year": 1,
      "title": "Blad Spiegel",
      "type": "3D-scans, publicatie",
      "course": "Beeldproject",
      "assignment": "Levend archief Citadel",
      "text": [
        "Ik bouwde een levend archief van de bomen in het Citadelpark in Gent, opgebouwd uit mijn eigen 3D-scans.",
        "Elke boom gaf ik een naam en een portret: de plataan, ‘de stadsreus’; de treurbeuk, ‘de groene parasol’; de tamme kastanje, ‘de dansende boom’; de Japanse sierkers, ‘de wachter van de lente’."
      ],
      "media": [
        {
          "f": "06.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "07.jpg",
          "w": 1256,
          "h": 2000
        },
        {
          "f": "08.jpg",
          "w": 1414,
          "h": 2000
        }
      ],
      "featured": true,
      "book": {
        "pages": [
          "001.jpg",
          "002.jpg",
          "003.jpg",
          "004.jpg",
          "005.jpg",
          "006.jpg",
          "007.jpg",
          "008.jpg",
          "009.jpg",
          "010.jpg",
          "011.jpg",
          "012.jpg"
        ],
        "w": 1000,
        "h": 1414,
        "cap": "12 pagina's"
      },
      "thumb": "01.jpg"
    },
    {
      "slug": "digitale-vaardigheden",
      "year": 1,
      "title": "Digitale vaardigheden",
      "type": "Beeld, flyer, animatie, procesfolio",
      "course": "Digitale vaardigheden",
      "text": [
        "Vijf opdrachten in Photoshop, Illustrator, After Effects en InDesign. Ik maakte bitmapbeelden van mijn eigen analoge foto's (Nikon FM3A, Fuji 200), een collage, een flyer en een animatie, en bundelde alles in een procesfolio."
      ],
      "media": [
        {
          "f": "01.jpg",
          "w": 1333,
          "h": 2000,
          "cap": "Collage in Photoshop"
        },
        {
          "f": "02.jpg",
          "w": 1410,
          "h": 2000,
          "cap": "Flyer in Illustrator"
        },
        {
          "f": "03.jpg",
          "w": 1335,
          "h": 2000
        },
        {
          "f": "04.jpg",
          "w": 1335,
          "h": 2000
        },
        {
          "f": "05.jpg",
          "w": 1414,
          "h": 2000
        },
        {
          "f": "06.jpg",
          "w": 599,
          "h": 842
        },
        {
          "f": "07.jpg",
          "w": 2000,
          "h": 2000
        },
        {
          "video": "anim.mp4",
          "poster": "anim.jpg",
          "w": 720,
          "h": 1018,
          "cap": "Animatie in After Effects"
        }
      ],
      "book": {
        "pages": [
          "001.jpg",
          "002.jpg",
          "003.jpg",
          "004.jpg",
          "005.jpg",
          "006.jpg",
          "007.jpg",
          "008.jpg",
          "009.jpg",
          "010.jpg",
          "011.jpg",
          "012.jpg",
          "013.jpg",
          "014.jpg",
          "015.jpg",
          "016.jpg",
          "017.jpg",
          "018.jpg"
        ],
        "w": 1000,
        "h": 1414,
        "cap": "Procesfolio, 18 pagina's"
      },
      "thumb": "01.jpg"
    },
    {
      "slug": "fotografie",
      "year": 0,
      "title": "Fotografie",
      "type": "Instagram",
      "text": [
        "Foto's die ik tussen 2023 en 2026 op Instagram zette."
      ],
      "links": [
        {
          "label": "Instagram",
          "href": "https://www.instagram.com/jack.tallieu/"
        }
      ],
      "media": [
        {
          "f": "p1-01.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-02.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-03.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-04.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-05.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-06.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-07.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-08.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-09.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-10.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-11.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-12.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-13.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-14.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-15.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-16.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-17.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-18.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p1-19.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "28 september 2026"
        },
        {
          "f": "p2-01.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-02.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-03.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-04.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-05.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-06.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-07.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-08.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-09.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-10.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p2-11.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "12 februari 2026"
        },
        {
          "f": "p3-01.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-02.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-03.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-04.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-05.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-06.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-07.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-08.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-09.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p3-10.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "29 augustus 2025"
        },
        {
          "f": "p4-01.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-02.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-03.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-04.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-05.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-06.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-07.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-08.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-09.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p4-10.jpg",
          "w": 1080,
          "h": 1080,
          "cap": "26 juli 2025"
        },
        {
          "f": "p5-01.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-02.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-03.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-04.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-05.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-06.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-07.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-08.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p5-09.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p6-01.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p6-02.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p6-03.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "13 februari 2025"
        },
        {
          "f": "p7-01.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-02.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-03.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-04.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-05.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-06.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-07.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-08.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-09.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p7-10.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "7 september 2024"
        },
        {
          "f": "p8-01.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "24 januari 2024"
        },
        {
          "f": "p8-02.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "24 januari 2024"
        },
        {
          "f": "p8-03.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "24 januari 2024"
        },
        {
          "f": "p8-04.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "24 januari 2024"
        },
        {
          "f": "p8-05.jpg",
          "w": 1440,
          "h": 1440,
          "cap": "24 januari 2024"
        },
        {
          "f": "p8-06.jpg",
          "w": 1172,
          "h": 1172,
          "cap": "24 januari 2024"
        },
        {
          "f": "p9-01.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-02.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-03.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-04.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-05.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-06.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        },
        {
          "f": "p9-07.jpg",
          "w": 1440,
          "h": 959,
          "cap": "13 augustus 2023"
        }
      ]
    }
  ]
};
