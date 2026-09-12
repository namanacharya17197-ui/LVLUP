/**
 * NEO-RUNNER // SUPABASE CLIENT SERVICE & CRUD CONTROLLER
 * Full CRUD interface for Tasks, Users, and Character Attributes.
 * Supports live cloud synchronization with automatic offline fallback.
 */

class CyberSupabaseService {
  constructor() {
    this.client = null;
    this.url = localStorage.getItem('neo_runner_supabase_url') || '';
    this.anonKey = localStorage.getItem('neo_runner_supabase_key') || '';
    this.isConnected = false;
    this.userId = localStorage.getItem('neo_runner_user_id') || '00000000-0000-0000-0000-000000000001';
  }

  async init() {
    if (this.url && this.anonKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.url, this.anonKey);
        // Test connection with a lightweight probe
        const { error } = await this.client.from('tasks').select('id').limit(1);
        if (!error) {
          this.isConnected = true;
          console.log('[SUPABASE] Cloud database uplink established.');
        } else {
          console.warn('[SUPABASE] Connection probe failed:', error.message);
          this.isConnected = false;
        }
      } catch (err) {
        console.warn('[SUPABASE] Client init failed:', err);
        this.isConnected = false;
      }
    } else {
      this.isConnected = false;
    }
    this.updateStatusBadge();
    return this.isConnected;
  }

  async configure(url, key) {
    if (!url || !key) {
      return { success: false, error: 'URL and Anon Key are required.' };
    }
    try {
      if (!window.supabase) {
        return { success: false, error: 'Supabase JS library not loaded.' };
      }
      const testClient = window.supabase.createClient(url, key);
      const { error } = await testClient.from('tasks').select('id').limit(1);
      if (error) {
        return { success: false, error: error.message };
      }

      this.url = url;
      this.anonKey = key;
      this.client = testClient;
      this.isConnected = true;

      localStorage.setItem('neo_runner_supabase_url', url);
      localStorage.setItem('neo_runner_supabase_key', key);

      this.updateStatusBadge();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Connection error' };
    }
  }

  disconnect() {
    this.url = '';
    this.anonKey = '';
    this.client = null;
    this.isConnected = false;
    localStorage.removeItem('neo_runner_supabase_url');
    localStorage.removeItem('neo_runner_supabase_key');
    this.updateStatusBadge();
    console.log('[SUPABASE] Reverted to local cache protocol.');
  }

  updateStatusBadge() {
    const badge = document.getElementById('supabase-status-badge');
    if (!badge) return;

    if (this.isConnected) {
      badge.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
        <span>DB: SUPABASE [CLOUD]</span>
      `;
      badge.className = 'flex items-center gap-1.5 px-space-sm py-0.5 rounded font-code-sm text-xs bg-primary-container/10 text-primary border border-primary-container/40 cursor-pointer hover:bg-primary-container/20 transition-all';
      badge.title = 'Connected to Supabase. Click to manage cloud settings.';
    } else {
      badge.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
        <span>DB: LOCAL CACHE</span>
      `;
      badge.className = 'flex items-center gap-1.5 px-space-sm py-0.5 rounded font-code-sm text-xs bg-surface-container text-on-surface-variant border border-outline-variant/30 cursor-pointer hover:text-primary transition-all';
      badge.title = 'Running on LocalStorage. Click to connect your Supabase database.';
    }
  }

  // ======================================================================
  // CRUD OPERATIONS: TASKS / CONTRACTS
  // ======================================================================

  /**
   * READ: Fetch all tasks from Supabase
   */
  async fetchTasks() {
    if (!this.isConnected || !this.client) return null;
    try {
      const { data, error } = await this.client
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[SUPABASE] fetchTasks error:', error);
        return null;
      }
      return data.map(row => ({
        id: row.id,
        title: row.title,
        subthread: row.subthread,
        type: row.type,
        rewardCreds: row.reward_creds,
        rewardXp: row.reward_xp,
        completed: row.completed,
        completedAt: row.completed_at ? new Date(row.completed_at).toTimeString().split(' ')[0] : null
      }));
    } catch (err) {
      console.error('[SUPABASE] fetchTasks exception:', err);
      return null;
    }
  }

  /**
   * CREATE: Insert new task into Supabase
   */
  async createTask(task) {
    if (!this.isConnected || !this.client) return null;
    try {
      const payload = {
        user_id: this.userId,
        title: task.title,
        subthread: task.subthread,
        type: task.type,
        reward_creds: task.rewardCreds,
        reward_xp: task.rewardXp,
        completed: !!task.completed,
        completed_at: task.completedAt ? new Date().toISOString() : null
      };
      const { data, error } = await this.client
        .from('tasks')
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error('[SUPABASE] createTask error:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('[SUPABASE] createTask exception:', err);
      return null;
    }
  }

  /**
   * UPDATE: Modify existing task in Supabase
   */
  async updateTask(id, updates) {
    if (!this.isConnected || !this.client) return null;
    try {
      const payload = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.subthread !== undefined) payload.subthread = updates.subthread;
      if (updates.type !== undefined) payload.type = updates.type;
      if (updates.rewardCreds !== undefined) payload.reward_creds = updates.rewardCreds;
      if (updates.rewardXp !== undefined) payload.reward_xp = updates.rewardXp;
      if (updates.completed !== undefined) {
        payload.completed = updates.completed;
        payload.completed_at = updates.completed ? new Date().toISOString() : null;
      }

      const { data, error } = await this.client
        .from('tasks')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('[SUPABASE] updateTask error:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('[SUPABASE] updateTask exception:', err);
      return null;
    }
  }

  /**
   * DELETE: Purge task from Supabase
   */
  async deleteTask(id) {
    if (!this.isConnected || !this.client) return false;
    try {
      const { error } = await this.client
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[SUPABASE] deleteTask error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('[SUPABASE] deleteTask exception:', err);
      return false;
    }
  }

  // ======================================================================
  // SYNC: USER & CHARACTER ATTRIBUTES
  // ======================================================================

  async syncUser(userState) {
    if (!this.isConnected || !this.client) return;
    try {
      const payload = {
        callsign: userState.callsign,
        tier: userState.tier,
        creds: userState.creds,
        xp: userState.xp,
        streak: userState.streak,
        overload_sync: userState.overloadSync,
        bio_temp: userState.bioTemp
      };
      await this.client
        .from('users')
        .update(payload)
        .eq('id', this.userId);
    } catch (err) {
      console.warn('[SUPABASE] syncUser error:', err);
    }
  }

  async syncAttributes(equipped, inventory, stats) {
    if (!this.isConnected || !this.client) return;
    try {
      const payload = {
        int_mod: stats.intMod,
        str_buffer: stats.strBuffer,
        overclock_pct: stats.overclockPct,
        equipped_deck: equipped.deck,
        equipped_cortex: equipped.cortex,
        equipped_biometric: equipped.biometric,
        inventory: inventory
      };
      await this.client
        .from('character_attributes')
        .update(payload)
        .eq('user_id', this.userId);
    } catch (err) {
      console.warn('[SUPABASE] syncAttributes error:', err);
    }
  }
}

window.cyberSupabase = new CyberSupabaseService();
