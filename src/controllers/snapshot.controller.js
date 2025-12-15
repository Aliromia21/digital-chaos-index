import {
  createSnapshot,
  getSnapshotsPaged,       
  getSnapshotById,
  updateSnapshot,
  deleteSnapshot,
} from "../services/snapshot.service.js";

export async function addSnapshot(req, res, next) {
  try {
    const snapshot = await createSnapshot(req.user.id, req.body);
    return res
      .status(201)
      .json({ success: true, message: "Snapshot saved", data: snapshot });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "You already have a snapshot for today" });
    }
    next(err);
  }
}

export async function listSnapshots(req, res, next) {
  try {
   
    const query = req.validatedQuery ?? req.query;
    const data = await getSnapshotsPaged(req.user.id, query);
    return res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
}

export async function getOneSnapshot(req, res, next) {
  try {
    const snapshot = await getSnapshotById(req.user.id, req.params.id);
    if (!snapshot)
      return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, data: snapshot });
  } catch (err) {
    next(err);
  }
}

export async function updateSnapshotCtrl(req, res, next) {
  try {
    const updated = await updateSnapshot(req.user.id, req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    return res
      .status(200)
      .json({ success: true, message: "Snapshot updated", data: updated });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "You already have a snapshot for that day" });
    }
    next(err);
  }
}

export async function deleteSnapshotCtrl(req, res, next) {
  try {
    const deleted = await deleteSnapshot(req.user.id, req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    return res
      .status(200)
      .json({ success: true, message: "Snapshot deleted" });
  } catch (err) {
    next(err);
  }
}
