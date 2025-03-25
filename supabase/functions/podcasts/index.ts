import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "npm:zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-ListenAPI-Key",
};

const LISTEN_API_KEY = Deno.env.get("LISTEN_API_KEY") || "";
const BASE_URL = "https://listen-api.listennotes.com/api/v2";

const SearchParamsSchema = z.object({
  q: z.string().optional(),
  type: z.enum(["search", "trending", "category"]).default("trending"),
  genre_id: z.string().optional(),
  offset: z.string().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const params = SearchParamsSchema.parse(Object.fromEntries(url.searchParams));
    let apiUrl = "";

    switch (params.type) {
      case "search":
        if (!params.q) throw new Error("Search query is required");
        apiUrl = `${BASE_URL}/search?q=${encodeURIComponent(params.q)}&type=podcast`;
        break;
      case "trending":
        apiUrl = `${BASE_URL}/best_podcasts`;
        break;
      case "category":
        if (!params.genre_id) throw new Error("Genre ID is required");
        apiUrl = `${BASE_URL}/best_podcasts?genre_id=${params.genre_id}`;
        break;
    }

    const response = await fetch(apiUrl, {
      headers: {
        "X-ListenAPI-Key": LISTEN_API_KEY,
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});