# Documentație Proiect: Metal-Blog

## 1. Prezentare Generală a Proiectului

Acest proiect este o aplicație web pentru un blog axat pe muzica metal. Permite utilizatorilor să vizualizeze postări și să citească articole. Această documentație descrie tehnologiile utilizate pentru construirea site-ului, cu explicații potrivite pentru o prezentare de proiect la nivel de liceu.

## 2. Tehnologii de Bază

Aplicația este construită folosind un set modern și puternic de tehnologii web.

### Next.js

*   **Ce este:** Un framework popular și puternic pentru construirea de aplicații web folosind biblioteca React.
*   **De ce este folosit:** Next.js oferă o structură robustă pentru crearea de site-uri web. Include funcționalități precum un sistem de rutare bazat pe fișiere (ceea ce face navigarea între pagini intuitiv de programat), randare pe server (server-side rendering), care ajută site-ul să se încarce rapid și să fie ușor de găsit de motoarele de căutare precum Google, și optimizări pentru imagini și fonturi. Acest proiect folosește **App Router**, care este cea mai recentă și recomandată metodă de a construi aplicații în Next.js.

*   **Exemplu de Cod (Rutare bazată pe fișiere):**
    Calea fișierului `src/app/posts/[slug]/page.tsx` definește în sine o pagină dinamică. Orice URL precum `/posts/hello-world` va fi gestionat de această componentă, iar valoarea `"hello-world"` este pasată ca parametrul `slug`.

    ```tsx
    // src/app/posts/[slug]/page.tsx

    // Această interfață definește parametrii așteptați din URL
    interface PostPageProps {
      params: {
        slug: string;
      };
    }

    // Componenta primește obiectul `params`
    export default async function PostPage({ params }: PostPageProps) {
      // Acum poți folosi `params.slug` pentru a prelua și afișa postarea specifică
      const post = await getPostData(params.slug);

      return (
        <div>
          <h1>{post.title}</h1>
          <article>{post.content}</article>
        </div>
      );
    }
    ```

### React

*   **Ce este:** O bibliotecă JavaScript pentru construirea de interfețe utilizator (UI). Gândește-te la ea ca la o trusă de scule pentru crearea părților vizuale ale unui site web.
*   **De ce este folosit:** React permite dezvoltatorilor să construiască interfața din "componente" reutilizabile. De exemplu, o componentă `PostCard` poate fi proiectată o singură dată și apoi refolosită pentru a afișa fiecare postare de pe pagina principală. Acest lucru face codul curat, organizat și mai ușor de gestionat.

*   **Exemplu de Cod (Componentă React):**
    O componentă este de obicei o funcție care returnează o sintaxă asemănătoare cu HTML, numită JSX. Acest exemplu arată o componentă simplă de tip buton.

    ```tsx
    // src/app/components/DeleteButton.tsx

    import { Button } from 'react-bootstrap';

    // 'Props' sunt proprietăți pasate componentei
    interface DeleteButtonProps {
      postId: string;
    }

    export default function DeleteButton({ postId }: DeleteButtonProps) {
      
      const handleDelete = () => {
        console.log(`Deleting post ${postId}`);
        // Logică pentru a apela un API care să șteargă postarea
      };

      return (
        <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button>
      );
    }
    ```

### TypeScript

*   **Ce este:** Un limbaj de programare care este un "superset" al JavaScript. Adaugă funcționalități peste JavaScript, cea mai notabilă fiind "tipizarea statică" (static typing).
*   **De ce este folosit:** În termeni simpli, TypeScript ajută la prevenirea erorilor. Permite dezvoltatorului să definească "forma" așteptată a datelor. De exemplu, putem specifica faptul că `title` (titlul) unei postări trebuie să fie întotdeauna un șir de text. Dacă din greșeală încercăm să folosim un număr, TypeScript va semnala o eroare în timpul dezvoltării, cu mult înainte ca codul să ajungă la utilizator. Acest lucru face aplicația mai fiabilă.

*   **Exemplu de Cod (Definirea unui Tip):**
    O `interface` este folosită pentru a defini structura unui obiect. Acest lucru asigură că orice obiect de tip `Post` din aplicație va avea o structură consistentă.

    ```typescript
    // src/app/types/Post.ts

    export interface Post {
      slug: string;
      title: string;
      author: string;
      publishDate: string; // ex: "2024-10-26"
      content: string;
    }
    ```

## 3. Stil și Interfață Utilizator

### Bootstrap & React-Bootstrap

*   **Ce sunt:** Bootstrap este un framework CSS masiv care oferă componente pre-proiectate precum bare de navigare, butoane, carduri și grile. React-Bootstrap este o bibliotecă care "împachetează" aceste componente pentru a putea fi folosite fluid într-o aplicație React.
*   **De ce sunt folosite:** Utilizarea unui framework precum Bootstrap accelerează dramatic dezvoltarea. Oferă un aspect profesional și o senzație plăcută "din cutie" și asigură că site-ul este "responsive", ceea ce înseamnă că își va ajusta automat layout-ul pentru a arăta excelent pe orice dispozitiv, de la un monitor mare de desktop la un ecran mic de telefon mobil.

*   **Exemplu de Cod (Folosirea unei componente Card):**
    În loc să scrii HTML și CSS complex pentru un card, poți importa componenta `Card` din `react-bootstrap` și să o folosești direct.

    ```tsx
    // src/app/page.tsx (Simplificat)

    import { Card, Button } from 'react-bootstrap';
    import { Post } from './types/Post'; // Presupunând că tipurile sunt definite

    export default function HomePage() {
      const posts: Post[] = [/* ...array cu obiecte de tip post... */];

      return (
        <div>
          {posts.map(post => (
            <Card key={post.slug} style={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>By {post.author}</Card.Text>
                <Button variant="outline-light" href={`/posts/${post.slug}`}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    }
    ```

### CSS Global

*   **Ce este:** O foaie de stil personalizată localizată la `src/app/globals.css`.
*   **De ce este folosit:** În timp ce Bootstrap oferă componentele principale, acest fișier este folosit pentru a aplica stiluri personalizate și ajustări pe întreaga aplicație. Aici sunt definite fonturile de bază, culorile de fundal și alte alegeri de design la nivel de site pentru a oferi blogului o identitate unică.

*   **Exemplu de Cod (Definirea stilurilor pentru body):**
    Acest fragment din `globals.css` setează o culoare de fundal închisă și o culoare de text deschisă pentru tag-ul `<body>` al întregului site.

    ```css
    /* src/app/globals.css */

    body {
      background-color: #121212;
      color: #e1e1e1;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    a {
      color: #bb86fc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
    ```

## 4. Mediu de Dezvoltare și Unelte

### Node.js

*   **Ce este:** Un mediu de execuție care permite rularea codului JavaScript pe un server, în afara unui browser web.
*   **De ce este folosit:** Uneltele moderne de dezvoltare web, inclusiv Next.js, sunt construite pe Node.js. Acesta rulează serverul local de dezvoltare, construiește fișierele finale ale site-ului și gestionează toate pachetele proiectului.

### npm (Node Package Manager)

*   **Ce este:** Managerul de pachete implicit pentru Node.js. Este folosit pentru a instala și gestiona toate bibliotecile și framework-urile externe (precum React, Next.js și Bootstrap) de care depinde proiectul. Fișierul `package.json` este fișierul de configurare pentru npm, listând toate dependențele.

## 5. Controlul Versiunilor & Colaborare

### Git
*   **Ce este:** Git este un **sistem de control al versiunilor**. Gândește-te la el ca la un "istoric" și un buton de "undo" puternic pentru întregul tău proiect. Acesta face "instantanee" (numite "commits") ale codului tău în diferite momente.
*   **De ce este folosit:** Îți permite să salvezi munca în orice stadiu și să revii la o versiune anterioară dacă o modificare introduce o eroare. Este unealta standard pentru urmărirea modificărilor în dezvoltarea software, prevenind pierderea datelor și gestionând diferite funcționalități.

*   **Exemplu de Cod (Flux de lucru de bază):**
    Un flux de lucru tipic implică adăugarea fișierelor modificate, crearea unui commit cu un mesaj descriptiv și apoi trimiterea acelor modificări către un repozitoriu la distanță.
    ```bash
    # Pregătește un fișier pentru următorul commit
    git add src/app/page.tsx

    # Creează un instantaneu (commit) al modificărilor pregătite
    git commit -m "feat: Actualizează layout-ul paginii principale"

    # Trimite commit-ul către un server la distanță precum GitHub
    git push
    ```

### GitHub
*   **Ce este:** GitHub este o platformă web pentru găzduirea repozitoriilor Git. Este un loc pe internet unde îți poți stoca codul și colabora cu alții.
*   **De ce este folosit:** GitHub servește ca backup central, la distanță, pentru codul acestui proiect. Prin "împingerea" (pushing) commit-urilor către GitHub, codul este salvat online, protejându-l de problemele computerului local. De asemenea, oferă o interfață web pentru a vizualiza codul, a urmări problemele și a gestiona istoricul proiectului. Repozitoriul acestui proiect este găzduit pe GitHub.

## 6. Publicare și Găzduire (Deployment & Hosting)

Acest proiect este conceput pentru a fi găzduit pe un server propriu (self-hosted) cu costuri reduse, ceea ce reprezintă o provocare inginerească valoroasă din lumea reală.

### Raspberry Pi
*   **Ce este:** Un computer de mici dimensiuni, pe o singură placă (single-board computer), de mărimea unui card de credit.
*   **De ce este folosit:** Acționează ca server fizic pentru aplicația web. Consumul redus de energie îl face perfect pentru a funcționa 24/7 ca un server de acasă, fără un cost ridicat la electricitate. Aplicația Next.js rulează direct pe sistemul de operare al Raspberry Pi (o versiune de Linux, precum Raspberry Pi OS).

### Nginx Reverse Proxy
*   **Ce este:** Nginx (pronunțat "Engine-X") este un server web de înaltă performanță. În acest proiect, este configurat ca un **reverse proxy**.
*   **De ce este folosit:** În loc să expună aplicația Next.js direct pe internet, Nginx stă în fața ei și acționează ca un recepționer pentru traficul web. Primește toate cererile de la internet și le redirecționează către aplicația Next.js, care rulează pe un port intern (de exemplu, portul 3000). Aceasta este o practică standard în industrie pentru:
    *   **Securitate:** Ascunde serverul aplicației de internetul public.
    *   **Performanță:** Nginx este foarte eficient în gestionarea multor conexiuni.
    *   **Flexibilitate:** Poate gestiona mai multe site-uri web pe același Raspberry Pi și poate gestiona certificate SSL/TLS pentru conexiuni HTTPS sigure.

### Dynamic DNS (DDNS)
*   **Ce este:** Un serviciu care mapează un nume de domeniu (de exemplu, `my-metal-blog.example.com`) la o adresă IP dinamică, adică în schimbare.
*   **De ce este folosit:** Majoritatea conexiunilor la internet de acasă au o adresă IP dinamică de la furnizorul de servicii de internet (ISP), care se poate schimba periodic. Un serviciu DDNS actualizează automat numele de domeniu pentru a indica noua adresă IP ori de câte ori aceasta se schimbă. Acest lucru asigură că site-ul web este întotdeauna accesibil folosind același nume de domeniu memorabil.

### Port Forwarding
*   **Ce este:** O regulă de configurare setată pe routerul de acasă.
*   **De ce este folosit:** În mod implicit, routerele de acasă blochează traficul de intrare din motive de securitate. Port forwarding-ul îi spune routerului să deschidă anumite "porturi" (precum portul 80 pentru HTTP și 443 pentru HTTPS) și să redirecționeze orice trafic care sosește pe acele porturi către adresa IP internă a Raspberry Pi-ului.

### Cum Funcționează Totul Împreună

Iată călătoria unei cereri de la un utilizator la aplicație:

1.  Un utilizator introduce numele tău de domeniu în browser.
2.  Serviciul **Dynamic DNS** direcționează cererea către adresa IP curentă a rețelei tale de acasă.
3.  Cererea ajunge la **routerul** tău de acasă.
4.  Regula de **Port Forwarding** a routerului trimite cererea către **Raspberry Pi**.
5.  **Nginx** pe Raspberry Pi primește cererea și o redirecționează către aplicația Next.js.
6.  Aplicația Next.js trimite răspunsul înapoi prin același lanț.