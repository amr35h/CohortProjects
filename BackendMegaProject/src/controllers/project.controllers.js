import { asyncHandler } from "../utils/async-handler.js";

const getProjects = asyncHandler(async (req, res) => {
  const { email } = req.body;
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  updateProjectMembers,
  updateMemberRole,
  deleteMember,
};
