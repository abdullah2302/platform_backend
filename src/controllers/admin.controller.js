import User from '../models/auth.model.js'
import Report from '../models/report.model.js'
import AuditLog from '../models/audit-log.model.js'
import { sendSuccess } from '../utils/response.js'

async function users(req, res) {
  return sendSuccess(res, await User.find().select('-password').sort({ createdAt: -1 }))
}

async function reports(req, res) {
  return sendSuccess(res, await Report.find({ status: req.query.status }).populate('reporter person').sort({ createdAt: -1 }))
}

async function createReport(req, res) {
  return sendSuccess(res, await Report.create({ reporter: req.user.sub, person: req.body.person, reason: req.body.reason }), 201)
}

async function updateReport(req, res) {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, resolution: req.body.resolution, resolvedBy: req.user.sub },
    { new: true, runValidators: true },
  )
  await AuditLog.create({
    actor: req.user.sub,
    action: `report.${req.body.status}`,
    resource: 'report',
    resourceId: req.params.id,
    metadata: { resolution: req.body.resolution },
  })
  return sendSuccess(res, report)
}

async function auditLogs(req, res) {
  return sendSuccess(res, await AuditLog.find().populate('actor', 'name email').sort({ createdAt: -1 }).limit(200))
}

export { users, reports, createReport, updateReport, auditLogs }
