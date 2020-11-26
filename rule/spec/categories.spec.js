const { setup, teardown } = require('./helpers')

describe('Category rules', () => {
  let db
  let categoryRef

  beforeAll(async () => {
    await teardown()
    db = await setup()
    categoryRef = db.collection('categories')
  })

  test('fail when write', async () => {
    expect(categoryRef.add({})).toDeny()
    expect(categoryRef.doc('doc').update({})).toDeny()
  })

  test('pass when read', async () => {
    await expect(categoryRef.get()).toAllow()
    await expect(categoryRef.doc('doc-id').get()).toAllow()
  })
})
