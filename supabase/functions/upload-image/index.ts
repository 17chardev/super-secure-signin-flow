
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { v2 as cloudinary } from "https://esm.sh/cloudinary@1.37.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { image } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: "dhkfrpae6",
      api_key: Deno.env.get("CLOUDINARY_API_KEY"),
      api_secret: Deno.env.get("CLOUDINARY_API_SECRET"),
      secure: true,
    });

    // Upload image to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        image,
        {
          folder: "school-management",
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Return the uploaded image information
    return new Response(
      JSON.stringify({ 
        image: uploadResponse,
        message: "Image uploaded successfully" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to upload image", 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
