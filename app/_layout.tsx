
/**MOUNTING POINT, wrapping più esterno */

import { useFonts } from 'expo-font';
//slot per renderizzare ciò che c'è nel prox layout
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

//configuarazione base tamaGUI
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {

  //caricamento font durante lo splash screen
  //useFont hook restituisce due elementi:  1 true/false, 2 error
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  //early return per evitare errori
  if (!loaded) return null;

  // Gestisce la comunicazione tra il codice JavaScript e i componenti nativi dei gesture
  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{flex:1}}>
        <Slot />
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

/**
 * TAMAGUI E FONTS
 * FLOW REALE (senza magia):
 * 
 * 1. useFonts() → Registra "Inter" e "InterBold" nel sistema
 * 2. createInterFont() → Crea config che dice "usa fontFamily: Inter"
 * 3. Componente → font="body" size="$6" fontWeight="700"
 * 4. Tamagui → Converte in CSS: fontFamily: "Inter", fontWeight: 700
 * 5. Sistema → "Inter peso 700? Ah, ho InterBold!" → Usa Inter-Bold.otf
 * 
 * LA CONNESSIONE è nel fatto che:
 * - createInterFont() genera fontFamily: "Inter"
 * - useFonts() registra un font chiamato "Inter" 
 * - Il sistema fa il match per nome
 */

/**
 * DOMANDA: "Perché bodyFont e headingFont sono identici?"
 * RISPOSTA: Sono la STESSA configurazione! 
 * 
 * Nel tuo config:
 * fonts: {
 *   body: bodyFont,    // ← Stessa configurazione Inter
 *   heading: bodyFont, // ← Stessa configurazione Inter  
 * }
 * 
 * Puoi anche scrivere:
 * const interFont = createInterFont();
 * fonts: {
 *   body: interFont,
 *   heading: interFont, // Stesso oggetto!
 * }
 */

// ============================================================================
// 🚨 ERRORE COMUNE - Pensare che i nomi siano magici
// ============================================================================

/**
 * ❌ PENSIERO SBAGLIATO:
 * "InterBold va automaticamente con headingFont perché i titoli sono bold"
 * 
 * ✅ REALTÀ:  
 * "InterBold è disponibile per QUALSIASI componente che chiede Inter peso 700"
 */
