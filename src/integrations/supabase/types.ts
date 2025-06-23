export type Database = {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; role: string };
        Insert: { id: string; email: string; role: string };
        Update: Partial<{ id: string; email: string; role: string }>;
      };
      threads: {
        Row: { id: string; user1_id: string; user2_id: string; updated_at: string };
        Insert: { id: string; user1_id: string; user2_id: string; updated_at: string };
        Update: Partial<{ id: string; user1_id: string; user2_id: string; updated_at: string }>;
      };
      messages: {
        Row: { thread_id: string; sender_id: string; content: string; created_at: string };
        Insert: { thread_id: string; sender_id: string; content: string; created_at: string };
        Update: Partial<{ thread_id: string; sender_id: string; content: string; created_at: string }>;
      };
      settings: {
        Row: { user_id?: string; organization_id?: string; key: string; value: unknown; updated_at: string };
        Insert: { user_id?: string; organization_id?: string; key: string; value: unknown; updated_at: string };
        Update: Partial<{ user_id?: string; organization_id?: string; key: string; value: unknown; updated_at: string }>;
      };
    };
  };
};
