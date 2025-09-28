/**
 * CONFIGURAZIONE TAMAGUI - Guida per principianti
 * 
 * Questo file è il cuore della configurazione di Tamagui per la tua app.
 * Tamagui è un sistema di design che ti permette di creare componenti
 * stilizzati con performance ottimali e supporto per temi, animazioni, ecc.
 */

// ============================================================================
// IMPORTAZIONI - Tutti i moduli necessari per configurare Tamagui
// ============================================================================

import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

// Componenti base che Tamagui offre già pronti, ma che puoi personalizzare
import { createTamagui, styled, SizableText, H1, YStack, Button as ButtonTamagui } from 'tamagui';

// ============================================================================
// ANIMAZIONI - Definisce come si comportano le transizioni nei tuoi componenti
// ============================================================================

/**
 * Le animazioni in Tamagui sono basate su spring physics (fisica delle molle)
 * Ogni animazione ha parametri che controllano velocità, rimbalzo, ecc.
 */
const animations = createAnimations({
  // Animazione con molto rimbalzo, utile per feedback visivi importanti
  bouncy: {
    damping: 10,      // Quanto velocemente si ferma il rimbalzo (più basso = più rimbalzo)
    mass: 0.9,        // "Peso" dell'elemento animato
    stiffness: 100,   // Quanto è rigida la molla (più alto = più veloce)
    type: 'spring',   // Tipo di animazione (spring = molla)
  },
  // Animazione lenta e dolce, per transizioni rilassanti
  lazy: {
    damping: 20,      // Più damping = meno rimbalzo
    type: 'spring',
    stiffness: 60,    // Stiffness bassa = animazione più lenta
  },
  // Animazione rapida e diretta, per azioni immediate
  quick: {
    damping: 20,
    mass: 1.2,        // Massa più alta
    stiffness: 250,   // Stiffness alta = molto veloce
    type: 'spring',
  },
});

// ============================================================================
// FONTS - Configurazione dei caratteri tipografici
// ============================================================================

/**
 * createInterFont() crea una configurazione per il font Inter
 * che include automaticamente tutte le varianti di peso e dimensione
 */
const headingFont = createInterFont(); // Font per i titoli
const bodyFont = createInterFont();    // Font per il testo normale

// ============================================================================
// COMPONENTI CUSTOM - I tuoi componenti personalizzati basati su quelli di Tamagui
// ============================================================================

/**
 * Container principale - Wrapper per tutta la tua app
 * styled(YStack, {...}) prende un componente Tamagui esistente e lo personalizza
 */
export const Container = styled(YStack, {
  flex: 1,        // Occupa tutto lo spazio disponibile
  padding: 24,    // Padding interno di 24px su tutti i lati
});

/**
 * Componente Main - Area principale del contenuto
 */
export const Main = styled(YStack, {
  flex: 1,                          // Occupa tutto lo spazio disponibile
  justifyContent: 'space-between',  // Distribuisce i figli con spazio tra loro
  maxWidth: 960,                    // Larghezza massima per non essere troppo largo su desktop
});

/**
 * Titolo personalizzato basato su H1 di Tamagui
 * H1 è già un componente heading pronto, noi lo personalizziamo
 */
export const Title = styled(H1, {
  color: '#000',    // Colore nero
  size: '$12',      // Dimensione usando i token di Tamagui ($12 è una size predefinita)
});

/**
 * Sottotitolo basato su SizableText (testo ridimensionabile)
 */
export const Subtitle = styled(SizableText, {
  color: '#38434D',  // Grigio scuro
  size: '$9',        // Dimensione più piccola del titolo
});

/**
 * Bottone personalizzato basato sul Button di Tamagui
 * Questo è più complesso perché include stati hover e press
 */
export const Button = styled(ButtonTamagui, {
  backgroundColor: '#6366F1',  // Colore di sfondo viola/indaco
  borderRadius: 28,            // Angoli molto arrotondati
  
  // Stile quando il mouse passa sopra (solo su web/desktop)
  hoverStyle: {
    backgroundColor: '#5a5fcf',  // Colore più scuro al hover
  },
  
  // Stile quando il bottone è premuto
  pressStyle: {
    backgroundColor: '#5a5fcf',  // Stesso colore del hover per consistenza
  },
  
  maxWidth: 500,  // Larghezza massima
  
  // Ombra per dare profondità (shadow)
  shadowColor: '#000',
  shadowOffset: {
    height: 2,  // Ombra spostata 2px verso il basso
    width: 0,   // Nessun spostamento orizzontale
  },
  shadowOpacity: 0.25,    // Trasparenza dell'ombra
  shadowRadius: 3.84,     // Quanto è sfumata l'ombra
  
  // Stili per il testo del bottone
  color: '#FFFFFF',       // Testo bianco
  fontWeight: '600',      // Testo semi-grassetto
  // NOTA: fontWeight potrebbe non funzionare a causa di un bug di Tamagui
  fontSize: 16,           // Dimensione del font
});

// ============================================================================
// CONFIGURAZIONE PRINCIPALE - Qui si mette tutto insieme
// ============================================================================

/**
 * createTamagui() è la funzione che crea la configurazione completa
 * Tutti i componenti Tamagui useranno questa configurazione
 */
const config = createTamagui({
  
  // Tema di base (questo sembra incompleto, normalmente avresti più temi)
  light: {
    color: {
      background: 'gray',  // Colore di sfondo
      text: 'black',       // Colore del testo
    },
  },
  
  // Font predefinito da usare quando non è specificato altro
  defaultFont: 'body',
  
  // Le animazioni che abbiamo definito sopra
  animations,
  
  // Aggiunge automaticamente le media query per preferenze di tema scuro/chiaro
  shouldAddPrefersColorThemes: true,
  
  // Aggiunge i nomi delle classi CSS per i temi sull'elemento root
  themeClassNameOnRoot: true,
  
  // Scorciatoie per le proprietà CSS (es: m={4} invece di margin={4})
  shorthands,
  
  // I font che abbiamo configurato
  fonts: {
    body: bodyFont,        // Font per il corpo del testo
    heading: headingFont,  // Font per i titoli
  },
  
  // Temi predefiniti di Tamagui (colori, spaziature, ecc.)
  themes,
  
  // Token predefiniti (variabili di design come $1, $2, $3 per spaziature)
  tokens,
  
  // ========================================================================
  // MEDIA QUERIES - Responsive design per diverse dimensioni schermo
  // ========================================================================
  media: createMedia({
    // Breakpoint per schermi piccoli (mobile)
    xs: { maxWidth: 660 },     // "xs" = extra small, fino a 660px
    sm: { maxWidth: 800 },     // "sm" = small, fino a 800px
    md: { maxWidth: 1020 },    // "md" = medium, fino a 1020px
    lg: { maxWidth: 1280 },    // "lg" = large, fino a 1280px
    xl: { maxWidth: 1420 },    // "xl" = extra large, fino a 1420px
    xxl: { maxWidth: 1600 },   // "xxl" = extra extra large, fino a 1600px
    
    // Breakpoint "greater than" (più grandi di...)
    gtXs: { minWidth: 660 + 1 },   // "gtXs" = greater than XS, da 661px in su
    gtSm: { minWidth: 800 + 1 },   // da 801px in su
    gtMd: { minWidth: 1020 + 1 },  // da 1021px in su
    gtLg: { minWidth: 1280 + 1 },  // da 1281px in su
    
    // Breakpoint per altezza schermo
    short: { maxHeight: 820 },     // Schermi bassi
    tall: { minHeight: 820 },      // Schermi alti
    
    // Capacità di interazione
    hoverNone: { hover: 'none' },        // Dispositivi senza hover (touch)
    pointerCoarse: { pointer: 'coarse' }, // Dispositivi con puntatore impreciso (dita)
  }),
});

// ============================================================================
// TYPESCRIPT - Configurazione per auto-completamento e type safety
// ============================================================================

/**
 * Questo tipo TypeScript cattura la forma della nostra configurazione
 * Serve per far funzionare l'auto-completamento nell'IDE
 */
type AppConfig = typeof config;

/**
 * Module augmentation per TypeScript
 * Questa dichiarazione dice a TypeScript che la nostra configurazione
 * estende quella base di Tamagui, abilitando:
 * - Auto-completamento delle props (es: jc="center" per justifyContent)
 * - Type checking sui componenti
 * - Intellisense nell'editor
 */
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

// Esporta la configurazione come default export
export default config;

/**
 * COME USARE QUESTA CONFIGURAZIONE:
 * 
 * 1. Importa questa configurazione nel tuo app root
 * 2. Wrappa la tua app con <TamaguiProvider config={config}>
 * 3. Ora puoi usare i componenti personalizzati che hai esportato:
 *    <Container>
 *      <Main>
 *        <Title>Il mio titolo</Title>
 *        <Subtitle>Il mio sottotitolo</Subtitle>
 *        <Button>Clicca qui</Button>
 *      </Main>
 *    </Container>
 * 
 * 4. Puoi anche usare le media queries nei tuoi componenti:
 *    <YStack $xs={{ padding: 10 }} $lg={{ padding: 20 }}>
 *      // Padding 10 su mobile, 20 su desktop
 *    </YStack>
 */