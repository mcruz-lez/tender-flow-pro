// src/api/auditLogs.ts
// Backend API for audit log management (Express style)
import express, { Request, Response } from "express";
import { supabase } from "../integrations/supabase/client";

const router = express.Router();

// GET /api/audit-logs
router.get("/", async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
});

// POST /api/audit-logs
router.post("/", async (req: Request, res: Response) => {
  const {
    user_id,
    organization_id,
    action,
    entity_type,
    entity_id,
    before,
    after,
    ip_address,
    user_agent,
  } = req.body;
  const { data, error } = await supabase.from("audit_logs").insert([
    {
      user_id,
      organization_id,
      action,
      entity_type,
      entity_id,
      before,
      after,
      ip_address,
      user_agent,
    },
  ]);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
});

export default router;
