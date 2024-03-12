export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string;
          created_at: string;
          created_by: string;
          id: string;
          post_id: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          post_id: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          post_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_comment_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_metric";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_with_comments_and_user";
            referencedColumns: ["post_id"];
          }
        ];
      };
      comment_likes: {
        Row: {
          comment_id: string;
          created_at: string;
          id: number;
          is_like: boolean;
          user_profile_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: number;
          is_like?: boolean;
          user_profile_id: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: number;
          is_like?: boolean;
          user_profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_comment_likes_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comment";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_likes_user_profile_id_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "post_with_comments_and_user";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "public_comment_likes_user_profile_id_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          }
        ];
      };
      forum_category: {
        Row: {
          category: string | null;
          id: number;
        };
        Insert: {
          category?: string | null;
          id?: number;
        };
        Update: {
          category?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      post: {
        Row: {
          category_id: number;
          content: string;
          created_at: string;
          created_by: string;
          id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category_id: number;
          content: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category_id?: number;
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_post_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "forum_category";
            referencedColumns: ["id"];
          }
        ];
      };
      post_likes: {
        Row: {
          created_at: string;
          is_like: boolean | null;
          post_id: string;
          user_profile_id: string;
        };
        Insert: {
          created_at?: string;
          is_like?: boolean | null;
          post_id: string;
          user_profile_id?: string;
        };
        Update: {
          created_at?: string;
          is_like?: boolean | null;
          post_id?: string;
          user_profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_post_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_post_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_metric";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_post_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_with_comments_and_user";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "public_post_likes_user_profile_id_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "post_with_comments_and_user";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "public_post_likes_user_profile_id_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          }
        ];
      };
      post_views: {
        Row: {
          created_at: string;
          last_viewed_at: string | null;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          last_viewed_at?: string | null;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          last_viewed_at?: string | null;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_post_views_post_id";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_post_views_post_id";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_metric";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_post_views_post_id";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_with_comments_and_user";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "fk_post_views_user_id";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profile: {
        Row: {
          avatar_link: string | null;
          biography: string;
          created_at: string;
          created_by: string;
          id: string;
          username: string;
        };
        Insert: {
          avatar_link?: string | null;
          biography: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          username: string;
        };
        Update: {
          avatar_link?: string | null;
          biography?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_profile_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      post_metric: {
        Row: {
          dislike_count: number | null;
          id: string | null;
          like_count: number | null;
          view_count: number | null;
        };
        Relationships: [];
      };
      post_with_comments_and_user: {
        Row: {
          comments: any[] | Json[] | null;
          post_category_id: number | null;
          post_content: string | null;
          post_created_at: string | null;
          post_created_by: string | null;
          post_id: string | null;
          post_title: string | null;
          post_updated_at: string | null;
          user_avatar_link: string | null;
          user_biography: string | null;
          user_created_at: string | null;
          user_id: string | null;
          username: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_post_category_id_fkey";
            columns: ["post_category_id"];
            isOneToOne: false;
            referencedRelation: "forum_category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_profile_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
