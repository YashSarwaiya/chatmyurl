import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import type {
  MessagesByUrlQuery,
  CreateMessageMutation,
  OnCreateMessageSubscription,
  ModelSortDirection,
  Message as GraphQLMessage,
} from "../API";
import type { GraphQLResult } from "@aws-amplify/api-graphql";

const client = generateClient();

// Use the GraphQL-generated Message type directly
type Message = GraphQLMessage;

export function useChat(currentUrl: string) {
  const { user } = useAuthenticator((context) => [context.user]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!currentUrl) return;

    try {
      setLoading(true);

      const result = (await client.graphql({
        query: queries.messagesByUrl,
        variables: {
          url: currentUrl,
          sortDirection: "ASC" as ModelSortDirection,
          limit: 1000,
        },
      })) as GraphQLResult<MessagesByUrlQuery>;

      if (result.data?.messagesByUrl?.items) {
        const filteredMessages = result.data.messagesByUrl.items.filter(
          (item): item is Message => item !== null
        );
        setMessages(filteredMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      console.error("Full error:", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }, [currentUrl]);

  useEffect(() => {
    if (!currentUrl) return;

    fetchMessages();

    const sub = client
      .graphql({
        query: subscriptions.onCreateMessage,
      })
      .subscribe({
        next: (event: GraphQLResult<OnCreateMessageSubscription>) => {
          const newMessage = event.data?.onCreateMessage;
          if (newMessage && newMessage.url === currentUrl) {
            setMessages((prev) => {
              if (prev.some((msg) => msg.id === newMessage.id)) {
                return prev;
              }
              return [...prev, newMessage].slice(-1000);
            });
          }
        },
        error: (error) => {
          console.error("Subscription error:", error);
          console.error(
            "Full subscription error:",
            JSON.stringify(error, null, 2)
          );
        },
      });

    return () => sub.unsubscribe();
  }, [currentUrl, fetchMessages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !user) return;

    try {
      setSending(true);

      (await client.graphql({
        query: mutations.createMessage,
        variables: {
          input: {
            url: currentUrl,
            userId: user.userId,
            username:
              user.username || user.signInDetails?.loginId || "Anonymous",
            message: messageText.trim(),
            createdAt: new Date().toISOString(),
          },
        },
      })) as GraphQLResult<CreateMessageMutation>;
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Full send error:", JSON.stringify(error, null, 2));
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return {
    messages,
    loading,
    sending,
    sendMessage,
    currentUser: user,
  };
}
