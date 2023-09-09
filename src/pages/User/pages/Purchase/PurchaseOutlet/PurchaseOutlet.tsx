import { Purchase } from '~/types/purchase.type'

interface Props {
  data?: Purchase[]
}

const PurchaseOutlet = ({ data }: Props) => {
  console.log('file: PurchaseOutlet.tsx:8 ~ PurchaseOut ~ data:', data)
  return <div>{data && data.map((item) => <div key={item._id}>{item.product.name}</div>)}</div>
}

export default PurchaseOutlet
