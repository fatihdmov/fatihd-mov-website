/*
 * PROMPT KÜTÜPHANESİ VERİTABANI
 * ------------------------------------------------------------
 * Eski fatihd.mov sitesinden birebir taşındı, sıra korundu.
 * type: "prompt"  -> items: [{ label, text }]
 * type: "link"    -> items: [{ label, url }]
 * ------------------------------------------------------------
 */

const PROMPTS = [
  {
    title: "Arabanı İskeleden Düşür",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Preserve the uploaded car exactly as it is (model, color, body proportions, windows, and license plate must NEVER change). Place the car at the ABSOLUTE END of a narrow concrete pier. The pier must STOP exactly at the front bumper of the car. There must be NO pier, NO concrete, and NO solid ground in front of the car. In front of the car, only open sea must be visible, with the water starting immediately at the front bumper. The front wheels and bumper should be slightly over the water, creating visible empty space ahead. The image is captured by a drone, positioned above the sea, using a cinematic front-left diagonal angle. The camera is slightly elevated, angled downward — NOT top-down, NOT from behind. Behind the car, land must be visible: shoreline, road, and a few low-rise buildings in the distant background. The sea is active, with small waves and foam hitting the very edge of the pier. Set during sunset, with soft cinematic lighting, realistic shadows, and natural reflections. Photorealistic quality, natural colors, subtle cinematic contrast, high detail. The car must NOT be in the middle of the pier and must be positioned exactly at the edge. Output in 9:16 vertical format." }
    ]
  },
  {
    title: "Araban Sualtında!",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Using only the uploaded reference image and without changing the vehicle's identity, shape, proportions, or camera angle, transform the scene into an ultra-photorealistic underwater environment. The vehicle is deep underwater in a dark blue ocean, with the front angled downward and the rear slightly lifted, floating naturally. The surface shows natural rust, corrosion, and visible plankton. Small air bubbles appear around the edges, with some rising toward the water surface. A soft sunbeam from above creates realistic highlights on the vehicle and natural shadows underneath. Ultra photorealistic lighting, 8K detail, realistic water particles. Vertical composition (9:16)." }
    ]
  },
  {
    title: "\"Dolu Camını Kırdı\" Şakası",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Bu fotoğrafta havada dolu yağmış gibi olsun ve yağan dolu arabanın ön camını kırmış olsun." }
    ]
  },
  {
    title: "Arabanı Shell'e Işınla",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Arabayı alçaltıp yere yakın yap shell istasyonunun önünde 135mm f2 lens mi bir kamera ile yağmurun yağdığı bir günde fotoğraf çek plakası aynı kalsın fotoğraf dikey olsun." }
    ]
  },
  {
    title: "LinkedIn Fotoğrafını Oluştur",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "A professional, high-resolution profile photo, maintaining the exact facial structure, identity, and key features of the person in the input image. The subject is framed from the chest up, with ample headroom. The person looks directly at the camera. They are styled for a professional photo studio shoot, wearing a premium smart casual blazer in a subtle charcoal gray. The background is a solid #1A1A1A neutral studio color. Shot at eye level with bright and airy soft, diffused studio lighting, gently illuminating the face and creating a subtle catchlight in the eyes to convey clarity and attentiveness. Captured on an 85mm f/1.8 lens with a shallow depth of field, exquisite focus on the eyes, and beautiful soft bokeh. Observe crisp detail on the fabric texture of the blazer, individual strands of hair, and natural realistic skin texture. Clean and bright cinematic color grading with subtle warmth and balanced tones. The atmosphere exudes confidence, professionalism, and approachability, delivering a polished and contemporary portrait." }
    ]
  },
  {
    title: "Stranger Things Akımına Katıl",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Transform the *reference photograph* into a hyper-realistic Stranger Things Upside Down version while strictly preserving the original camera angle, perspective, geometry, layout, and composition of the scene. Do NOT remove, replace, or distort any objects or architectural elements present in the reference image. Keep all structures, shapes, and spatial relationships intact. Apply the following Upside Down transformation effects while maintaining perfect realism: • Gradually cover surfaces with twisted black-and-red alien vines that blend naturally into the environment. • Add glowing red dimensional cracks, rifts, and fractures on appropriate surfaces such as walls, ceilings, floors, or openings. • Replace the sky (if visible) with a stormy, blood-red Upside Down sky filled with intense red lightning. • Introduce drifting smoke-grey fog, volumetric atmospheric haze, and floating ash-like particles." }
    ]
  },
  {
    title: "Arabanı İstanbul'a Işınla",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "{ \"instruction_type\": \"BACKGROUND_REPLACEMENT_WITH_SUBJECT_FIDELITY\", \"model_version\": \"Gemini 3 Pro Image (Nano Banana Pro)\", \"reference_input\": { \"type\": \"uploaded_image\", \"subject\": \"my_car\", \"constraint\": \"HARD_LOCK\", \"description\": \"Strict subject fidelity required. The LICENSE PLATE TEXT must be preserved pixel-perfect with zero modifications, hallucinations, or redraw attempts.\" }, \"scene_composition\": { \"aspect_ratio\": \"9:16\", \"framing\": \"Native 9:16 vertical framing. Vehicle must be oriented front-right.\", \"environment\": { \"location\": \"Istanbul skyline — Galata Tower, Bosphorus, Historical Peninsula\", \"lighting\": \"Sunset — warm orange glow, long shadows, city reflecting golden tones\", \"atmosphere\": \"Realistic urban depth, light haze over the Bosphorus, photorealistic skyline\" } }, \"generation_prompt\": \"Create a hyper-realistic 9:16 vertical cinematic photo placing the [reference_car] in front of the REAL Istanbul skyline during sunset. The background must look like an authentic photograph of Istanbul: Galata Tower, historical peninsula outlines, Bosphorus layers, and warm orange evening sky.\\n\\nCRITICAL EXECUTION RULES:\\n1. *LICENSE PLATE LOCK: The plate MUST remain EXACT. No new digits, no blur, no font changes.\\n2. **REAL CITY INTEGRATION: Use a realistic, non-stylized Istanbul skyline — it must look like a real photo.\\n3. **LIGHTING: Apply sunset reflections (warm oranges + soft shadows) while keeping plate crisp and readable.\\n4. **PERSPECTIVE: Align the car naturally to an urban ground plane, front-right orientation only.\\n5. **VERTICAL COMPOSITION*: Scene must be designed as a true vertical 9:16 layout from the beginning.\", \"negative_prompt\": \"altered license plate, changed digits, blurred text, fantasy skyline, AI-looking buildings, cartoonish colors, horizontal crop, distorted car geometry\" }" },
      { label: "PROMPT 2", text: "Use the uploaded image.Make a 5–6 second ULTRA-REALISTIC micro arc shot.The CAR must stay perfectly CENTERED and FIXED — no rotation, no movement, no shape change, no plate change.CAMERA:A very small ARC movement, about 20 cm left-to-right (or right-to-left).Smooth, slow, cinematic curve around the front of the car.ONLY the camera moves. The car stays locked in world space.ENVIRONMENT:No timelapse. Boats, sky and city must stay real-time.Keep the exact sunset Istanbul look.OUTPUT:Photorealistic micro-arc shot with the car perfectly stable in the middle of the frame." }
    ]
  },
  {
    title: "Gemini 1 Yıl Bedava (Öğrenci)",
    type: "link",
    items: [
      { label: "BAĞLANTI", url: "https://gemini.google/students/?utm_source=gemini&utm_medium=paid-media&utm_campaign=students_sem_bts-sem_generic__text&gclsrc=aw.ds&gad_source=1&gad_campaignid=23100804430&gbraid=0AAAAAC_C9PTSAA9wG9ENrj34sE2FkqmZZ&gclid=Cj0KCQjw9obIBhCAARIsAGHm1mQpqVHVNbK2LemcmdBG83C0W5Xhc_4XP8RSXbdPHCbXdYnMg8ep4XcaAsOVEALw_wcB" }
    ]
  },
  {
    title: "Gemini Prompt Arşivi",
    type: "link",
    items: [
      { label: "BAĞLANTI", url: "https://gemini-prompts.vercel.app/" }
    ]
  },
  {
    title: "Doğum Haritası Yorumcusu",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "You are an expert astrologer and a magical storyteller. You can analyze a full natal chart with complete accuracy and translate astrological symbolism into an imaginative, poetic, and fairy-tale-like story. I will provide you with a real natal chart, including Sun, Moon, Ascendant, all planetary positions, major aspects, and house placements. Your task is to analyze the chart thoroughly and correctly like a professional astrologer and then present the entire analysis as a fairy-tale story in Turkish. The analysis should cover all areas of life suggested by the chart: - Personality and soul traits - Career and life purpose - Love and relationships - Health and physical energy - Life journey, destiny, and potential challenges Your writing style should be dreamy, emotional, symbolic, and cinematic. Use mythological tones, nature imagery (stars, oceans, fire, wind, etc.), and deep emotional expression to turn the chart into a personal legend, a magical fairy-tale story. ⚠️ Important: - The story must be astrologically accurate. - Do not use modern or casual language; maintain a magical, symbolic, and fairy-tale-like tone. - Do not translate the chart literally; convey the astrological meanings symbolically and truthfully." }
    ]
  },
  {
    title: "Arabanı McQueen ile Yarıştır",
    type: "prompt",
    items: [
      { label: "PROMPT 1 — Gemini", text: "Gemini Prompt: Make my car look like it's racing with Lightning McQueen at over 80 km/h, realistic and at night, just like in the movie." },
      { label: "PROMPT 2 — Kling AI", text: "Kling AI Prompt: Turn this photo into a video of it racing at over 80 km/h, looking realistic, just like in the movie." }
    ]
  },
  {
    title: "Arabana Çarpmışlar Şakası",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Add a subtle, not exaggerated damage to the car in the photo. Make it very realistic. Do not change the license plate under any circumstances. The bumper and door should show damage." }
    ]
  },
  {
    title: "Fotoğrafını Sanat Eseri Yap",
    type: "prompt",
    items: [
      { label: "PROMPT 1 — Kadın İçin", text: "KADIN İÇİN: Using the attached image as reference for the woman's face and appearance, create a highly realistic, cinematic, and photographic scene in a modern art gallery where she is standing slightly to the side or at a distance, seen from behind, looking at a large oil painting portrait of herself on the wall. The entire painting must be fully visible — she should not block, cover, or overlap any part of the artwork. The painting should depict the same woman in a realistic, expressive oil-painting style, showing her face and upper body with textured brush strokes and muted colors. The gallery wall is clean and white, with a soft, dramatic spotlight illuminating the artwork, creating a professional, cinematic exhibition atmosphere. Include realistic lighting, subtle shadows, depth of field, and natural reflections. Vertical composition, ultra-detailed, photorealistic." },
      { label: "PROMPT 2 — Erkek İçin", text: "ERKEK İÇİN: Using the attached image as reference for the man's face and appearance, create a highly realistic, cinematic, and photographic scene in a modern art gallery where he is standing slightly to the side or at a distance, seen from behind, looking at a large oil painting portrait of herself on the wall. The entire painting must be fully visible — he should not block, cover, or overlap any part of the artwork. The painting should depict the same man in a realistic, expressive oil-painting style, showing her face and upper body with textured brush strokes and muted colors. The gallery wall is clean and white, with a soft, dramatic spotlight illuminating the artwork, creating a professional, cinematic exhibition atmosphere. Include realistic lighting, subtle shadows, depth of field, and natural reflections. Vertical composition, ultra-detailed, photorealistic." }
    ]
  },
  {
    title: "Evsiz Adam Şakası",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Edit a homeless man on the couch and make it look as real as you can for a prank" }
    ]
  },
  {
    title: "Gelin Damat Dış Çekim",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "PROMPT 1: Create an image of the same man and woman from the reference, preserving their exact facial features without any changes. The scene captures a modern and stylish wedding concept, illuminated by natural daylight. The atmosphere is bright and clear, with minimal shadows to convey a luxurious feel." },
      { label: "PROMPT 2", text: "PROMPT 2: Create an image of the same man and woman from the reference, keeping their exact facial features and expressions fully intact without any changes. The couple is sitting in a classic convertible car with burgundy leather seats. The groom wears a black suit, white shirt, and bow tie, with black sunglasses that add a charismatic touch to his elegant look. The bride wears a strapless white wedding gown with voluminous tulle details, paired with long white lace-up heeled sandals and retro white-framed sunglasses, creating a bold and modern style. The shot is taken from a slightly elevated diagonal angle, showing the bride in a stretched-out pose and the groom in a relaxed posture, resulting in a balanced composition that highlights them both. The atmosphere feels romantic, fashionable, and cinematic. Apply a bohemian effect that evokes the 1980s. Final aspect ratio: 9:18. Faces must not be altered or distorted in any way; their true facial features must remain unchanged." },
      { label: "PROMPT 3", text: "PROMPT 3: Create a realistic photo of the same man and woman from the provided reference, keeping their exact facial features fully intact without any changes. The image should be vertical 9:18 format and framed in a medium shot, with the couple as the main focus. In one moment, the couple is posed on a motorcycle in an outdoor setting; the photo is in black and white, giving it a timeless and romantic atmosphere. The background shows blurred trees and buildings, keeping attention on the subjects. Natural daylight comes from the side and above, creating soft highlights and shadows on their faces, enhancing contrast and depth. The groom wears a black tuxedo jacket, black trousers, black bow tie, and white shirt, with a small white boutonnière on his lapel, a wristwatch on his wrist, and Ray-Ban square sunglasses. The bride wears an elegant white spaghetti-strap wedding dress with a long flowing veil, her wavy hair blowing in the wind, and retro white cat-eye sunglasses with black lenses" },
      { label: "PROMPT 4", text: "PROMPT 4: Create a modern and stylish wedding-themed image featuring the same woman and man from the provided photo, with their exact facial features and expressions preserved without any alterations. The couple is sitting in a classic convertible car with burgundy leather seats. The groom wears a black suit, white shirt, bow tie, and black sunglasses, projecting a sharp and charismatic look. The bride wears a strapless princess-style white wedding dress with voluminous tulle details, paired with long platform heels and white-framed retro sunglasses for a bold, fashionable style. The lighting is natural daylight, bright and clear, with minimal shadows to create a luxurious atmosphere. The shot is taken from a slightly elevated diagonal angle, capturing the bride in a stretched pose and the groom in a relaxed posture, forming a balanced composition that feels cinematic, romantic, and fashionable. Apply a bohemian effect that evokes the 1980s. Final image ratio: 9:18." },
      { label: "PROMPT 5", text: "PROMPT 5: Make this image of people to look like a candid cinematic night photograph, shot on Kodak Portra 400 film, 35mm film style, capturing the mood of Wong Kar-wai films. A young couple eats noodles at a humble street food stall. The bride wears a modest white wedding dress, white gloves, with a long lace veil, leaning forward playfully slurping noodles with chopsticks, facing the camera. The groom wears a dark cardigan and white shirt, holding noodles and looking affectionately at the bride. They sit at a shiny metal table with bowls of noodles, sauces, and condiments. Behind them, shelves of drinks and a softly glowing colorful Vietnamese menu sign are visible. Lighting: ultra-strong direct on-camera flash like Polaroid photography, background darker due to flash, very subtle blue shadows, faint pink highlights, slightly warm skin tones, strong contrast, harsh glossy textures on skin and table. Effects: glowy, dreamy, slightly blurred for soft focus, realistic textures, visible film grain, consistent warm muted Kodak Portra tones. Nostalgic, melancholic Wong Kar-wai mood. Faces: preserve uploaded faces exactly with no distortion, frontal view, bride facing camera, groom looking at bride." },
      { label: "PROMPT 6", text: "PROMPT 6: Create an intimate wedding kissing photo of this image, wearing a bride and groom attire in no specific place(like in the middle of the night, running in a green grass, etc.) and make a little blurry effect" }
    ]
  },
  {
    title: "Çocukluk Fotoğrafı Birleştirme",
    type: "prompt",
    items: [
      { label: "PROMPT 1", text: "Create a Polaroid photo using the first and second pictures. The photo should look like an ordinary photograph, without any distinct subject or feature. The photo should be slightly blurry, and it should have a consistent light source spread throughout the photo, as if a flash went off in a dark room. Do not change the faces, they must remain exactly the same as the ones I uploaded. Replace the background with white curtains. The children in the photo should remain as children and hug each other." }
    ]
  }
];
