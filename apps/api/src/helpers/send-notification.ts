import { activeConnections } from "@/routes/plugins";

export function sendNotificationToUser(userId: string, notification: any) {
  const controller = activeConnections.get(userId);

  if (controller) {
    try {
      controller.enqueue(`data: ${JSON.stringify(notification)}\n\n`);
      console.log(`📨 Notificação enviada para user ${userId}`);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      activeConnections.delete(userId);
    }
  } else {
    console.log(`⚠️ User ${userId} offline, notificação salva no banco`);
  }
}
