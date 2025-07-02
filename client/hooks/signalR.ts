
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export function useSignalR() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
   
  .withUrl("http://localhost:5049/chathub")

  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

    conn.start()
      .then(() => console.log(' SignalR connected'))
      .catch(err => console.error(' SignalR connection error:', err));

    conn.on('ReceiveMessage', (user: string, message: string) => {
      setMessages(prev => [...prev, { user, message }]);
    });

    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, []);

  const sendMessage = (user: string, message: string) => {
    connection?.invoke('SendMessage', user, message).catch(console.error);
  };

  return { messages, sendMessage };
}
