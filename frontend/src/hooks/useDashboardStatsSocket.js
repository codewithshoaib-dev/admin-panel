import { useEffect, useRef, useState } from "react";

export default function useDashboardStatsSocket(url) {
  const [stats, setStats] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    function connect() {
       if (ws.current) {
      ws.current.close()
    }
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log(message)
          setStats(message)
        } catch (err) {
          console.error("WebSocket message parse error", err);
        }
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket error", err);
      };

      ws.current.onclose = (e) => {
        console.warn("WebSocket closed", e.code);
        if (e.code !== 1000) {
          setTimeout(() => connect(), 3000);
        }
      };
    }

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  return stats;
}
