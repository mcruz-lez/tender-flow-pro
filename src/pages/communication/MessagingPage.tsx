import { useEffect, useState } from "react";
import {
  getThreads,
  getMessages,
  sendMessage,
} from "@/integrations/supabase/api";
import { useAuth } from "@/contexts/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { canAccess } from "@/api/rbac";

const MessagingPage = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<
    Array<{ id: string; subject?: string }>
  >([]);
  const [selectedThread, setSelectedThread] = useState<{
    id: string;
    subject?: string;
  } | null>(null);
  const [messages, setMessages] = useState<
    Array<{ sender_id: string; content: string; created_at: string }>
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getThreads(user.id).then(setThreads);
    }
  }, [user]);

  useEffect(() => {
    if (selectedThread) {
      setLoading(true);
      getMessages(selectedThread.id)
        .then(setMessages)
        .finally(() => setLoading(false));
    }
  }, [selectedThread]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedThread || !newMessage.trim()) return;
    setLoading(true);
    await sendMessage(selectedThread.id, user.id, newMessage.trim());
    setNewMessage("");
    getMessages(selectedThread.id).then(setMessages);
    setLoading(false);
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
            {threads.map((thread, idx) => (
              <li key={idx}>
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
            ))}
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
                    {messages.map((msg, idx) => (
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
                  onChange={(e) => setNewMessage(e.target.value)}
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
