-- ========================================================================
-- NEO-RUNNER // PROTOCOL [LVLUP] - SUPABASE DATABASE SCHEMA
-- Relational model for Users, Character Attributes, and Task Contracts
-- ========================================================================

-- Enable standard UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------
-- 1. USERS TABLE (Operator Profiles)
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    callsign TEXT NOT NULL DEFAULT 'CYBER_NOMAD',
    tier INT NOT NULL DEFAULT 4 CHECK (tier BETWEEN 1 AND 5),
    creds INT NOT NULL DEFAULT 2450 CHECK (creds >= 0),
    xp INT NOT NULL DEFAULT 8420 CHECK (xp >= 0),
    streak INT NOT NULL DEFAULT 14 CHECK (streak >= 0),
    overload_sync NUMERIC(5,2) NOT NULL DEFAULT 88.00,
    bio_temp NUMERIC(4,1) NOT NULL DEFAULT 36.7,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 2. CHARACTER ATTRIBUTES TABLE (Wetware Loadout & Modifiers)
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS character_attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    int_mod INT NOT NULL DEFAULT 15,
    str_buffer INT NOT NULL DEFAULT 8,
    overclock_pct NUMERIC(5,2) NOT NULL DEFAULT 24.50,
    equipped_deck TEXT DEFAULT 'mk-vii',
    equipped_cortex TEXT DEFAULT NULL,
    equipped_biometric TEXT DEFAULT 'nano-patch',
    inventory JSONB DEFAULT '["mk-vii", "nano-patch"]'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_attributes UNIQUE (user_id)
);

-- ------------------------------------------------------------------------
-- 3. TASKS TABLE (Protocol Contracts)
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subthread TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('focus', 'bio', 'neural')),
    reward_creds INT NOT NULL DEFAULT 150 CHECK (reward_creds >= 0),
    reward_xp INT NOT NULL DEFAULT 200 CHECK (reward_xp >= 0),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index frequently queried columns
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_type ON tasks(type);

-- ------------------------------------------------------------------------
-- 4. AUTOMATED UPDATED_AT TRIGGER
-- ------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_attributes_updated_at ON character_attributes;
CREATE TRIGGER trg_attributes_updated_at
BEFORE UPDATE ON character_attributes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_tasks_updated_at ON tasks;
CREATE TRIGGER trg_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow read and write for all users (or authenticated clients)
CREATE POLICY "Allow public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON users FOR UPDATE USING (true);

CREATE POLICY "Allow public read character_attributes" ON character_attributes FOR SELECT USING (true);
CREATE POLICY "Allow public insert character_attributes" ON character_attributes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update character_attributes" ON character_attributes FOR UPDATE USING (true);

CREATE POLICY "Allow public read tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert tasks" ON tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update tasks" ON tasks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete tasks" ON tasks FOR DELETE USING (true);

-- ------------------------------------------------------------------------
-- 6. DEFAULT SEED DATA (CYBER_NOMAD DEFAULT STATE)
-- ------------------------------------------------------------------------
DO $$
DECLARE
    default_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
    -- Insert default operator profile
    INSERT INTO users (id, callsign, tier, creds, xp, streak, overload_sync, bio_temp)
    VALUES (default_user_id, 'CYBER_NOMAD', 4, 2450, 8420, 14, 88.00, 36.7)
    ON CONFLICT (id) DO NOTHING;

    -- Insert character attributes
    INSERT INTO character_attributes (user_id, int_mod, str_buffer, overclock_pct, equipped_deck, equipped_cortex, equipped_biometric, inventory)
    VALUES (default_user_id, 15, 8, 24.50, 'mk-vii', NULL, 'nano-patch', '["mk-vii", "nano-patch"]'::jsonb)
    ON CONFLICT (user_id) DO NOTHING;

    -- Insert standard starting contracts
    INSERT INTO tasks (user_id, title, subthread, type, reward_creds, reward_xp, completed, completed_at)
    VALUES
        (default_user_id, 'EXECUTE DEEP FOCUS 90M', 'COGNITIVE SPRINT // SUB-THREAD A4', 'focus', 350, 450, true, NOW() - INTERVAL '3 hours'),
        (default_user_id, 'NEURAL RUN 5.0 KM', 'BIOMETRIC SYNC // GPS ANCHOR L2', 'bio', 280, 350, false, NULL),
        (default_user_id, 'METABOLIC HYDRATION 2.5L', 'CELLULAR OSMOSIS PROTOCOL', 'neural', 150, 200, false, NULL),
        (default_user_id, 'SYSTEM CALIBRATION // FLUSH', 'TERMINAL MEMORY SCRUB', 'focus', 120, 180, false, NULL)
    ON CONFLICT DO NOTHING;
END $$;
