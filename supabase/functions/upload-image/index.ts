
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { encode } from "https://deno.land/std@0.177.0/encoding/base64.ts";

// Configure CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Get the request body
    const { image } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Extract base64 data
    const base64Data = image.split(",")[1];

    // Configuration for Cloudinary
    const cloudName = "dhkfrpae6";
    const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
    const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");

    if (!apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({ error: "Cloudinary API credentials not configured" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Create timestamp for the signature
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Create signature
    const encoder = new TextEncoder();
    const data = encoder.encode(`timestamp=${timestamp}${apiSecret}`);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Prepare form data
    const formData = new FormData();
    formData.append("file", `data:image/jpeg;base64,${base64Data}`);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "school_management");

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to upload image to Cloudinary" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Insert the image into Supabase
    const supabaseUrl = "https://urlouivlrywooloecljr.supabase.co";
    const supabaseKey = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: imageData, error } = await supabase
      .from("images")
      .insert([
        {
          public_id: result.public_id,
          url: result.secure_url,
          signature: result.signature,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save image data" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, image: imageData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
