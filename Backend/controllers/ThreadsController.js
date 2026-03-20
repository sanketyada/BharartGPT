import ThreadModel from "../models/threads.model.js";
import getGroqResponse from "../utils/groq.js";

const getAllThreads = async (req, res) => {
  try {
    const threads = await ThreadModel.find({}).sort({ updatedAt: -1 });

    if (threads.length < 0) {
      res.json({
        success: false,
        message: "Unable to find threads!",
      });
    }
    res.json({
      success: true,
      threads,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const thread = async (req, res) => {
  console.log(req.params);
  const { threadId } = req.params;

  try {
    const thread = await ThreadModel.findOne({ threadId });

    if (!thread) {
      res.json({
        success: false,
        message: "Thread not Found!",
      });
    }
    res.json(thread);
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteThread = async (req, res) => {
  const { threadId } = req.params;

  try {
    const deleteThread = await ThreadModel.findOneAndDelete({
      threadId,
    });
    if (!deleteThread) {
      res.json({
        success: false,
        message: "Unable to delete Thread!",
      });
    }
    res.json({
      success: true,
      deleteThread,
      message: "Thread Deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const chatGeneration = async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.json({
      success: false,
      message: "Required Feilds are empty.",
    });
  }
  try {
    let thread = await ThreadModel.findOne({ threadId });

    if (!thread) {
      //create New Thread
      thread = new ThreadModel({
        threadId: threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    const assistentReply = await getGroqResponse(message);

    thread.messages.push({ role: "assistant", content: assistentReply });
    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistentReply });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllThreads, thread, deleteThread, chatGeneration };
