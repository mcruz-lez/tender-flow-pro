import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { canAccess } from "@/api/rbac";
import { useAuth } from "@/contexts/useAuth";

// Dependency injection for testability
export interface Thread {
  id: string;
  subject?: string;
}
export interface Message {
  sender_id: string;
  content: string;
  created_at: string;
}

export type MessagingApi = {
  getThreads: (userId: string) => Promise<Thread[]>;
  getMessages: (threadId: string) => Promise<Message[]>;
  sendMessage: (
    threadId: string,
    senderId: string,
    content: string
  ) => Promise<Message>;
};

import * as defaultApi from "@/integrations/supabase/api";

const defaultMessagingApi: MessagingApi = {
  getThreads: defaultApi.getThreads,
  getMessages: defaultApi.getMessages,
  sendMessage: defaultApi.sendMessage,
};

interface MessagingPageProps {
  api?: MessagingApi;
}

const MessagingPage = ({ api = defaultMessagingApi }: MessagingPageProps) => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      api.getThreads(user.id).then((data: Thread[]) => setThreads(data));
    }
  }, [user, api]);

  useEffect(() => {
    if (selectedThread) {
      setLoading(true);
      api.getMessages(selectedThread.id)
        .then((data: Message[]) => setMessages(data))
        .finally(() => setLoading(false));
    }
  }, [selectedThread, api]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !selectedThread || !newMessage.trim()) return;
    setLoading(true);
    await api.sendMessage(selectedThread.id, user.id, newMessage.trim());
    setNewMessage("");
    api.getMessages(selectedThread.id).then((data: Message[]) => setMessages(data));
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  if (!user)
    return (
      <div className="p-8 text-center">Please sign in to use messaging.</div>
    );
  if (
    !canAccess(
      { role: user.role || user.user_metadata?.role || "user" },
      "messaging",
      "read",
    )
  )
    return <div className="p-8 text-center text-red-500">Access denied.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Threads</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {(Array.isArray(threads) ? threads : []).length === 0 ? (
              <li className="text-gray-500">No threads found.</li>
            ) : (
              (Array.isArray(threads) ? threads : []).map((thread: Thread, idx: number) => (
                <li key={thread.id}>
                  <Button
                    variant={
                      selectedThread?.id === thread.id ? "default" : "outline"
                    }
                    className="w-full"
                    onClick={() => setSelectedThread(thread)}
                  >
                    {thread.subject || `Thread #${thread.id}`}
                  </Button>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedThread ? (
            <>
              <div className="h-64 overflow-y-auto border rounded p-4 bg-gray-50 mb-4">
                {loading ? (
                  <div>Loading...</div>
                ) : messages.length === 0 ? (
                  <div className="text-gray-500">No messages yet.</div>
                ) : (
                  <ul className="space-y-2">
                    {messages.map((msg: Message, idx: number) => (
                      <li
                        key={idx}
                        className={
                          msg.sender_id === user?.id
                            ? "text-right"
                            : "text-left"
                        }
                      >
                        <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-900 max-w-xs break-words">
                          {msg.content}
                        </span>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <form className="flex gap-2" onSubmit={handleSend}>
                <input
                  className="flex-1 border rounded p-2"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !newMessage.trim()}>
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="text-gray-500">
              Select a thread to view messages.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingPage;
