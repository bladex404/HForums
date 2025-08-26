import mongoose, { model, Schema } from "mongoose";
const messageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);
const conversationSchema = new Schema({
  conversationId: String,
  messages: {
    type: Array,
    of: messageSchema,
    default: [],
  },
  users: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
});

conversationSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Conversation = model("Conversation", conversationSchema);
export default Conversation;
