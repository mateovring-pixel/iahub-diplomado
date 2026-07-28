import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { TOOLS_DATA } from "./src/data/toolsData.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route: AI Tool Recommender using Gemini API
app.post("/api/recommend", async (req, res) => {
  try {
    const { useCase, userProfile, preferredPricing } = req.body;

    if (!useCase || typeof useCase !== "string") {
      return res.status(400).json({ error: "Por favor proporciona una descripción del caso de uso." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Use real Gemini API
      const ai = new GoogleGenAI({ apiKey });

      const toolsSummary = TOOLS_DATA.map(t => ({
        id: t.id,
        name: t.name,
        categoryLabel: t.categoryLabel,
        description: t.description,
        bestFor: t.bestFor,
        pricing: t.pricing,
        difficulty: t.difficulty,
        module: t.diplomaModule
      }));

      const prompt = `
Eres el Asistente Experto del "Diplomado de IA Generativa: De cero a producto".
El estudiante solicita orientación para el siguiente caso de uso:
- Caso de uso / Necesidad: "${useCase}"
- Perfil del estudiante: "${userProfile || 'General'}"
- Preferencia de precio: "${preferredPricing || 'Cualquiera'}"

Inventario disponible de herramientas enseñadas en el diplomado:
${JSON.stringify(toolsSummary, null, 2)}

Instrucciones:
Responde estrictamente en formato JSON válido con la siguiente estructura (sin bloques markdown extras fuera del JSON):
{
  "primaryToolId": "<id de la herramienta principal más recomendada>",
  "secondaryToolIds": ["<id herramienta secundaria 1>", "<id herramienta secundaria 2>"],
  "reasoning": "<Explicación empática y clara de 2 o 3 frases de por qué la herramienta principal es la mejor opción sin abrumarlo>",
  "suggestedWorkflow": [
    "<Paso 1: qué hacer con la herramienta principal>",
    "<Paso 2: cómo usar la herramienta secundaria>",
    "<Paso 3: resultado final o despliegue>"
  ],
  "proTip": "<Un consejo o 'tip del diplomado' práctico y directo para aprovechar al máximo esta herramienta>"
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const responseText = response.text || "";
      
      // Attempt to extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json(parsed);
      }
    }

    // Fallback logic if API key is missing or formatting fallback
    const lowerQuery = useCase.toLowerCase();
    
    let primaryToolId = 'ai-studio-builder';
    let secondaryToolIds = ['claude', 'netlify'];

    if (lowerQuery.includes('presentación') || lowerQuery.includes('diapositiva') || lowerQuery.includes('pitch') || lowerQuery.includes('deck')) {
      primaryToolId = 'gamma';
      secondaryToolIds = ['canva-ai', 'ai-studio-visual'];
    } else if (lowerQuery.includes('código') || lowerQuery.includes('program') || lowerQuery.includes('react') || lowerQuery.includes('app') || lowerQuery.includes('frontend')) {
      primaryToolId = 'claude-code';
      secondaryToolIds = ['ai-studio-builder', 'netlify'];
    } else if (lowerQuery.includes('pdf') || lowerQuery.includes('libro') || lowerQuery.includes('resumen') || lowerQuery.includes('documento')) {
      primaryToolId = 'gemini';
      secondaryToolIds = ['kimi', 'chatgpt'];
    } else if (lowerQuery.includes('gráfico') || lowerQuery.includes('datos') || lowerQuery.includes('dashboard') || lowerQuery.includes('chart')) {
      primaryToolId = 'apache-echarts';
      secondaryToolIds = ['chart-js', 'chatgpt'];
    } else if (lowerQuery.includes('imagen') || lowerQuery.includes('logo') || lowerQuery.includes('foto') || lowerQuery.includes('diseño')) {
      primaryToolId = 'ai-studio-visual';
      secondaryToolIds = ['canva-ai', 'postimages'];
    } else if (lowerQuery.includes('video') || lowerQuery.includes('animación')) {
      primaryToolId = 'google-vids';
      secondaryToolIds = ['gsap', 'google-mixboard'];
    }

    const primaryTool = TOOLS_DATA.find(t => t.id === primaryToolId) || TOOLS_DATA[0];

    return res.json({
      primaryToolId,
      secondaryToolIds,
      reasoning: `Para tu necesidad de "${useCase}", **${primaryTool.name}** es la herramienta insignia que mejor se adapta. Te permitirá lograr resultados de forma rápida y sin complicaciones innecesarias.`,
      suggestedWorkflow: [
        `Ingresa a ${primaryTool.name} y especifica tu objetivo en el prompt inicial.`,
        `Complementa los elementos visuales o el refinamiento con la herramienta secundaria recomendada.`,
        `Consolida el resultado en tu proyecto del diplomado.`
      ],
      proTip: primaryTool.tipsDiplomado || `Revisa la sección del ${primaryTool.diplomaModule} para ver ejemplos de prompts aplicados.`
    });

  } catch (err: any) {
    console.error("Error in /api/recommend:", err);
    return res.status(500).json({ error: "Error procesando la recomendación de IA." });
  }
});

// Vite middleware for development / Static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
