import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { QdrantClient } from "@qdrant/js-client-rest";
import env from "./endpoints.config";

const client = new QdrantClient({ url: env.QDRANT_URL,checkCompatibility:false,apiKey: env.QDRANT_API_KEY});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004", // 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
  apiKey: env.GOOGLE_API_KEY
});


export const embedAndStore = async (content:{_id:string,title:string,link:string,type:string,userId:string}) =>{
    const texts = [`${content?.title} ${content?.link} `.trim()]
    const vectorStore = await QdrantVectorStore.fromTexts(
        texts,
        [{   
            id: content._id,
            title: content.title,
            userId: content.userId,
            link: content.link,
            type: content.type
        }],
        embeddings, {
        client,
        collectionName: "content-vector",
      });
      
}

const queryDB = async (query: string,userId:string) => {

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          client,
          collectionName: "content-vector",
        }
      );
      const results = await vectorStore.similaritySearch(query);
      return results;
}


  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: env.GOOGLE_API_KEY
  });
export const queryChat = async (query: string,userId:string) => {
    const responses = await queryDB(query,userId);
    const SYSTEM = `You are a helpful AI assistant.

Your job is to answer user queries using the context of the provided links. These links point to tweets, YouTube videos, documents, or blog posts saved by the user.

You have access to a list of saved links that may contain relevant information. Each link includes a title and sometimes a short description or content preview.

Your Task:
First, try to find links that directly relate to the query (e.g., explaining how something works).

If you have content previews, use them to guide your answer.

If the content is not accessible, provide a brief and helpful explanation of the query anyway, and mention that you couldn’t access the full link content.

links:-${responses}
`
    const chatRes = await llm.invoke([
        ["system",SYSTEM],
        ["user",query]
    ])
    console.log(chatRes);
    
}
export const searchDb = async (query:string,userId:string) =>{
    const responses = await queryDB(query,userId);
    const result = responses.filter((document)=>
      document.metadata.userId == userId
    )
    return result;
}