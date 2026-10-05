import Claim from '../models/claim.model.js'
import Person from '../models/people.model.js'
import AuditLog from '../models/audit-log.model.js'
import { sendSuccess } from '../utils/response.js'

async function create(req, res) {
  const person = await Person.findById(req.body.person)
  if (!person) return res.status(404).json({ success: false, message: 'Person not found' })
  const claim = await Claim.create({ person: person._id, user: req.user.sub, note: req.body.note })
  return sendSuccess(res, claim, 201)
}

async function mine(req, res) {
  return sendSuccess(res, await Claim.find({ user: req.user.sub }).populate('person'))
}

async function list(req, res) {
  return sendSuccess(res, await Claim.find({ status: req.query.status }).populate('person user').sort({ createdAt: -1 }))
}

async function review(req, res) {
  const claim = await Claim.findById(req.params.id)
  if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' })
  claim.status = req.body.status
  claim.reviewedBy = req.user.sub
  claim.reviewedAt = new Date()
  await claim.save()
  if (claim.status === 'approved') await Person.findByIdAndUpdate(claim.person, { claimed: true, claimedBy: claim.user })
  await AuditLog.create({
    actor: req.user.sub,
    action: `claim.${claim.status}`,
    resource: 'claim',
    resourceId: claim._id,
    metadata: { person: claim.person, user: claim.user },
  })
  return sendSuccess(res, claim)
}

export { create, mine, list, review }
