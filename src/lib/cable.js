import { createConsumer } from '@rails/actioncable';

const CABLE_URL = 'ws://localhost:3000/cable';

let consumer = null;
let commentsChannel = null;

export function connectCable() {
  if (consumer) return consumer;
  
  consumer = createConsumer(CABLE_URL);
  return consumer;
}

export function subscribeToComments(onReceived) {
  if (!consumer) connectCable();
  
  if (commentsChannel) {
    commentsChannel.unsubscribe();
  }
  
  commentsChannel = consumer.subscriptions.create('CommentsChannel', {
    connected() {
      console.log('Connected to CommentsChannel');
    },
    
    disconnected() {
      console.log('Disconnected from CommentsChannel');
    },
    
    received(data) {
      if (onReceived) {
        onReceived(data);
      }
    }
  });
  
  return commentsChannel;
}

export function sendComment(body) {
  if (!commentsChannel) {
    console.error('Not connected to comments channel');
    return;
  }
  
  commentsChannel.perform('speak', { body });
}

export function disconnectCable() {
  if (commentsChannel) {
    commentsChannel.unsubscribe();
    commentsChannel = null;
  }
  
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
}