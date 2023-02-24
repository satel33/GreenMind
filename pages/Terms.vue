<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title">
        Handelsbetingelser
      </h1>

      <h3 class="font-bold subtitle">
        Betingelser
      </h3>
      <p class="text">
        GreenMind A/S tilbyder køb og salg high-end elektronik samt reparation af telefoner, tablets og computere.
      </p>

      <h3 class="font-bold subtitle">
        Om GreenMind
      </h3>
      <p class="text">
        Hovedkontor:<br>
        GreenMind A/S<br>
        Brudelysvej 23<br>
        2820 Bagsværd<br>
        CVR-nr.: 36032804<br>
        Telefon: +45 4697 5050<br>
        E-mail: mail@greenmind.dk
      </p>

      <h3 class="font-bold subtitle">
        Betingelser ved køb og salg på webshop
      </h3>
      <p class="text bold">
        Nedenstående betingelser er til enhver tid gældende ved køb og salg online på greenmind.dk.
      </p>
      <p class="text">
        GreenMind A/S er berettiget til, uden varsel, at ændre betingelserne, og de gældende betingelser vil altid være at finde på:<br>
        <nuxt-link
          to="/handelsbetingelser"
          class="underline text-center y-link"
          :title="$t('Terms of trade')"
        >
          https://greenmind.dk/handelsbetingelser
        </nuxt-link>
      </p>
      <p class="text">
        Disse generelle vilkår og betingelser er gældende for alle forbrugere, der afgiver en ordre på greenmind.dk, som er ejet af GreenMind A/S.
      </p>

      <h3 class="font-bold subtitle">
        Betaling
      </h3>
      <p class="text">
        Betaling på webshop og i butikker kan gennemføres med følgende betalingskort: Dankort, Visa/Dankort, Visa Electron, Visa, MasterCard.Det er desuden muligt at betale med Mobilepay. Beløbet hæves først på dit kort, når varen afsendes. Vi opkræver ikke kortgebyrer. Hvis du betaler med Mobilepay trækkes beløbet dog med det samme. Der trækkes aldrig et større beløb, end det du har godkendt ved købet.<br>
        Alle kortbetalinger varetages af Adyen. De data, du sender i forbindelse med køb med betalingskort, er krypterede (SSL) og det er kun vores betalingsindløser Adyen, der kan læse dem. Hverken GreenMind A/S eller andre har mulighed for at læse de sikrede data.<br>
        Alle priser på greenmind.dk er opgivet i DKK og er inklusive moms.<br>
        Alle brugte produkter sælges efter de særlige regler for brugte varer, jf. momslovens kapitel 17. Dette betyder at køber kan derfor ikke fradrage købsmoms. For yderligere information henvises til fortjenstmargenordningen.<br>
        GreenMind A/S forbeholder sig ret til at bede om legitimation (billede og adresse) på udvalgte ordrer. Dette har til formål at forhindre misbrug af betalingskort.
      </p>

      <h3 class="font-bold subtitle">
        Priser, stand og tilbud
      </h3>
      <p class="text">
        Alle priser på produkter i webshoppen gælder kun ved køb i webshoppen, medmindre andet er anført. Alle varer er brugte varer, såfremt andet ikke er anført, hvilket oftest vil kunne ses på varen. Varer er defineret af en overordnet stand, som er nærmere beskrevet i stand-beskrivelsen på produktet. Der vil ikke kunne forventes samme levetid på batterier som ved et nyt batteri. Der medfølger ikke nødvendigvis en manual til det enkelte produkt – manualer kan i langt de fleste tilfælde downloades på producentens hjemmeside på internettet.
      </p>
      <p class="text">
        Brugte produkter forventes med alderen at have nedsat funktionsevne iht. sikkerhedsopdateringer fra producenterne. Generelt så forventes det at producenten vedligeholder sikkerhedsopdateringer på et givent produkt i minimum 5 år fra produktionsdato. Såfremt produktet er ældre end dette, så kan det ikke længere garantere at produktet kan modtage sikkerhedsopdateringer og bruges til f.eks netbank, nemID, mobilepay og ligestillede områder hvor der kræves nyeste sikkerhedsopdatering for at benytte hjemmeside eller app.
      </p>

      <h3 class="font-bold subtitle">
        Levering og fragt
      </h3>
      <p class="text">
        Vi bestræber os altid på at levere bestillinger på webshoppen så hurtigt som muligt. Som oftest afsendes bestillinger inden for 1-3 hverdage. Der kan også være varer, som viser sig at være udsolgt efter bestillingen er foretaget. I disse tilfælde vil du blive kontaktet med information om den forventede leveringstid og tilbud om alternative lign. varer. Som udgangspunkt bliver alle bestillinger forsøgt leveret til den angivne adresse og derefter lagt til afhentning i den nærmeste pakkeshop, hvis der ikke var nogen hjemme. Vi sender med PostNord. Prisen vil til enhver tid fremgå klart, inden du accepterer at købe varen. Når ordren er blevet afsendt, vil du modtage et Track & Trace nummer, så du kan følge leveringen.
      </p>
      <p class="text">
        Vi leverer kun til kunder i Danmark (We do not deliver to addresses outside of Denmark). Der leveres ikke til Færøerne og Grønland.
      </p>

      <h3 class="font-bold subtitle">
        Fortrydelsesret
      </h3>
      <p class="text">
        OBS; I forbindelse med julehandlen 2022, gives der yderligere bytteret på produkter købt imellem d 22/11 2022 og d 24/12 2022. Disse kan ombyttes indtil d 31/1 2023 mod at nedenstående betingelser forsat er opfyldt. Dette gælder også for produkter købt i forbindelse med ”Green Friday” og andre nedsatte vare. Denne bytteret gælder både produkter købt på vores hjemmeside eller fysisk i en af vores butikker. Hvis man ønsker at gøre brug af sin bytteret, men ikke kan finde noget i butikken man ønsker på nuværende tidspunkt, kan værdien ombyttes til et gavekort. Der gives ikke pengene retur ved benyttelse af bytteret.
        <br><br>
        Der er 14 dages fortrydelsesret på varer købt i webshoppen. De 14 dage regnes fra den dag ordren er modtaget. Såfremt du har bestilt flere forskellige varer i samme køb, men de leveres enkeltvist, løber fristen fra den dag, hvor du modtager den sidste vare. Ønsker du at benytte din returret, skal du, inden 14 dage fra modtagelsen, give os skriftlig besked. Dette gør du ved at kontakte vores kundeservice:
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link><br>
        Du skal returnere varen senest 14 dage efter, du har givet besked til os om fortrydelse af købet. Såfremt varen ikke er GreenMind A/S i hænde inden 14 dage fra fortrydelse, forbeholder GreenMind sig retten til at afvise returneringen. Produktet kan returneres i en af vores butikker, eller sendes til os efter anvisning fra Kundeservice. Kopi af faktura skal være vedlagt produktet ved returnering. Udgifter i forbindelse med returnering af vare dækkes ikke af GreenMind A/S. Hvis du har købt flere varer hos os, har du mulighed for at sende én eller flere varer retur, selvom de er købt i én ordre. Du kan ikke fortryde dit køb ved at nægte modtagelse af varen uden samtidig at give os besked pr. mail. Omkostninger forbundet med dette, vil blive fratrukket købesummen ved returnering.
      </p>
      <p class="text bold">
        Varens stand, når du sender den retur
      </p>
      <p class="text">
        Du hæfter kun for eventuel forringelse af varens værdi, som skyldes anden håndtering, end hvad der er nødvendigt for at fastslå varens art, egenskaber og den måde, den fungerer på. Du kan med andre ord prøve varen på samme måde, som hvis du prøvede den i en fysisk butik. Hvis varen er prøvet udover, hvad der er beskrevet ovenfor, betragter vi den som brugt, hvilket betyder, at du ved fortrydelse af købet kun får en del eller intet af købsbeløbet retur, afhængig af varens handelsmæssige værdi. For at modtage hele købsbeløbet retur må du altså gøre det samme, som man kan i en fysisk butik. Du må afprøve varen, men ikke tage den i egentlig brug. Ved køb af varer i brugt stand gælder, at enheden skal returneres i samme stand som den blev solgt i. Ved ønsket om at returnere en vare fra kategorien ’Ny – Ny vare’ skal denne stadig være ubrudt i originalemballagen. Hvis originalemballagen er brudt, vil et reduceret beløb blive refunderet, grundet værdiforringelse.
        <span class="bold">Returnering af panzerglass eller tilbehør</span>
        Ved returnering af panzerglass eller tilbehør, skal du være opmærksom på, at vi kan værdiforringe med op til 100%, hvis panzerglasset eller tilbehøret ikke sendes tilbage i ubrudt emballage.
        <span class="bold">Tilbagebetaling af købsbeløbet</span>
        Fortryder du dit køb, så får du som udgangspunkt udbetalt samme beløb, som du har indbetalt til os. I tilfælde af en værdiforringelse, som du hæfter for, fratrækkes denne ved tilbagebetaling. Vi refunderer alle betalinger modtaget fra dig, herunder leveringsomkostninger (det gælder dog ikke ekstra leveringsomkostninger i de tilfælde, hvor du har valgt en anden leveringsform, end den billigste form for standardlevering, som vi tilbyder), senest 14 dage fra den dag, hvor vi har modtaget din besked om, at du vil fortryde aftalen. Pengene vil blive refunderet til dig uden unødig forsinkelse og under alle omstændigheder senest 14 dage fra den dato, hvor vi har modtaget varen retur fra dig. Tilbagebetalingen vil blive gennemført med samme betalingsmiddel, som du benyttede ved den oprindelige transaktion. Vi kan tilbageholde tilbagebetalingen, indtil vi har modtaget varen retur. Ved tvivlsspørgsmål om returnering, skal køber kunne dokumentere at produktet er returneret og modtaget af GreenMind A/S.
      </p>

      <h3 class="font-bold subtitle">
        Reklamation
      </h3>
      <p class="text">
        Der ydes altid 24 måneders reklamationsret i henhold til købeloven. GreenMind A/S har valgt at give 3 års garanti, og derved udvide din reklamationsret til 36 måneder. Reklamationsretten omfatter mangler, der konstateres ved varens normale anvendelse. Reklamationsretten dækker ikke fejl, skader eller slitage, direkte eller indirekte opstået som følge af forkert betjening, misvedligeholdelse eller udefra kommende skade (dette omfatter også fejl som følge af væskeskade). Reklamation over fejl og mangler skal meddeles til os inden for rimelig tid, efter fejlen eller manglen er opdaget eller burde være opdaget. Alle følgeskader sket i forbindelse med fortsat brug efter fejlen er opstået, vil ikke være dækket af reklamationsretten. I forbindelse med reklamationssager bedes du indlevere varen i en af vores butikker eller henvende dig til vores kundeservice med henblik på løsning. Det er ikke muligt at indsende produktet til os med post, uden forudgående aftale med kundeservice. GreenMind A/S frasiger sig ethvert ansvar for produkter, der indsendes til en af vores adresser, uden forudgående aftale.<br>
        <br>
        Alle reklamationer skal håndteres af vores egne teknikere eller samarbejdspartnere. Vælger du selv at gå til anden reparatør, kan dette have indflydelse på din fremadrettede reklamationsret på produktet.<br
          <br
        >
        Fremvisning af en gyldig faktura/kvittering på køb, er et krav for at kunne gøre et reklamationskrav gældende over for GreenMind A/S.
      </p>
      <p class="text bold">
        Særlig opmærksomhed på ”vandafvisende” produkter
      </p>
      <p class="text">
        En række producenter – heriblandt Sony, Samsung og Apple – har markedsført deres produkter som “vandafvisende”, men frasiger i deres betingelser krav om dækning, såfremt produkterne udsættes for væskeskade. Det skyldes, at produkter markedsført som “vandafvisende” har en større resistens over for vand, såfremt uheldet er ude, men ikke er deciderede vandtætte og ikke kan benyttes i forbindelse med vand.<br>
        <br>
        Selvom produktet er markedsført som “vandafvisende” eller lignende betegnelse, følger de fortsat de normale retningslinjer i henhold til købeloven og er dermed ikke dækket, hvis udefra kommende skade er påført produktet. Der ydes derfor ingen former for dækning af produkter udsat for væskeskade.
      </p>
      <p class="text bold">
        Særlig opmærksomhed på sikkerhedsopdatering ved køb af brugt elektronik
      </p>
      <p class="text">
        GreenMind A/S garantere ikke at et produkt købt brugt, kan opdateres med nyeste sikkerhedsopdatering. Brugte produkter forventes at have nedsat funktionsevne iht. sikkerhedsopdateringer fra producenterne. Generelt så forventes det at producenten vedligeholder sikkerhedsopdateringer på et givent produkt i minimum 5 år fra produktionsdato. Såfremt produktet er ældre end dette, så kan det ikke længere garantere at produktet kan modtage sikkerhedsopdateringer og derfor benyttes til f.eks netbank, nemID, mobilepay og ligestillede områder hvor der kræves nyeste sikkerhedsopdatering for at benytte hjemmeside eller app.
      </p>

      <h3 class="font-bold subtitle">
        Garanti
      </h3>
      <p class="text">
        Ved køb af secondhand elektronik fra GreenMind A/S, tilbyder GreenMind A/S 3 års garanti for alle produkter.
      </p>

      <h3 class="font-bold subtitle">
        Reservedele tilknyttet køb/reparation af brugte produkter
      </h3>
      <p class="text">
        Hos GreenMind A/S benytter vi de bedste reservedele til reparation af vores produktet. Dette betyder at vi bestræber os på at sikre den højeste kvalitet på markedet. Det kan dog forekomme, at leverandører har indsat beskeder på dit produkt, der gør opmærksom på, at en reservedel har været skiftet. Dette har ingen praktisk betydning for brugen af produktet. Dette er noget producenter har valgt at gøre for større gennemsigtighed, når et produkt har fået udskiftet reservedele og ikke længere indeholder de dele som produktet er født med. Dette har ingen betydning for brugen af produktet og/eller kvaliteten af reservedelen på produktet. Vi beklager den ulejlighed som måtte forekomme i forbindelse med dette.
      </p>

      <h3 class="font-bold subtitle">
        Ved salg af enhed til GreenMind
      </h3>
      <p class="text bold">
        Forudsætning for salg af varer til GreenMind
      </p>
      <p class="text">
        Når du sælger brugte varer til GreenMind gælder følgende betingelser:
        <ul>
          <li>Du skal være mindst 18 år gammel for salg af en værdi større end 2000 kr</li>
          <li>Du skal være mindst 15 år gammel for salg af en værdi mindre end eller lig med 2000 kr</li>
          <li>Du skal have en NemKonto.</li>
          <li>Varen skal være din egen personlige ejendom, og du skal i øvrigt have ret til at sælge den. I tvivlstilfælde kan GreenMind A/S kræve dokumentation for ejerskab, f.eks. i form af en faktura eller ordrebekræftelse.</li>
        </ul>
        Når du sælger en vare til os, kan du vælge imellem at få det som gavekort eller udbetalt til din NemKonto. Vi kan i flere tilfælde tilbyde dig en højere pris for produktet, såfremt det udbetales som gavekort til GreenMind A/S. Et gavekort til GreenMind A/S kan kun benyttes til køb af andre vare og kan ikke returneres. En udbetaling af kontant, tilbydes kun som udbetaling til NemKonto.
      </p>
      <p class="text bold">
        Fremgangsmåde for salg af varer til GreenMind A/S
      </p>
      <p class="text">
        Når GreenMind A/S modtager en vare, vil varens tilstand blive vurderet af enten GreenMind A/S eller en af vores godkendte samarbejdspartnere. Snarest muligt, og senest efter 14 dage vil du modtage en e-mail med vores tilbud på køb af den/de indsendte varer. Du skal skriftligt (ved besvarelse af e-mailen) oplyse GreenMind A/S, om du ønsker at indgå i handlen eller ej. Er dette ikke tilfældet, vil du få returneret den/de varer, du ikke ønsker at sælge. GreenMind A/S står for udgiften til returforsendelsen i forbindelse med afvisning af tilbud.<br>
        <br>
        GreenMind A/S forbeholder sig retten til at afvise en vare, såfremt den er i en så dårlig stand, at videresalg ikke er muligt uden tab. Hvis du har undladt at oplyse om væsentlige skader eller defekter, forbeholder GreenMind A/S sig desuden retten til at kræve omkostninger for returforsendelsen dækket af dig. Når du har accepteret en handel, er denne bindende for begge parter. GreenMind A/S forbeholder sig dog retten til inden for rimelig tid, at hæve handlen og kræve omkostninger/tab dækket, såfremt det viser sig, at varen ikke tilhører dig eller hvis varen har en ikke uvæsentlig defekt eller skade, som du ikke oplyste om forud for salget.
      </p>
      <p class="text bold">
        Indhold/data på indleverede enheder (vigtigt!)
      </p>
      <p class="text">
        Det er sælgers ansvar at fjerne indhold/data fra enheder, inden disse overgives til GreenMind A/S, ligesom det er sælgers ansvar at gemme indhold/data, hvis de ønskes bevaret. Af datasikkerhedsmæssige hensyn, så sletter GreenMind A/S altid alt data på indleverede enheder. Denne sletning er dog ikke garanti for, at data ikke kan genskabes.<br>
        <br>
        GreenMind A/S kan ikke drages til ansvar for manglende fjernelse af indhold/data fra indleverede enheder, uanset hvordan rensningen er foregået.<br>
        <br>
        Hvis GreenMind A/S bliver opmærksom på indhold/data, som strider mod gældende lovgivning, forbeholder GreenMind A/S sig retten til at anmelde forholdet til Politiet og/eller andre relevante myndigheder og rettighedshavere.
      </p>

      <h3 class="font-bold subtitle">
        Betingelser ved køb af reparationsydelse
      </h3>
      <h3 class="font-bold subtitle">
        Aftaleindgåelse
      </h3>
      <p class="text">
        Hvis en kunde ønsker at indlevere sin enhed til reparation hos GreenMind A/S, så er der to mulige fremgangsmåder:
      </p>
      <ul class="list-disc">
        <li class="text">
          Kunden kan besøge en af GreenMind A/S’ butikker og indlevere sin enhed personligt. Her skal kunden oplyse kontaktinformationer og informationer om den enhed, som kunden ønsker repareret, herunder en udførlig fejlbeskrivelse.
        </li>
        <li class="text">
          Kunden kan sende sin enhed til GreenMind A/S med posten. Vejledning til indsendelse af enheder til reparation kan findes under punktet ”Forsendelse” Aftalen mellem kunde og GreenMind A/S anses som værende indgået, når GreenMind A/S har modtaget kundens enhed.
        </li>
      </ul>
      <p class="text">
        Ved indlevering i butik gives der altid et estimat på hvor meget reparationen vil koste. Ved diagnose vil kunden blive kontaktet for accept af reparationen inden denne påbegyndes.<br>
        <br>
        På indsendte enheder repareres udelukkende de skader, som står beskrevet i følgebrevet. Andre reparationer vil kun blive udført med kundens accept.
      </p>

      <h3 class="font-bold subtitle">
        Tilbehør ved indlevering
      </h3>
      <p class="text">
        Ved indlevering af enheder til reparation, både ved indlevering i butik og ved indsendelse med posten, er det vigtigt, at GreenMind A/S kun modtager den defekte enhed, og at eventuelt tilbehør i form af beskyttelsescovers, opladere etc. og SIM-kort ikke vedlægges (medmindre andet er aftalt).<br>
        <br>
        GreenMind A/S kan ikke stilles til ansvar for bortkommet tilbehør.
      </p>

      <h3 class="font-bold subtitle">
        Reparationstid
      </h3>
      <p class="text">
        Ved indlevering i butik bestræber vi os på at reparere din enhed indenfor 1-2 timer, men der kan i perioder med spidsbelastning gå længere tid. Ligeledes kan det ske, at vi ikke har reservedelen på lager, hvilket også kan forlænge reparationstiden. Du vil dog altid blive oplyst om dette, når du besøger butikken eller du er velkommen til at ringe til vores kundeservice.<br>
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link><br>
        <br>
        Ved diagnoser skal der forventes at dette kan tage fra 1-10 arbejdsdage, da vi skal bruge længere tid på test af enheden og evt. rensning. Derudover skal der påregnes yderligere 5-7 arbejdsdage, hvis det er en Apple-enhed der skal ombyttes.
      </p>

      <h3 class="font-bold subtitle">
        Forsendelse
      </h3>
      <p class="text">
        Kunden er selv ansvarlig for forsendelsen af sin enhed til GreenMind. Vi anbefaler at sende enheden som pakkepost, da dette garanterer, at enheden er forsikret under fragten og ydermere kan spores via Track & Trace. Sendes enheden som et almindeligt brev, er der ingen forsikring og ej heller nogen mulighed for at spore forsendelsen – derfor frarådes dette på det kraftigste.<br>
        <br>
        Tilsendte enheder bliver efter endt reparation, medmindre andet er angivet, sendt retur til afsender adressen.
      </p>

      <h3 class="font-bold subtitle">
        Vejledning til indsendelse af enhed med posten
      </h3>
      <p class="text">
        Vi sender kun enheder som pakkepost og vi anbefaler på det kraftigste, at du gør det samme ved indsendelse af din enhed. På den måde er du forsikret, såfremt den ikke måtte nå frem eller forsvinde under fragten. Se en trin for trin-guide til indsendelse af enhed til reparation her:<br>
        <nuxt-link
          :to="{ name: 'sendDeviceRepair' }"
          class="underline text-center y-link"
          title="Send din enhed til reparation"
        >
          Send din enhed til reparation
        </nuxt-link><br>
      </p>

      <h3 class="font-bold subtitle">
        Anvendte reservedele
      </h3>
      <p class="text">
        Ved udskiftning af skærm eller batteri på iPhones benytter vi i de fleste tilfælde originale Apple-reservedele leveret direkte fra Apple. Alternativt benytter vi OEM-dele (Original Equipment Manufacturer), som er reservedele direkte fra producenten. I alle tilfælde er vores reservedele af absolut højeste kvalitet, og vi yder 24 mdr. reklamationsret på den udskiftede reservedel. På vores prislister fremgår det altid tydeligt, om vi benytter os af originale reservedele fra Apple eller OEM-dele på den pågældende model. Uanset om reservedelen er en original reservedel fra Apple eller en OEM-reservedel, udføres reparationen altid af en Apple-certificeret tekniker.<br>
        <br>
        Ved reparation af andre mærker og modeller end iPhones benytter vi altid originale reservedele, hvis muligt og alternativt OEM-dele af højeste kvalitet. Altid med 24 måneders reklamationsret på den udskiftede reservedel.
      </p>

      <h3 class="font-bold subtitle">
        Forbehold for manglende reservedele
      </h3>
      <p class="text">
        Alle reparationstider er med forbehold for udsolgte reservedele. GreenMind A/S har altid et stort lager med langt de fleste reservedele, men det kan ske, at enkelte reservedele ikke er på lager og kundens enhed derfor først kan repareres, når den pågældende reservedel er på lager igen.
      </p>

      <h3 class="font-bold subtitle">
        Overtagelse af restgaranti og/eller resterende reklamationsret ved reparation på produkter via forsikringsskade
      </h3>
      <p class="text">
        GreenMind A/S overtager både resterende garanti og reklamationsret ved reparation af produkter via et forsikringsselskab på de vilkår, der er beskrevet nedenfor.
      </p>

      <h3 class="font-bold subtitle">
        Vilkår for overtagelse af resterende garanti og/eller reklamationsret
      </h3>
      <p class="text">
        I henhold til dansk købelov er produkter købt af privatpersoner i Danmark dækket af reklamationsretten i op til 24 måneder. Hvis GreenMind A/S reparerer et produkt inden reklamationsretten er udløbet, påtager GreenMind A/S sig ansvaret for udbedring af nye fejl, der måtte opstå indtil reklamationsretten udløber.<br>
        <br>
        Uagtet om produktet før reparationstidspunktet har været udsat for fysisk overlast, overtager GreenMind A/S de resterende måneder af reklamationsretten (op til 24 mdr) på produktet. Produktet skal dog ved reparationen af en fysisk skade udbedres for alle fejl GreenMind A/S burde finde.<br>
        <br>
        Den resterende periode er defineret ud fra købstidspunktet for produktet og skal dokumenteres af kunden med en gyldig købskvittering. Skjulte fejl og defekter, der reklameres for i op til 90 dage efter GreenMind A/S’ reparation, behandles som fejl og mangler, der ikke blev observeret ved den oprindelige reparation. GreenMind A/S forbeholder sig retten til at opkræve betaling for udbedring af disse fejl eller at tilbyde en kreditering af alle udgifter forbundet med den oprindelige reparation, hvis de samlede reparationsomkostninger ender med at overstige nyprisen på produktet. Kunden er i sin ret til at vælge at få krediteret alle reparationerne, hvis denne ikke ønsker at betale for yderligere reparationer.
      </p>

      <h3 class="font-bold subtitle">
        Vilkår for overtagelse ift. “vandafvisende” produkter
      </h3>
      <p class="text">
        Når GreenMind A/S overtager resterende garanti og reklamationsret, er det fortsat de oprindelige betingelser fra det oprindelige købssted, der er gældende. GreenMind A/S giver hverken bedre eller ringere betingelser end oprindeligt.<br>
        <br>
        En række producenter – heriblandt Sony, Samsung og Apple – har markedsført deres produkter som “vandafvisende”, men frasiger i deres betingelser krav om dækning, såfremt produkterne udsættes for væskeskade. Det skyldes, at produkter markedsført som “vandafvisende” har en større resistens over for vand, såfremt uheldet er ude, men ikke er deciderede vandtætte og ikke kan benyttes i forbindelse med vand. Selvom produktet er markedsført som “vandafvisende” eller lign., følger de fortsat de normale retningslinjer i henhold til købeloven og er dermed ikke dækket, hvis udefra kommende skade er påført produktet.<br>
        <br>
        Der ydes derfor ingen former for dækning af produkter udsat for væskeskade.
      </p>

      <h3 class="font-bold subtitle">
        Undtagelser vedr. overtagelse af garanti og/eller reklamationsret på reparerede produkter
      </h3>
      <p class="text">
        Overtagelsen af reklamationsretten bortfalder, hvis produktet er blevet beskadiget i forbindelse med en reparation udført af en anden reparatør eller der er monteret uoriginale reservedele.<br>
        <br>
        Produkter købt i udlandet er ikke omfattet af dansk købelov.<br>
        <br>
        GreenMind A/S’ overtagelse af garanti og reklamationsret bortfalder i alle tilfælde, hvis produktet GreenMind A/S har repareret efterfølgende har været udsat for fysisk overlast eller andre udefra kommende skader (eks. væskeskade eller tab) – GreenMind A/S’ overtagelse af reklamationsretten indbefatter ikke overtagelse af eventuelle ombytningsprogrammer eller udbedringsprogrammer leverandøren måtte indføre for at ombytte eller udbedre enheder, der er ramt af en fabrikationsfejl. Endvidere dækker GreenMind A/S ikke generelle fabrikationsfejl, uanset om den generelle fabrikationsfejl er blevet anerkendt af leverandøren eller ej – GreenMind A/S’ overtagelse af garanti og reklamationsret gælder kun selve enheden – en telefon, tablet eller laptop – og ikke andet tilbehør (hovedtelefoner, oplader etc.), som fulgte med ved det oprindelige køb.
      </p>

      <h3 class="font-bold subtitle">
        Reklamation
      </h3>
      <p class="text">
        Vi yder 24 måneders reklamationsret i henhold til købeloven.<br>
        Reklamationsretten omfatter mangler, der konstateres ved varens normale anvendelse. Reklamationsretten dækker ikke fejl, skader eller slitage, direkte eller indirekte opstået som følge af forkert betjening, misvedligeholdelse eller udefra kommende skade (dette omfatter også fejl som følge af væskeskade). Reklamation over fejl og mangler skal meddeles til os inden for rimelig tid, efter fejlen eller manglen er opdaget eller burde være opdaget. Alle følgeskader sket i forbindelse med fortsat brug efter fejlen er opstået, vil ikke være dækket af reklamationsretten. I forbindelse med reklamationssager bedes du indlevere varen i en af vores butikker eller henvende dig til vores kundeservice med henblik på løsning.
      </p>
      <p class="text">
        Det er ikke muligt at indsende produktet til os med post, uden forudgående aftale med kundeservice. GreenMind frasiger sig ethvert ansvar for produkter, der indsendes til en af vores adresser, uden forudgående aftale.<br>
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link><br>
        <br>
        Alle reklamationer skal håndteres af vores egne teknikere eller samarbejdspartnere. Vælger du selv at gå til anden reparatør, kan dette have indflydelse på din fremadrettede reklamationsret på produktet. Fremvisning af en gyldig faktura/kvittering på køb, er et krav for at kunne gøre et reklamationskrav gældende over for GreenMind A/S.
      </p>

      <h3 class="font-bold subtitle">
        Priser og betaling
      </h3>
      <p class="text">
        Alle priser på greenmind.dk er opgivet i DKK og er inklusive afgifter og moms. Betaling kan ske med kontanter eller betalingskort i alle GreenMind A/S’ butikker. Alle betalinger i butikker kan gennemføres med følgende betalingskort: Dankort, Visa/Dankort, Visa Electron, Visa, MasterCard, American Express, Diners Club, Maestro og JCB. Det er desuden muligt at betale med Mobilepay.<br>
        <br>Beløbet hæves først på dit kort, når varen afsendes. Vi opkræver ikke kortgebyrer. Hvis du betaler med Mobilepay trækkes beløbet dog med det samme. Der trækkes aldrig et større beløb, end det du har godkendt ved købet.<br>
        <br>Alle kortbetalinger varetages af Adyen. De data, du sender i forbindelse med køb med betalingskort, er krypterede (SSL) og det er kun vores betalingsindløser Adyen, der kan læse dem. Hverken GreenMind A/S eller andre har mulighed for at læse de sikrede data. Alle priser på greenmind.dk er opgivet i DKK og er inklusiv moms.
      </p>

      <h3 class="font-bold subtitle">
        Backup af data
      </h3>
      <p class="text">
        Kunder er selv ansvarlige for at tage backup af deres data inden en enhed bliver indleveret eller indsendt til reparation. GreenMind A/S bestræber sig altid på, at bevare alt data på kunders enheder, men kan ikke gøres ansvarlig for tab af data i forbindelse med en reparation.
      </p>

      <h3 class="font-bold subtitle">
        Persondata
      </h3>
      <p class="text">
        Læs om GreenMind A/S' privatlivspolitik her:<br>
        <nuxt-link
          :to="{ name: 'gdpr' }"
          class="underline text-center y-link"
          title="Privatlivspolitik"
        >
          Privatlivspolitik
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">
        Fortrolighed
      </h3>
      <p class="text">
        Ved reparation af kunders enheder har GreenMind A/S’ teknikere adgang til fortrolige oplysninger og derfor er alle medarbejdere hos GreenMind A/S underlagt tavshedspligt.
      </p>

      <h3 class="font-bold subtitle">
        Persondatapolitik
      </h3>
      <p class="text">
        Ingen personlige oplysninger, der registreres af os bliver på noget tidspunkt overdraget, solgt eller gjort tilgængelige for tredjepart. Alle informationer opbevares og behandles efter gældende lovgivning om persondata og er kun tilgængelige for betroede medarbejdere hos GreenMind A/S. Vi samarbejder herudover med en række andre virksomheder, som opbevarer og behandler data. Virksomhederne behandler udelukkende oplysninger på vores vegne og må ikke benytte dem til egne formål. Vi samarbejder udelukkende med databehandlere i EU eller i lande, der kan give dine oplysninger en tilstrækkelig beskyttelse.<br>
        <br>
        Ved køb og salg på webshoppen udbeder vi os en række kontaktoplysninger om dig, heriblandt navn, telefonnummer e-mailadresse og fysisk adresse. Disse informationer bruges udelukkende til behandling af ordren. Informationerne lagres elektronisk hos GreenMind A/S og gemmes i fem år, jf. bogføringsloven.<br>
        <br>
        Den dataansvarlige er GreenMind A/S, Brudelysvej 23, 2820 Bagsværd, CVR: 36032804<br>
        <br>
        Oplysninger afgivet til GreenMind videregives eller sælges på ingen måde til tredjepart, og vi registrerer ingen personfølsomme oplysninger. Som registreret hos GreenMind har du altid ret til at gøre indsigelse mod registreringen. Du har også ret til indsigt i, hvilke oplysninger, der er registreret om dig.<br>
        <br>
        Læs hele vores Privatlivspolitik her:<br>
        <nuxt-link
          :to="{ name: 'gdpr' }"
          class="underline text-center y-link"
          title="Privatlivspolitik"
        >
          Privatlivspolitik
        </nuxt-link><br>
        <br>
        Disse rettigheder har du efter Persondataloven og henvendelse i forbindelse hermed rettes til GreenMind A/S via email til vores kundeservice:<br>
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">
        Force majeure
      </h3>
      <p class="text">
        GreenMind A/S kan i intet tilfælde gøres ansvarlig for forhold, der må betegnes som force majeure, herunder, men ikke begrænset til, krig, optøjer, strejke, ildsvåde, naturkatastrofer, valutarestriktioner, import- eller eksportrestriktioner, afbrydelse af almindelig samfærdsel, afbrydelse eller svigt i energiforsyningen eller kommunikationssystemer.
      </p>

      <h3 class="font-bold subtitle">
        Klageadgang
      </h3>
      <p class="text">
        Hvis du vil klage over dit køb, skal du rette henvendelse til vores kundeservice:<br>
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link><br>
        <br>
        Hvis det mod forventning ikke lykkes os at finde en løsning, kan du indgive en klage til relevante nævn på området, såfremt betingelserne herfor er opfyldt. GreenMind A/S vil som udgangspunkt altid følge afgørelser fra Nævnenes Hus.<br>
        Nævnenes Hus<br>
        Toldboden 2<br>
        8800 Viborg<br>
        <a
          href="https://naevneneshus.dk"
          class="underline ylink"
          target="_blank"
        >www.naevneneshus.dk</a><br>
        <br>
        Har du bopæl i et andet EU-land end Danmark, kan du klage til EU-Kommissionens online klageportal her –
        <a
          href="https://ec.europa.eu/odr"
          class="underline ylink"
          target="_blank"
        >https://ec.europa.eu/odr</a><br>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>
