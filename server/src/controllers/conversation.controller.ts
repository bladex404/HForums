import { Router } from "express";
import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
const chatRouter = Router();

chatRouter.post("/messages/:toUserId", async (req: Request, res: Response) => {
  try {
    const { userId, text } = req.body;
    const { toUserId } = req.params;
    let convo = await Conversation.findOne({
      users: { $in: [userId, toUserId] },
    });
    if (!convo) {
      const Convo = new Conversation({
        users: [userId, toUserId],
        messages: [],
      });
      const newMessage = {
        senderId: userId,
        text,
      };
      Convo.messages.push(newMessage);
      await Convo.save();
      res.status(201).json({ success: true, conversation: convo });
      return;
    } else {
      const newMessage = {
        senderId: userId,
        text,
      };
      convo.messages.push(newMessage);
      await convo.save();
      res.status(201).json({ success: true, conversation: convo });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
    return;
  }
});
export default chatRouter;
