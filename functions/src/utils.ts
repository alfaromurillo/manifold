import * as admin from 'firebase-admin'

import { Contract } from '../../common/contract'
import { PrivateUser, User } from '../../common/user'

export const isProd =
  admin.instanceId().app.options.projectId === 'mantic-markets'

export const getValue = async <T>(collection: string, doc: string) => {
  const snap = await admin.firestore().collection(collection).doc(doc).get()

  return snap.exists ? (snap.data() as T) : undefined
}

export const getValues = async <T>(query: admin.firestore.Query) => {
  const snap = await query.get()
  return snap.docs.map((doc) => doc.data() as T)
}

export const getContract = (contractId: string) => {
  return getValue<Contract>('contracts', contractId)
}

export const getUser = (userId: string) => {
  return getValue<User>('users', userId)
}

export const getPrivateUser = (userId: string) => {
  return getValue<PrivateUser>('private-users', userId)
}

export const getUserByUsername = async (username: string) => {
  const snap = await firestore
    .collection('users')
    .where('username', '==', username)
    .get()

  return snap.empty ? undefined : (snap.docs[0].data() as User)
}

const firestore = admin.firestore()

const updateUserBalance = (
  userId: string,
  delta: number,
  isDeposit = false
) => {
  return firestore.runTransaction(async (transaction) => {
    const userDoc = firestore.doc(`users/${userId}`)
    const userSnap = await transaction.get(userDoc)
    if (!userSnap.exists) return
    const user = userSnap.data() as User

    const newUserBalance = user.balance + delta

    if (newUserBalance < 0)
      throw new Error(
        `User (${userId}) balance cannot be negative: ${newUserBalance}`
      )

    if (isDeposit) {
      const newTotalDeposits = (user.totalDeposits || 0) + delta
      transaction.update(userDoc, { totalDeposits: newTotalDeposits })
    }

    transaction.update(userDoc, { balance: newUserBalance })
  })
}

export const payUser = (userId: string, payout: number, isDeposit = false) => {
  if (!isFinite(payout) || payout <= 0)
    throw new Error('Payout is not positive: ' + payout)

  return updateUserBalance(userId, payout, isDeposit)
}

export const chargeUser = (userId: string, charge: number) => {
  if (!isFinite(charge) || charge <= 0)
    throw new Error('User charge is not positive: ' + charge)

  return updateUserBalance(userId, -charge)
}
