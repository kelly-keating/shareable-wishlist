import { Wishlist } from "../models"
import { Card, CardHeader, CardBody, CardFooter, Heading, Image } from '@chakra-ui/react'

interface Props {
  list: Wishlist
}

function ItemList({ list }: Props) {
  const items = list.items ? Object.values(list.items) : null

  return (
    <div className="items_grid">
      {items && items.map(i => (
        <Card key={i.id} className={`items_grid__tile ${i.tier}`}>
          <Image
            src={
              true ?
              "https://upload.wikimedia.org/wikipedia/commons/0/03/Welsh_corgi_pembroke_22pl.jpg"
              :
              "http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png"
            }
            alt={i.name}
            borderRadius="lg"
            boxSize="200px"
            objectFit="contain"
            />
          <CardHeader>
            <Heading size="md" textTransform="uppercase">{i.name}</Heading>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default ItemList
