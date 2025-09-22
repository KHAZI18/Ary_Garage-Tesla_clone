import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Health check endpoint
app.get("/make-server-f2791f6d/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-f2791f6d/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: "User created successfully", 
      user: { id: data.user.id, email: data.user.email, name } 
    });
  } catch (error) {
    console.log(`Signup error: ${error}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Save user customization
app.post("/make-server-f2791f6d/save-customization", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Authorization required" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const customization = await c.req.json();
    await kv.set(`customization:${user.id}`, customization);
    
    return c.json({ message: "Customization saved successfully" });
  } catch (error) {
    console.log(`Save customization error: ${error}`);
    return c.json({ error: "Failed to save customization" }, 500);
  }
});

// Get user customization
app.get("/make-server-f2791f6d/get-customization", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Authorization required" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const customization = await kv.get(`customization:${user.id}`);
    return c.json({ customization: customization || null });
  } catch (error) {
    console.log(`Get customization error: ${error}`);
    return c.json({ error: "Failed to get customization" }, 500);
  }
});

Deno.serve(app.fetch);