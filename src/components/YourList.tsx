import { useEffect, useState } from 'react'

import { PotentialWishlist } from '../models'
import { createYourList, watchYourList } from '../firebase/db'
import ItemList from './ItemList'

function YourList() {
  const [listData, setListData] = useState<PotentialWishlist>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    watchYourList(
      (list) => setListData(list),
      () => setShowPrompt(true),
    )
  }, [])

  useEffect(() => {
    if (listData) setShowPrompt(false)
  }, [listData])

  return (
    <>
      <h2>YourList</h2>
      {showPrompt && (
        <div>
          <p>
            Looks like you don&apos;t have a wishlist yet. Do you want to create
            one? <button onClick={createYourList}>Yes</button>
          </p>
        </div>
      )}
      {listData && <button>Add an item</button>}
      {listData && listData.items && <ItemList list={listData} />}
      {listData && !listData.items && (
        <p>No items! Looks like you&apos;ll need to add some ;)</p>
      )}
    </>
  )
}

export default YourList
