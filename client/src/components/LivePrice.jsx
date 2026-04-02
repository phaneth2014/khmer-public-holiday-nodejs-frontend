import useWebSocket from 'react-use-websocket';

const LivePrice = () => {
  const socketUrl = 'wss://stream.binance.com:9443/ws/ethusdt@ticker';
  const { lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true, // Auto-reconnect
  });

  const price = lastJsonMessage?.c ? parseFloat(lastJsonMessage.c).toFixed(2) : '...';

  return <div>ETH/USDT: ${price}</div>;
};

export default LivePrice;