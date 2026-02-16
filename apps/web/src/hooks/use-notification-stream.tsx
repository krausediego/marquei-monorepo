import { useEffect } from "react";
import { toast } from "sonner";

export function useNotificationStream() {
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3333/notifications/stream",
      {
        withCredentials: true,
      },
    );

    eventSource.onmessage = (event) => {
      if (event.data === ": heartbeat") return;

      const notification = JSON.parse(event.data);

      // Ignora mensagem de conexão inicial
      if (notification.type === "connected") {
        console.log("✅ SSE conectado com sucesso!");
        return;
      }

      console.log("Nova notificação:", notification);

      if (notification.type === "organization_invite") {
        toast.info("Voce recebeu um convite");
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
}
