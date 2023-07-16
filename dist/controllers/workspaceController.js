"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWorkspaceSlug = exports.deleteWorkspace = exports.updateWorkspace = exports.getWorkspace = exports.createWorkspace = void 0;
const model_1 = require("../models/model");
//Create workspace
function createWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = new model_1.Workspace({
            name: req.body.name,
            slug: req.body.slug,
            userId: req.user.userId,
        });
        const record = yield workspace.save();
        res.status(200).send(record);
    });
}
exports.createWorkspace = createWorkspace;
//Read workspace
function getWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = yield model_1.Workspace.find({ userId: req.user.userId });
        res.status(200).send(workspace);
    });
}
exports.getWorkspace = getWorkspace;
//Update workspace
function updateWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.user.userId;
        const workspace = yield model_1.Workspace.findById(req.params.id);
        if (user_id && (workspace === null || workspace === void 0 ? void 0 : workspace.userId.toString()) !== user_id.toString()) {
            return res.status(403).send("You do not have permission");
        }
        const updatedWorkspace = yield model_1.Workspace.updateOne({ _id: req.params.id }, req.body);
        res.status(200).send(updatedWorkspace);
    });
}
exports.updateWorkspace = updateWorkspace;
//Delete workspace
function deleteWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.user.userId;
        const workspace = yield model_1.Workspace.findById(req.params.id);
        if (user_id && (workspace === null || workspace === void 0 ? void 0 : workspace.userId.toString()) !== user_id.toString()) {
            return res.status(403).send("You do not have permission");
        }
        const deletedWorkspace = yield model_1.Workspace.deleteOne({ _id: req.params.id });
        res.status(200).send(deletedWorkspace);
    });
}
exports.deleteWorkspace = deleteWorkspace;
function checkWorkspaceSlug(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        let workspace = yield model_1.Workspace.findOne({ slug: slug });
        if (workspace) {
            let i = 1;
            while (workspace) {
                let newSlug = slug + i.toString();
                workspace = yield model_1.Workspace.findOne({ slug: newSlug });
                if (!workspace) {
                    return res.status(200).json({ available: false, suggestion: newSlug });
                }
                i++;
            }
        }
        else {
            return res.status(200).json({ available: true });
        }
    });
}
exports.checkWorkspaceSlug = checkWorkspaceSlug;
