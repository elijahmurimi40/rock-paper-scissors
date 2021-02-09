import { io } from 'socket.io-client';
import { FriendEndpoint, StrangerEndpoint } from './Endpoint';

export const friendSocket = io(FriendEndpoint);
export const strangerSocket = io(StrangerEndpoint, { forceNew: true });

export const disconnectSocket = () => {
  friendSocket.disconnect();
  strangerSocket.disconnect();
};
