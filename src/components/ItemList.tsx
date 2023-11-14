import { Wishlist } from "../models"

interface Props {
  list: Wishlist
}

function ItemList({ list }: Props) {
  const items = list.items ? Object.values(list.items) : null

  return (
    <div className="items_grid">
      {items && items.map(i => (
        <div key={i.id} className={`items_grid__tile ${i.tier}`}>
          <img src="http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png" />
          <p>{i.name}</p>
          {i.details && <p>{i.details}</p>}
          {i.price && <p>{i.price}</p>}
          {i.links && (
            <div>
              <h4>Links</h4>
              <ul>
                {i.links.map(l => <li key={l.url}><a href={l.url}>{l.name}</a></li>)}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ItemList
