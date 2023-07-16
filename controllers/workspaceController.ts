import { Workspace } from "../models/model";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId?: string;
        name?: string;
        email?: string;
      };
    }
  }
}

//Create workspace
export async function createWorkspace(req: Request, res: Response){
  const workspace = new Workspace({
    name: req.body.name,
    slug: req.body.slug,
    userId: req.user.userId,
  });
  const record = await workspace.save();
  res.status(200).send(record);
}

//Read workspace
export async function getWorkspace(req: Request, res: Response) {
  const workspace = await Workspace.find({ userId: req.user.userId });
  res.status(200).send(workspace);
}

//Update workspace
export async function updateWorkspace(req: Request, res: Response) {
  const user_id = req.user.userId;

  const workspace = await Workspace.findById(req.params.id);
  if (user_id &&  workspace?.userId.toString() !== user_id.toString()) {
    return res.status(403).send("You do not have permission");
  }
  const updatedWorkspace = await Workspace.updateOne(
    { _id: req.params.id },
    req.body
  );
  res.status(200).send(updatedWorkspace);
}

//Delete workspace
export async function deleteWorkspace(req: Request, res: Response) {
  const user_id = req.user.userId;

  const workspace = await Workspace.findById(req.params.id);
  if (user_id && workspace?.userId.toString() !== user_id.toString()) {
    return res.status(403).send("You do not have permission");
  }
  const deletedWorkspace = await Workspace.deleteOne({ _id: req.params.id });
  res.status(200).send(deletedWorkspace);
}

export async function checkWorkspaceSlug(req: Request, res: Response) {
  const slug = req.params.slug;
  let workspace = await Workspace.findOne({ slug: slug });

  if (workspace) {
    let i = 1;
    while (workspace) {
      let newSlug = slug + i.toString();
      workspace = await Workspace.findOne({ slug: newSlug });
      if (!workspace) {
        return res.status(200).json({ available: false, suggestion: newSlug });
      }
      i++;
    }
  } else {
    return res.status(200).json({ available: true });
  }
}
