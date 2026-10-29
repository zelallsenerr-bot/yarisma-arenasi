# Revision435 — imported platform people

Scope:53 imported platform implementations; original game layouts and engines retained. Replaced head cards and drawn torsos with alpha full-body actors, named celebrity assets and game-specific workwear. New named Password guests,50 blonde contestants, jury backs, family/contestant seating, phone-handset poses and12 wall poses per gender. Native Eyvah uses the same selected body atlas during the articulated fall.

Validation: all53 platform fixtures rendered on desktop and at390px mobile width. Actor counts, names and crop bounds checked. Last mobile corrections rechecked for50Sarışın,KapışKapış,TelefonKulübesi,TheTaste,YetenekSizsiniz. Password andKumbara opened in live game UI;Eyvah duel/result flow exercised. WebGL is disabled in test browser; native geometry/UV/fall transforms tested withoutGPU and software scene path exercised.

Passed:people435.cjs,people435-native.mjs,difficulty427.cjs,dating431.cjs,runway432.cjs,eyvah206.cjs,fifty195.cjs,fifty195-ui.cjs,water207-ui.cjs. Old water209 UI/scene tests retain pre414 timing assumptions and are not release assertions for this change.

Image compression:9 large decorativePNG files converted toWebP, references updated;4 anonymous portrait atlases re-encoded atquality94, originals kept in research. Existing Milyoner host/body assets unchanged. QA fixtures excluded from deployment.

Representation: generated photographic full-body cutouts with subtle idle motion; not recorded celebrity footage and not volumetric scanned3D celebrity models.
