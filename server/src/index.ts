import  express,{ Express, Request, Response } from "express";
import connectDB from "./db";
import z from "zod"
import { Content, Link, Tag, User } from "./db/models";
import { ApiResponse } from "./Utils/ApiResponse";
import { ApiError } from "./Utils/ApiError";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userMiddleware } from "./middleware";
import { random } from "./Utils/Random";
import env from "./endpoints.config"
import { log } from "console";
import { embedAndStore } from "./worker";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    try {
        const requiredBody = z.object({
            userName: z
              .string()
              .min(3, "Username should be at least 3 characters long")
              .max(10, "Username should be at most 10 characters long"),
            password: z
              .string()
              .min(8, "Password should be at least 8 characters long")
              .max(20, "Password should be at most 10 characters long")
              .regex(/[a-z]/, "Password must include at least one lowercase letter")
              .regex(/[A-Z]/, "Password must include at least one uppercase letter")
              .regex(/[0-9]/, "Password must include at least one number")
              .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character"),
          });
    
        const parsedData = requiredBody.safeParse(req.body);
    
        if (!parsedData.success) {
            res.status(200).json(new ApiResponse(400, null, "Invalid input format"));
            return;
        }
    
        const { userName, password } = parsedData.data;
        const user = await User.create({ userName, password });
    
        res
          .status(201)
          .json(new ApiResponse(201, null, "User signed up successfully"));
      } catch (error) {
        console.error("User Signup Error:", error);
        res
          .status(500)
          .json(new ApiResponse(500, null, "User signup failed"));
      }
  });
app.post("/api/v1/login",async(req:Request,res: Response)=>{
    try {
        const {userName,password} = req.body;
        const user = await User.findOne({
            userName
        })
        if (!user) {
            res.status(403).json(new ApiResponse(403,null,"User Does not exist"));
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid Password")
        }
        const token = jwt.sign(
                {
                    _id: user._id,
                    userName: user.userName
                },
                
                env.JWT_SECRET
            )
        res.status(201).json(
                new ApiResponse(200, token, "User registered Successfully")
        )
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
})
app.post("/api/v1/tag",userMiddleware,async (req:Request,res:Response)=>{
    try {
        const {tagTitle} = req.body
        if (tagTitle.trim() === "") {
            throw new ApiError(411,"Invalid Input")
        }
        const tag = await Tag.create({
            title: tagTitle
        })
        res
        .status(200)
        .json(
            new ApiResponse(200, tag, "tag created successfully")
        );
    } catch (error) {
        console.error("tag Creation Error:", error);
        res.status(500).json(new ApiResponse(500, null,"Internal server error"));
    }
})
app.post("/api/v1/content",userMiddleware,async (req:Request,res:Response)=>{
    try {
        const {link,title,type,tags} = req.body
        const content = await Content.create({
            link,title,types: type,tags,userId: req.userId
        })
        const modContent = {
            _id: content._id.toString(),
            title: content.title as string,
            link: content.link as string,
            type: content.types as string,
            userId: content.userId as string
        }
        await embedAndStore(modContent);
        res
        .status(200)
        .json(
            new ApiResponse(200, content, "Content added successfully")
        );
    } catch (error) {
        console.error("Content Creation Error:", error);
        res.status(500).json(new ApiResponse(500, null,"Internal server error"));
    }
})
app.get("/api/v1/content",userMiddleware,async (req:Request,res:Response)=>{
    try {
        const contents = await Content.find({
            userId: req.userId
        }).populate("userId","userName");
        res
        .status(200)
        .json(
            new ApiResponse(200, contents, "Contents Fetched successfully")
        );
    } catch (error) {
        console.error("Contents Fetch Error:", error);
        res.status(500).json(new ApiResponse(500, null,"Internal server error"));
    }
})

app.delete("/api/v1/content/:contentId",userMiddleware,async(req:Request,res:Response)=>{
    try {
        const {contentId} = req.params;
        const userId = req.userId;

        const deleteContent = await Content.deleteOne({
            _id: contentId,
            userId: userId
        })
        if (!deleteContent) {
            throw new ApiError(404, "Content not found");
        }
        res
        .status(200)
        .json(
            new ApiResponse(200,[], "Content Deleted Successfully")
        )
    } catch (error) {
        console.error("Content Deletion Error:", error);
        res.status(500).json(new ApiResponse(500, null,"Internal server error"));
    }
})
app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res:Response) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await Link.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await Link.create({
                userId: req.userId,
                hash: hash
            })

            res.json(new ApiResponse(200,hash,"link created successfully"))
    } else {
        await Link.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
        hash
    });

    if (!link) {
        throw new ApiError(411,"Wrong Input");
    }
    // userId
    const content = await Content.find({
        userId: link.userId
    })

    // console.log(link);
    const user = await User.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json(new ApiResponse(411,null,"user not found, error should ideally not happen"))
        return;
    }

    res.json(new ApiResponse(200,{ userName: user.userName,content},"Content Fetched Successfully"))

})


connectDB()
.then(() => {
    app.listen(3000, () => {
        console.log(`⚙️ Server is running at port : 3000`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})