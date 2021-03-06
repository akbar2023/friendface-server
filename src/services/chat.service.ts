import moment from 'moment';
import ChatMessageSchema, { ChatMessage } from '../models/chat-message';
import { LoggerService } from './logger.service';

const logger = LoggerService.getInstance();

export class ChatService {
  private static instance: ChatService;

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }

  getChatMessages(): Promise<ChatMessage[]> {
    return ChatMessageSchema.find({})
      .sort('timestamp')
      .exec().then(messages => {
        logger.info('getBoardMessages SUCCESS', messages);
        return messages;
      }).catch(err => {
        logger.error('getBoardMessages FAILED', err);
        return err;
      });
  }

  postChatMessage(body: ChatMessage): Promise<ChatMessage> {
    const newMessage = new ChatMessageSchema({
      ...body,
      timestamp: moment().format()
    });

    return newMessage.save().then(async msg => {
      logger.info('postChatMessage SUCCESS', msg);
      return msg;
    }).catch(err => {
      logger.error('postChatMessage FAILED', err);
      return err;
    });
  }

  deleteChatMessages(): Promise<void> {
    return ChatMessageSchema.deleteMany({}).then(() => {
      logger.info('deleteChatMessages SUCCESS');
      return {};
    }).catch(err => {
      logger.error('deleteChatMessages FAILED', err);
      return err;
    });
  }
}
